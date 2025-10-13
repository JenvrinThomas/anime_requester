const API_KEY = prompt("Entrez votre clé API RapidAPI :");

function afficherAnimes(animes) {
	const container = document.getElementById('results-container');
	const template = document.getElementById('carte');

	container.innerHTML = '';

	if (!Array.isArray(animes) || animes.length === 0) {
		container.textContent = 'Aucun résultat.';
		return;
	}

	animes.forEach(anime => {
		const clone = template.content.cloneNode(true);

		clone.querySelector('#titre').textContent = anime.title;
		clone.querySelector('#image').src = anime.image;
		clone.querySelector('#image').alt = anime.title;
		clone.querySelector('#synopsis').textContent = anime.synopsis;
		clone.querySelector('#categorie-genre').textContent = "Genres : ";
		anime.genres.forEach(genre => {
			clone.querySelector('#categorie-genre').textContent = clone.querySelector('#categorie-genre').textContent + genre + " ";
		});
		clone.querySelector('#classement').textContent = "Rang " + anime.ranking;
		clone.querySelector('#nb-episodes').textContent = anime.episodes + " épisode(s)";


		container.appendChild(clone);
	});
}


document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('submit');
	const titreInput = document.getElementById('anime-name');
	const resultsContainer = document.getElementById('results-container');

	if (!form || !titreInput || !resultsContainer) {
		console.error('Éléments formulaire ou résultats manquants.');
		return;
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		if (!API_KEY) {
			alert('Vous devez fournir une clé API !');
			return;
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

	
		resultsContainer.textContent = 'Recherche en cours...';

		fetch(url, options)
			.then(response => {
				if (!response.ok) {
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
				resultsContainer.textContent = 'Erreur lors de la récupération des données.';
			});
	});
});