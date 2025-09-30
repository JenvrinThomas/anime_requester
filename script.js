const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc');
xhr.setRequestHeader('x-rapidapi-key', 'abc958223amsh3603b2a056c3ecep15863fjsn87c3f37dd4f8');
xhr.setRequestHeader('x-rapidapi-host', 'anime-db.p.rapidapi.com');

xhr.send(data);

console.log(xhr);