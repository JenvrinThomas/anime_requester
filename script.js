
let API_KEY = prompt("Entrez votre clé API RapidAPI :");

const titre = document.getElementById('anime-name').value;

if (!API_KEY) {
	alert("Vous devez fournir une clé API !");
} else {
	// === 1. Requête vers l'API Anime DB via XMLHttpRequest ===
	const xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener('readystatechange', function () {
		if (this.readyState === this.DONE) {
			if (this.status === 200) {
				const response = JSON.parse(this.responseText);
				console.log('Réponse Anime DB:', response);

				if (response.data && response.data.length > 0) {
					const anime = response.data[0]; // premier anime

					// Mise à jour de la carte HTML
					document.getElementById('titre').textContent = anime.title;
					document.getElementById('image').innerHTML = `<img src="${anime.image}" alt="${anime.title}" width="150">`;
					document.getElementById('synopsis').textContent = anime.synopsis || 'Synopsis indisponible';
					document.getElementById('categorie-genre').textContent = anime.genres?.join(', ') || 'Genre non précisé';
					document.getElementById('classement').textContent = `Classement: ${anime.rank || 'N/A'}`;
					document.getElementById('nb-episodes').textContent = `Nombre d'épisodes: ${anime.episodes || 'N/A'}`;
				} else {
					console.log('Pas de données dans la réponse.');
				}
			} else {
				console.error('Erreur API Anime:', this.status);
			}
		}
	});

	xhr.open('GET', 'https://anime-db.p.rapidapi.com/anime?page=1&size=10');
	xhr.setRequestHeader('x-rapidapi-key', API_KEY);
	xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');
	xhr.send();
}

// === 2. Requête vers une autre API avec fetch ===
let url = "https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=" + encodeURIComponent(titre) + "&genres=blabl&sortBy=ranking&sortOrder=asc";

fetch(url)
	.then(response => {
		if (!response.ok) {
			throw new Error('Erreur réseau');
		}
		return response.json();
	})
	.then(data => {
		console.log('Réponse fetch API:', data);
		document.getElementById("resultat").textContent = JSON.stringify(data, null, 2);
	})
	.catch(error => {
		console.error('Erreur fetch API:', error);
		document.getElementById("resultat").textContent = "Erreur lors de la récupération des données.";
	});