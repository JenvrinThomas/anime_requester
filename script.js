
const API_KEY = prompt("Entrez votre clé API RapidAPI :");

if (!API_KEY) {
    alert("Vous devez fournir une clé API !");
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
