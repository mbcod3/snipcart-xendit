const axios = require("axios")

module.exports = async (query, variables) => {
  const result = await axios({
    url: "https://graphql.fauna.com/graphql",
    method: "POST",
    headers: {
      Authorization: `Bearer fnAERo5876ACS1xq4E5vTBdRzk21oaMsNU-aE0_9`,
    },
    data: {
      query,
      variables,
    },
  })
  return result.data
}
