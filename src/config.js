const config = {
  development: {
    API_URL: 'http://localhost:8010'
  },
  production: {
    API_URL: 'https://api.maperma.org'
  }
}

export default config[process.env.NODE_ENV || 'development']
