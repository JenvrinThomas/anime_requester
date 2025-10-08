const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.response);
	}
});

xhr.open('GET', 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc');
xhr.setRequestHeader('x-rapidapi-key', 'b4e3a50847msha5e7f56d00b94dcp1410d3jsn44b88bda6122');
xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');

xhr.responseType = 'json';

xhr.send(data);


xhr.addEventListener('load', function () {
	if (this.status === 200) {
		console.log(this.response);
	} else {
		console.error('Erreur lors de la récupération des données');
	}
});

console.log(xhr);


const API_KEY = prompt("Entrez votre clé API RapidAPI :");

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

    xhr.open('GET', 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc');
    xhr.setRequestHeader('x-rapidapi-key', API_KEY);
    xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');

    xhr.send(data);
}
