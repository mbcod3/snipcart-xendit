const fetch = require("node-fetch")
const sendQuery = require("./send-query")

const SAVE_CODE = `
mutation($text: String!) {
  createTodo(data: {text: $text, completed: false }) {
    _id
    text
    completed
  }
}
`

exports.handler = async event => {
  // Get request's token
  const { publicToken } = event.queryStringParameters
  console.log(publicToken)
  // Validate that the request is coming from Snipcart
  const response = await fetch(
    `https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${publicToken}`
  )
  await sendQuery(SAVE_CODE, { text: `hello ${publicToken}` })
  // await sendQuery(SAVE_CODE, { text: JSON.stringify(response) })
  // Return a 404 if the request is not from Snipcart
  if (!response.ok)
    return {
      statusCode: 404,
      body: "not found",
    }

  // Create a payment method list
  let paymentMethodList = [
    {
      id: "xendit",
      name: "Xendit",
      iconUrl: "https://snipcart-xendit.netlify.app/static/xendit-logo.png",
      checkoutUrl: "https://snipcart-xendit.netlify.app/checkout",
    },
  ]

  // Return successful status code and available payment methods
  return {
    statusCode: 200,
    body: JSON.stringify(paymentMethodList),
  }
}
