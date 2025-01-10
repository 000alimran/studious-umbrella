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
            resultsDiv.innerHTML = '';

            if (data.results && data.results.length > 0) {
                data.results.forEach(movie => {
                    const movieDiv = document.createElement('div');
                    movieDiv.classList.add('col-md-4', 'mb-4'); // Bootstrap গ্রিড ক্লাস
                    movieDiv.innerHTML = `
                        <div class="card h-100">
                          <img src="${posterBaseUrl + movie.poster_path}" class="card-img-top" alt="${movie.title}">
                          <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">${movie.overview || 'No description available.'}</p>
                          </div>
                        </div>
                    `;
                    resultsDiv.appendChild(movieDiv);
                });
            } else {
                resultsDiv.innerHTML = '<p class="text-center">No results found.</p>';
            }
        } catch (error) {
            resultsDiv.innerHTML = '<p class="text-center text-danger">Error fetching data. Please try again.</p>';
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
