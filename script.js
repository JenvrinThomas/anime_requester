const API_KEY = prompt("Entrez votre clé API RapidAPI :");

if (!API_KEY) {
  alert("Vous devez fournir une clé API !");
} else {
  // URL de l'API
  const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10';

  // Options de la requête fetch
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'anime-db.p.rapidapi.com'
    }
  };

  // Envoi de la requête
  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json(); // convertit la réponse en JSON
    })
    .then(data => {
      console.log("Données reçues :", data);
    })
    .catch(error => {
      console.error("Erreur lors de la requête :", error);
    });
}