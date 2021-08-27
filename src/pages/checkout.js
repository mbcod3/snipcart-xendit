import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Checkout = () => {
  const [order, setOrder] = useState(null)
  const sessionId = React.useRef(null)
  useEffect(() => {
    // Get public token from query string
    const publicToken = new URLSearchParams(window.location.search).get(
      "publicToken"
    )

    // Fetch payment session from API
    fetch(
      `https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session?publicToken=${publicToken}`
    )
      .then(res => res.ok && res.json())
      .then(data => {
        sessionId.current = data.id
        setOrder(data.invoice.amount)
      })
  }, [])

  // simulates successfull order
  const paid = async () => {
    const transactionId = uuidv4()
    const response = await fetch("/.netlify/functions/payment", {
      method: "POST",
      body: JSON.stringify({
        paymentSessionId: sessionId.current,
        transactionId,
        state: "processed",
        error: null,
      }),
    })
    const body = await response.json()
    console.log(body)
    // window.location.href = body.returnUrl
  }
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="container">
        <div className="text-center mt-5">
          <h2 className="with-underline">Checkout Page</h2>
          <p>{order ? order : ""}</p>
          <button onClick={paid}>Paid</button>
        </div>
      </div>
    </Layout>
  )
}
export default Checkout