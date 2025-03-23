import React, { useEffect, useState } from 'react';

// Assuming you have an API endpoint that returns a list of concerts
const ConcertList = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch concerts from API when the component mounts
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await fetch('/api/concerts'); // Adjust API endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch concerts');
        }
        const data = await response.json();
        setConcerts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  if (loading) {
    return <div>Loading concerts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Concert List</h1>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id}>
            <h2>{concert.title}</h2>
            <p>Date: {new Date(concert.date).toLocaleDateString()}</p>
            <p>Venue: {concert.venue}</p>
            <p>{concert.description}</p>
            <a href={`/concerts/${concert.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConcertList;
