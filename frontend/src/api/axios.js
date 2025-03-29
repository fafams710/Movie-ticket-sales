import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://movie-ticket-sales-dj-ca66216bdd9a.herokuapp.com/', // Base URL for all requests
    timeout: 5000,                      // Request timeout (optional)
    headers: {
      'Content-Type': 'application/json', // Default content type
      Accept: 'application/json',
    },
  });