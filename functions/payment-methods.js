const fetch = require("node-fetch")

exports.handler = async event => {
  // Get request's token
  const { publicToken } = event.queryStringParameters

  // Validate that the request is coming from Snipcart
  const response = await fetch(
    `https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${publicToken}`
  )

  // Return a 404 if the request is not from Snipcart
  if (!response.ok)
    return {
      statusCode: 404,
      body: "",
    }

  // Create a payment method list
  let paymentMethodList = [
    {
      id: "xendit0765291",
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
