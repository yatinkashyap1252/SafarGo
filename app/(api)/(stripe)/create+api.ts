import { Stripe } from "stripe";

const stripe = new Stripe(process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      amount,
      rideTime,
      driverId,
      userId,
      userAddress,
      userLatitude,
      userLongitude,
      destinationAddress,
      destinationLatitude,
      destinationLongitude,
      paymentMethodId,
    } = body;

    if (!name || !email || !amount) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const customerExist = await stripe.customers.list({ email });

    let customer;
    if (customerExist.data.length > 0) {
      customer = customerExist.data[0];
    } else {
      customer = await stripe.customers.create({ email, name });
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2023-10-16" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number.parseInt(amount) * 100,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    if (!paymentIntent || !customer) {
      console.error("Payment intent or customer is undefined.");
      return Response.json({ error: "Payment setup failed" }, { status: 500 });
    }

    console.log("Payment Intent:", paymentIntent);
    console.log("Customer ID:", customer.id);

    if (paymentIntent?.client_secret) {
      console.log("Calling /api/stripe/pay");
      const baseUrl = new URL(request.url).origin;

      const payResponse = await fetch(`${baseUrl}/(api)/(stripe)/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_method_id: paymentMethodId,
          payment_intent_id: paymentIntent.id,
          customer_id: customer.id,
          client_secret: paymentIntent.client_secret,
        }),
      });

      if (!payResponse.ok) {
        return Response.json(
          {
            error: `Payment processing failed with status ${payResponse.status}`,
          },
          { status: 500 }
        );
      }

      const { result } = await payResponse.json();
      console.log("/(api)/(stripe)/pay response:", result);

      if (result?.client_secret) {
        console.log("Creating ride");
        const rideResponse = await fetch(`${baseUrl}/(api)/(ride)/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin_address: userAddress,
            destination_address: destinationAddress,
            origin_latitude: userLatitude,
            origin_longitude: userLongitude,
            destination_latitude: destinationLatitude,
            destination_longitude: destinationLongitude,
            ride_time: rideTime.toFixed(0),
            fare_price: Number.parseInt(amount) * 100,
            payment_status: "paid",
            driver_id: driverId,
            user_id: userId,
          }),
        });

        if (!rideResponse.ok) {
          return Response.json(
            {
              error: `Ride creation failed with status ${rideResponse.status}`,
            },
            { status: 500 }
          );
        }

        // console.log("Ride created successfully", rideData);
        return Response.json(
          {
            clientSecret: paymentIntent.client_secret,
          },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    console.error("Error in /api/stripe/create:", error);
    return Response.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
