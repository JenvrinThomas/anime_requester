document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('search-form');
	const titreInput = document.getElementById('anime-name');
	const idInput = document.getElementById('anime-id');
	const rankInput = document.getElementById('anime-rank');
	const resultsContainer = document.getElementById('results-container');
	const genreDropdown = document.getElementById('genre-dropdown');
	const searchTypeSelect = document.getElementById('search-type');

	const template = document.getElementById('carte');

	if (!form || !titreInput || !idInput || !rankInput || !resultsContainer || !template) {
		console.error('Un ou plusieurs éléments requis sont introuvables.');
		return;
	}

	// Gestion de l'affichage des inputs selon le type de recherche
	searchTypeSelect.addEventListener('change', () => {
		const type = searchTypeSelect.value;

		document.getElementById('input-title').style.display = type === 'title' ? 'block' : 'none';
		document.getElementById('input-id').style.display = type === 'id' ? 'block' : 'none';
		document.getElementById('input-rank').style.display = type === 'rank' ? 'block' : 'none';

		// Afficher genre seulement pour la recherche par titre
		genreDropdown.style.display = type === 'title' ? 'block' : 'none';
	});

	// Fonction pour afficher les animes
	function afficherAnimes(animes) {
		Array.from(resultsContainer.children).forEach(child => {
			if (child !== template) resultsContainer.removeChild(child);
		});

		if (!Array.isArray(animes) || animes.length === 0) {
			const msg = document.createElement('p');
			msg.textContent = 'Aucun résultat.';
			resultsContainer.appendChild(msg);
			return;
		}

		animes.forEach(anime => {
			const clone = template.content.cloneNode(true);

			const titreEl = clone.querySelector('#titre');
			if (titreEl) titreEl.textContent = anime.title || 'Titre inconnu';

			const imageEl = clone.querySelector('#image');
			if (imageEl) {
				imageEl.src = anime.image || '';
				imageEl.alt = anime.title || '';
			}

			const synEl = clone.querySelector('#synopsis');
			if (synEl) synEl.textContent = anime.synopsis || '';

			const catEl = clone.querySelector('#categorie-genre');
			if (catEl) {
				catEl.textContent = 'Genres : ';
				if (Array.isArray(anime.genres) && anime.genres.length) {
					catEl.textContent += anime.genres.join(', ');
				} else {
					catEl.textContent += 'N/A';
				}
			}

			const rankEl = clone.querySelector('#classement');
			if (rankEl) rankEl.textContent = 'Rang ' + (anime.rank || anime.ranking || 'N/A');

			const nbEpEl = clone.querySelector('#nb-episodes');
			if (nbEpEl) nbEpEl.textContent = ((anime.episodes != null) ? anime.episodes : 'N/A') + ' épisode(s)';

			resultsContainer.appendChild(clone);
		});
	}

	// Récupérer tous les genres de l'API pour le dropdown
	function chargerGenres(API_KEY) {
		const urlGenres = 'https://anime-db.p.rapidapi.com/genres';
		const options = {
			method: 'GET',
			headers: {
				'x-rapidapi-key': API_KEY,
				'x-rapidapi-host': 'anime-db.p.rapidapi.com'
			}
		};

		fetch(urlGenres, options)
			.then(res => res.json())
			.then(data => {
				if (!Array.isArray(data)) return;
				genreDropdown.innerHTML = '<fieldset><legend>Genres :</legend></fieldset>';
				const fieldset = genreDropdown.querySelector('fieldset');
				data.forEach(genre => {
					const label = document.createElement('label');
					label.innerHTML = `<input type="checkbox" name="genre" value="${genre}"> ${genre}`;
					fieldset.appendChild(label);
				});
			})
			.catch(err => console.error('Erreur lors du chargement des genres :', err));
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let API_KEY = sessionStorage.getItem('RAPIDAPI_KEY');
		if (!API_KEY) {
			API_KEY = prompt('Entrez votre clé API RapidAPI :');
			if (!API_KEY) {
				alert('Vous devez fournir une clé API !');
				return;
			}
			sessionStorage.setItem('RAPIDAPI_KEY', API_KEY);
		}

		const searchType = searchTypeSelect.value;
		const title = titreInput.value.trim();
		const id = idInput.value.trim();
		const rank = rankInput.value.trim();

		let url = '';

		if (searchType === 'title') {
			url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${encodeURIComponent(title)}`;
			const genresSelectionnes = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(g => g.value);
			if (genresSelectionnes.length > 0) {
				url += `&genres=${encodeURIComponent(genresSelectionnes.join(','))}`;
			}
		} else if (searchType === 'id') {
			url = `https://anime-db.p.rapidapi.com/anime/by-id/${encodeURIComponent(id)}`;
		} else if (searchType === 'rank') {
			url = `https://anime-db.p.rapidapi.com/anime/by-ranking/${encodeURIComponent(rank)}`;
		}

		// Affichage status
		resultsContainer.innerHTML = '<p>Recherche en cours...</p>';

		fetch(url, {
			method: 'GET',
			headers: {
				'x-rapidapi-key': API_KEY,
				'x-rapidapi-host': 'anime-db.p.rapidapi.com'
			}
		})
			.then(res => {
				if (!res.ok) {
					if (res.status === 401) sessionStorage.removeItem('RAPIDAPI_KEY');
					throw new Error(`Erreur HTTP : ${res.status}`);
				}
				return res.json();
			})
			.then(data => {
				const animeData = data.data || (Array.isArray(data) ? data : [data]);
				afficherAnimes(animeData);
				// Charger les genres dynamiquement si ce n'est pas déjà fait
				if (searchType === 'title' && genreDropdown.children.length === 0) {
					chargerGenres(API_KEY);
				}
			})
			.catch(error => {
				console.error('Erreur lors de la requête :', error);
				resultsContainer.innerHTML = '<p>Erreur lors de la récupération des données.</p>';
			});
	});

	// Initial hide/show
	searchTypeSelect.dispatchEvent(new Event('change'));
});
