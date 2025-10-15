function afficherAnimes(animes) {
  const container = document.getElementById('results-container');
  const template = document.getElementById('carte');

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
    clone.querySelector('#titre').textContent = anime.title || 'Titre inconnu';
    const img = clone.querySelector('#image');
    img.src = anime.image || '';
    img.alt = anime.title || '';
    clone.querySelector('#synopsis').textContent = anime.synopsis || '';
    clone.querySelector('#categorie-genre').textContent = 'Genres : ' + (anime.genres?.join(', ') || 'N/A');
    clone.querySelector('#classement').textContent = 'Rang ' + (anime.rank || anime.ranking || 'N/A');
    clone.querySelector('#nb-episodes').textContent = (anime.episodes ?? 'N/A') + ' épisode(s)';
    container.appendChild(clone);
  });
}


async function chargerGenres() {
  let API_KEY = sessionStorage.getItem('RAPIDAPI_KEY') || prompt('Entrez votre clé API RapidAPI :');
  if (!API_KEY) { alert('Vous devez fournir une clé API !'); return; }
  sessionStorage.setItem('RAPIDAPI_KEY', API_KEY);

  const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=100';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'anime-db.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const animes = data.data || [];
    const genres = new Set();
    animes.forEach(a => a.genres?.forEach(g => genres.add(g)));
    afficherGenres(Array.from(genres).sort());
  } catch (err) {
    console.error('Erreur chargement genres :', err);
  }
}


function afficherGenres(genres) {
  const genreContainer = document.getElementById('genre-dropdown');
  genreContainer.innerHTML = `
    <button id="toggle-genre-list" type="button">Sélectionner les genres ▼</button>
    <div id="genre-list" class="genre-list hidden"></div>
  `;

  const genreList = genreContainer.querySelector('#genre-list');
  genres.forEach(genre => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" name="genre" value="${genre}"> ${genre}`;
    genreList.appendChild(label);
  });

  genreContainer.querySelector('#toggle-genre-list').addEventListener('click', () => {
    genreList.classList.toggle('hidden');
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const titreInput = document.getElementById('anime-name');
  const idInput = document.getElementById('anime-id');
  const resultsContainer = document.getElementById('results-container');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let API_KEY = sessionStorage.getItem('RAPIDAPI_KEY');
    if (!API_KEY) {
      API_KEY = prompt('Entrez votre clé API RapidAPI :');
      if (!API_KEY) { alert('Vous devez fournir une clé API !'); return; }
      sessionStorage.setItem('RAPIDAPI_KEY', API_KEY);
    }

    const searchType = document.getElementById('search-type').value;
    const title = titreInput.value.trim();
    const id = idInput.value.trim();
    const rank = document.getElementById('anime-rank').value.trim();

    let url = '';
    if (searchType === 'title') {
      url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${encodeURIComponent(title)}`;
    } else if (searchType === 'id') {
      url = `https://anime-db.p.rapidapi.com/anime/by-id/${encodeURIComponent(id)}`;
    } else if (searchType === 'rank') {
      url = `https://anime-db.p.rapidapi.com/anime/by-ranking/${encodeURIComponent(rank)}`;
    }

    const genresSelectionnes = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(g => g.value);
    if (genresSelectionnes.length > 0) {
      url += `&genres=${encodeURIComponent(genresSelectionnes.join(','))}`;
    }

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'anime-db.p.rapidapi.com'
      }
    };

    resultsContainer.innerHTML = '<p>Recherche en cours...</p>';

    fetch(url, options)
      .then(res => {
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        return res.json();
      })
      .then(data => {
        const animeData = data.data || (Array.isArray(data) ? data : [data]);
        afficherAnimes(animeData);
      })
      .catch(err => {
        console.error('Erreur lors de la requête :', err);
        resultsContainer.innerHTML = '<p>Erreur lors de la récupération des données.</p>';
      });
  });


  chargerGenres();
});
