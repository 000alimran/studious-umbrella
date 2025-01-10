document.getElementById('searchBtn').addEventListener('click', async () => {
    const query = document.getElementById('search').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Loading...';
  
    if (query) {
      try {
        // TMDB API Example
        const apiKey = 'YOUR_TMDB_API_KEY'; // Replace with your TMDB API Key
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        const data = await response.json();
  
        if (data.results && data.results.length > 0) {
          resultsDiv.innerHTML = '';
          data.results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.innerHTML = `
              <h3>${movie.title}</h3>
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
      resultsDiv.innerHTML = 'Please enter a search term.';
    }
  });
  