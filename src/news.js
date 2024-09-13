import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // For pagination
  const [query, setQuery] = useState(''); // For searching news

  // Function to fetch news from the GNews API
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/search?q=${query}&token=${process.env.REACT_APP_GNEWS_API_KEY}&lang=en&max=10&page=${page}`
      );
      setNews(response.data.articles);
    } catch (err) {
      setError('Failed to fetch news');
    }
    setLoading(false);
  };

  // Call fetchNews when the component is mounted or when the page/query changes
  useEffect(() => {
    fetchNews();
  }, [page, query]);

  return (
    <div className="news-app">
      <h1>ACONEWS</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news..."
        />
        <button onClick={fetchNews}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default News;
