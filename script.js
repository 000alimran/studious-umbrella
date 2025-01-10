// Select the toggle button
const themeToggle = document.getElementById('themeToggle');

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Light Mode';
    }
});

// Toggle the theme
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Existing functionality
document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('search').value.trim();
    const homePage = document.getElementById('homePage');
    const resultPage = document.getElementById('resultPage');
    const resultsDiv = document.getElementById('results');
    const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';

    if (query) {
        try {
            const apiKey = 'fc9e4d70334af69561568e71d949179a';
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
            const data = await response.json();

            homePage.style.display = 'none';
            resultPage.style.display = 'block';
            resultsDiv.innerHTML = '';

            if (data.results && data.results.length > 0) {
                data.results.forEach(movie => {
                    const movieDiv = document.createElement('div');
                    movieDiv.classList.add('col-md-4', 'mb-4');
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

    homePage.style.display = 'block';
    resultPage.style.display = 'none';
    document.getElementById('search').value = '';
});
