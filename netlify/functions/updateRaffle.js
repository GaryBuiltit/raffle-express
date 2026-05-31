import raffle from "../models/Raffle.mjs";
import { getUserObjectId } from "../utils/resolveUser.mjs";
import { connectDb, closeDb } from "../utils/db.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const updateRaffle = async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    await connectDb();

    const body = await request.json();
    const raffleId = body.raffleId;
    const clerkUserId = body.user;
    const raffleName = body.raffleName;
    const endDate = body.endDate;
    const endTime = body.endTime;
    const raffleDescription = body.description;
    const phone = body.phone ?? body.requirePhone;

    if (!raffleId || !clerkUserId) {
      return new Response(
        JSON.stringify({ error: "raffleId and user are required" }),
        { status: 400, headers: corsHeaders },
      );
    }

    const hostUserId = await getUserObjectId(clerkUserId);
    if (!hostUserId) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const updated = await raffle.findOneAndUpdate(
      { _id: raffleId, user: hostUserId },
      {
        $set: {
          raffleName,
          endDate,
          endTime,
          description: raffleDescription,
          phone,
        },
      },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return new Response(JSON.stringify({ error: "Raffle not found" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("error updating raffle: " + error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to update raffle" }),
      { status: 400, headers: corsHeaders },
    );
  } finally {
    await closeDb();
  }
};

export default updateRaffle;
