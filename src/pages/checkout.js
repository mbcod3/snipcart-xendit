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
        console.log(data)
        setOrder(data.invoice.amount)
      })
  }, [])

  // simulates successfull order
  const paid = () => {
    const transactionId = uuidv4()
    // fetch("/.netlify/functions/payment", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     paymentSessionId: sessionId.current,
    //     transactionId,
    //     state: "processed",
    //     error: null,
    //   }),
    // })
    //   .then(res => console.log("res", res))
    //   .then(data => console.log("data", data))
    //   .catch(err => console.log("err", err))
    // window.location.href = body.returnUrl
    const defO = {
      paymentSessionId: sessionId.current,
      state: "processed",
      error: null,
      transactionId,
      instructions:
        "Your payment will appear on your statement in the coming days",
    }
    console.log(defO)
    fetch(
      "https://payment.snipcart.com/api/private/custom-payment-gateway/payment",
      {
        method: "POST",
        mode: "no-cors",

        headers: {
          Authorization: `Bearer NDRmZWMyZGMtMzczNi00ZTJlLWJkYTUtNmFhOWU0Y2FhODBiNjM3NjU2ODU3NTg0NDU2ODM1`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(defO),
      }
    )
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(data => console.log(data))
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
