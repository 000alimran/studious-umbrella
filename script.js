document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('search').value.trim();
    const homePage = document.getElementById('homePage');
    const resultPage = document.getElementById('resultPage');
    const resultsDiv = document.getElementById('results');
    const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';

    if (query) {
        try {
            // Fetch data from TMDB API
            const apiKey = 'fc9e4d70334af69561568e71d949179a';
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
            const data = await response.json();

            // Switch to Result Page
            homePage.style.display = 'none';
            resultPage.style.display = 'block';
            resultsDiv.innerHTML = 'Loading...';

            if (data.results && data.results.length > 0) {
                resultsDiv.innerHTML = '';
                data.results.forEach(movie => {
                    const movieDiv = document.createElement('div');
                    movieDiv.innerHTML = `
                        <h3>${movie.title}</h3>
                        <img src="${posterBaseUrl + movie.poster_path}" alt="${movie.title}" style="width: 100%; border-radius: 8px; margin-top: 10px;">
                        <p>${movie.overview || 'No description available.'}</p>
                    `;
                    resultsDiv.appendChild(movieDiv);
                });
            } else {
                resultsDiv.innerHTML = 'No results found.';
            }
        } catch (error) {
            resultsDiv.innerHTML = 'Error fetching data. Please try again.';
        }
    } else {
        alert('Please enter a movie name to search.');
    }
});

// Back to Home Button Functionality
document.getElementById('backToHomeBtn').addEventListener('click', () => {
    const homePage = document.getElementById('homePage');
    const resultPage = document.getElementById('resultPage');

    // Switch back to Home Page
    homePage.style.display = 'block';
    resultPage.style.display = 'none';
    document.getElementById('search').value = ''; // Clear search input
});
