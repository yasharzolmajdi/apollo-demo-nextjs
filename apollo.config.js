module.exports = {
  client: {
    includes: ["./**/*.tsx"],
    addTypename: true,
    service: {
      name: "app2",
      url: "http://localhost:4000",
    },
  },
};
