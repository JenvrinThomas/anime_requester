// La clé API est mémorisée dans sessionStorage pour la session (sera perdue au refresh)
// Ne pas demander immédiatement ; la demander au moment de la recherche si besoin.

function afficherAnimes(animes) {
	const container = document.getElementById('results-container');
	const template = document.getElementById('carte');

	// Ne pas supprimer le template : enlever uniquement les noeuds enfants qui ne sont pas le template
	Array.from(container.children).forEach(child => {
		if (child !== template) container.removeChild(child);
	});

	if (!Array.isArray(animes) || animes.length === 0) {
		const msg = document.createElement('p');
		msg.textContent = 'Aucun résultat.';
		container.appendChild(msg);
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

		container.appendChild(clone);
	});
}


document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('search-form');
	const titreInput = document.getElementById('anime-name');
	const resultsContainer = document.getElementById('results-container');

	if (!form) {
		console.error('Formulaire #search-form introuvable.');
		return;
	}

	if (!titreInput) {
		console.error('Champ #anime-name introuvable.');
		return;
	}

	if (!resultsContainer) {
		console.error('Conteneur #results-container introuvable.');
		return;
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		// récupérer la clé API depuis sessionStorage ou demander si absente
		let API_KEY = sessionStorage.getItem('RAPIDAPI_KEY');
		if (!API_KEY) {
			API_KEY = prompt('Entrez votre clé API RapidAPI :');
			if (!API_KEY) {
				alert('Vous devez fournir une clé API !');
				return;
			}
			sessionStorage.setItem('RAPIDAPI_KEY', API_KEY);
		}

		const query = titreInput.value.trim();
		const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=' + encodeURIComponent(query);

		const options = {
			method: 'GET',
			headers: {
				'x-rapidapi-key': API_KEY,
				'x-rapidapi-host': 'anime-db.p.rapidapi.com'
			}
		};

		// Supprimer anciens résultats (on laisse le template) et afficher message temporaire
		Array.from(resultsContainer.children).forEach(child => {
			if (child.id !== 'carte') resultsContainer.removeChild(child);
		});
		const status = document.createElement('p');
		status.textContent = 'Recherche en cours...';
		resultsContainer.appendChild(status);

		fetch(url, options)
			.then(response => {
				if (!response.ok) {
					if (response.status === 401) {
						// clé invalide -> supprimer la clé stockée pour permettre une nouvelle saisie
						sessionStorage.removeItem('RAPIDAPI_KEY');
					}
					throw new Error(`Erreur HTTP : ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				console.log('Données reçues :', data);
				afficherAnimes(data.data);
			})
			.catch(error => {
				console.error('Erreur lors de la requête :', error);
				// remplacer le message de statut
				Array.from(resultsContainer.querySelectorAll('p')).forEach(p => p.remove());
				const err = document.createElement('p');
				err.textContent = 'Erreur lors de la récupération des données.';
				resultsContainer.appendChild(err);
			});
	});
});