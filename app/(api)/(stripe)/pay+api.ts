import { Stripe } from "stripe"

const stripe = new Stripe(process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    console.log("POST request to /api/stripe/pay")

    const body = await request.json()
    const { payment_method_id, payment_intent_id, customer_id } = body

    if (!payment_method_id || !payment_intent_id || !customer_id) {
      return new Response(JSON.stringify({ error: "Missing required payment information" }), { status: 400 })
    }

    console.log("Attaching payment method to customer")
    const paymentMethod = await stripe.paymentMethods.attach(payment_method_id, { customer: customer_id })

    console.log("Confirming payment intent")
    const result = await stripe.paymentIntents.confirm(payment_intent_id, {
      payment_method: paymentMethod.id,
    })

    console.log("Payment successful")
    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment successful",
        result,
      }),
    )
  } catch (error) {
    console.error("Error in /api/stripe/pay:", error)
    return new Response(JSON.stringify({ error: "An error occurred while processing payment" }), { status: 500 })
  }
}

