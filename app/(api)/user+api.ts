import { neon, neonConfig } from "@neondatabase/serverless";

// Configure neon to use fetch API
neonConfig.fetchConnectionCache = true;

const sql = neon(`${process.env.DATABASE_URL}`);

export async function POST(request: Request) {
  console.log("Creating user","process.env.DATABASE_URL",process.env.DATABASE_URL);
  
  try {
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return new Response(JSON.stringify({ error: "Missing required field" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await sql`
      INSERT INTO users (name, email, clerkId)
      VALUES (${name}, ${email}, ${clerkId})
      RETURNING id, name, email, clerkId
    `;

    if (response.length === 0) {
      throw new Error("Failed to insert user");
    }

    return new Response(JSON.stringify({ data: response[0] }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating user:", error);

    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}