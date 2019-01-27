module.exports = {
  networks: {
      development: {
          host: "localhost",
          port: 7545,
          gas: 5000000,
          network_id: "*" // Match any network id
      }
  }
};