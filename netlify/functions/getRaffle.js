import raffle from "../models/Raffle.mjs";
import contestant from "../models/contestant.mjs";
import { connectDb, closeDb } from "../utils/db.mjs";
import { formatPublicContestantName } from "../utils/formatPublicContestantName.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

const getRaffle = async (request) => {
  try {
    await connectDb();

    const body = await request.json();
    const rafflePin = body.rafflePin;

    let result = await raffle.findOne({ pin: rafflePin }).lean();

    if (!result) {
      return new Response(JSON.stringify({ error: "Raffle not found" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    const contestants = await contestant
      .find({ raffle: result._id })
      .select("avatar firstName lastName fullName name")
      .lean();

    result.contestants = contestants.map((entry) => ({
      avatar: entry.avatar,
      displayName: formatPublicContestantName(entry),
    }));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: corsHeaders,
    });
  } finally {
    await closeDb();
  }
};

export default getRaffle;
