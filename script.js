const API_KEY = prompt("Entrez votre clé API RapidAPI :");

function afficherAnimes(animes) {
	const container = document.getElementById('results-container');
	const template = document.getElementById('carte');

	animes.forEach(anime => {
		const clone = template.content.cloneNode(true);

		clone.querySelector('#titre').textContent = anime.title;
		clone.querySelector('#image').src = anime.image;
		clone.querySelector('#image').alt = anime.title;
		clone.querySelector('#synopsis').textContent = anime.synopsis;
		clone.querySelector('#categorie-genre').textContent = "Genres : ";
		anime.genres.forEach(genre => {
			clone.querySelector('#categorie-genre').textContent = clone.querySelector('#categorie-genre').textContent + genre ;
		});
		clone.querySelector('#classement').textContent = "Rang " + anime.ranking;
		clone.querySelector('#nb-episodes').textContent = anime.episodes + "épisodes";


		container.appendChild(clone);
	});
}


if (!API_KEY) {
	alert("Vous devez fournir une clé API !");
} else {
	var url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10';

	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': API_KEY,
			'x-rapidapi-host': 'anime-db.p.rapidapi.com'
		}
	};

	fetch(url, options)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Erreur HTTP : ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			console.log("Données reçues :", data);

			afficherAnimes(data.data);

		})
		.catch(error => {
			console.error("Erreur lors de la requête :", error);
		});


}