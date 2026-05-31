import user from "../models/User.mjs";
import { connectDb, closeDb } from "../utils/db.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const getUser = async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    await connectDb();

    const body = await request.json();
    const clerkId = body.clerkId;
    const email = body.email;
    const name = body.name;
    const userName = body.userName;
    const firstName = body.firstName;
    const lastName = body.lastName;

    if (!clerkId || !email) {
      return new Response(
        JSON.stringify({ error: "clerkId and email are required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const update = {
      $setOnInsert: { userID: clerkId, email, },
    };


    const dbUser = await user.findOneAndUpdate({ userID: clerkId }, update, {
      upsert: true,
      new: true,
      runValidators: true,
    });

    return new Response(JSON.stringify(dbUser), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("getUser error: " + error);
    const status =
      error.message === "Database connection failed" ? 500 : 400;
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to get user",
      }),
      { status, headers: corsHeaders }
    );
  } finally {
    await closeDb();
  }
};

export default getUser;
