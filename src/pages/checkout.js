import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Checkout = () => {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    // Get public token from query string
    const publicToken = new URLSearchParams(window.location.search).get(
      "publicToken"
    )

    // Fetch payment session from API
    fetch(
      `https://payment.snipcart.com/api/public/custom-payment-gateway/payment-session?publicToken=${publicToken}`
    )
      .then(res => response.ok && res.json())
      .then(data => {
        console.log(data)
      })
  }, [])
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="container">
        <div className="text-center mt-5">
          <h2 className="with-underline">Checkout Page</h2>
          {/* {order ? (

          ) : 'loading'} */}
        </div>
      </div>
    </Layout>
  )
}
export default Checkout
