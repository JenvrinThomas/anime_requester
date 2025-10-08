
let API_KEY = prompt("Entrez votre clé API RapidAPI :");

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('search-button').addEventListener('click', fetchAnimeData);
	if (!API_KEY) {
		alert("Vous devez fournir une clé API !");
		API_KEY = prompt("Entrez votre clé API RapidAPI :");
	} else {
		const data = null;
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener('readystatechange', function () {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
			}
		});

		let titre = document.getElementById("anime-name").value;


		xhr.open('GET', 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=' + titre + '&sortBy=ranking&sortOrder=asc');
		xhr.setRequestHeader('x-rapidapi-key', API_KEY);
		xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');

		xhr.responseType = 'json';

		xhr.send(data);


		xhr.addEventListener('load', function () {
			if (this.status === 200) {
				console.log(this.responseText);
			} else {
				console.error('Erreur lors de la récupération des données');
			}
		});

		console.log(xhr.responseText);

	}


});