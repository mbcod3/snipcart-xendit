import axios from "axios"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Checkout = () => {
  const t = async () =>
    await axios.post("/.netlify/functions/payment-methods", {
      PublicToken: "1",
    })
  console.log(t())
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="container">
        <div className="text-center mt-5">
          <h2 className="with-underline">Checkout Page</h2>
        </div>
      </div>
    </Layout>
  )
}
export default Checkout
