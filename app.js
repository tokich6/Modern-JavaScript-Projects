const form = document.querySelector('#search-form');
const container = document.querySelector('#img-container');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchQuery = form.elements.q.value;
    if (!searchQuery) {
        alert('Please enter a title or a keyword')
    }
    requestImages(searchQuery)
        .then(function (results) {
            displayImages(results);
        });
    form.elements.q.value = '';
    container.innerHTML = '';
})

async function requestImages(query) {
    try {
        const config = { params: { q: query } }
        const res = await axios.get('http://api.tvmaze.com/search/shows', config);
        return res.data;
    } catch (err) {
        console.log(err);
    }

}

const displayImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const image = document.createElement('IMG');
            image.src = result.show.image.medium;
            container.append(image);
        }
    }
}