var dotenv = require("dotenv")
dotenv.config()
const fetch = require("node-fetch")
const xendit = require("xendit-node")

exports.handler = async function(event) {
  // Retrieve payment information (depends on how your application is made)
  const requestBody = JSON.parse(event.body)
  // this key should never be on client side code. this is serverless function so its safe here
  // Dont forget to change this to yours
  const x = new xendit({
    secretKey:
      "xnd_development_9JnPamiDbqYTrvXBfTqna12zhHFfBP2WvpNEOmilKzrmEFqNdjxzRGTvtvfd7N",
  })

  // Payment processing with xendit
  const { Card } = x
  const cardSpecificOptions = {}
  const card = new Card(cardSpecificOptions)

  const xenditResp = await card.createCharge({
    externalID: requestBody.transactionId,
    tokenID: requestBody.xenditTokenId,
    amount: requestBody.amount,
  })

  // Confirm payment with the snipcart endpoint
  const response = await fetch(
    "https://payment.snipcart.com/api/private/custom-payment-gateway/payment",
    {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${process.env.SECRET_SNIPCART_APIKEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentSessionId: requestBody.paymentSessionId,
        state: requestBody.state,
        error: requestBody.error,
        transactionId: requestBody.transactionId,
        instructions:
          "Your payment will appear on your statement in the coming days",
      }),
    }
  )

  if (response.ok) {
    const body = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, returnUrl: body.returnUrl }),
    }
  } else {
    return {
      statusCode: 300,
      body: JSON.stringify({ ok: true, xenditResp }),
    }
  }
}
