import contestant from "../models/contestant.mjs";
import { connectDb, closeDb } from "../utils/db.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const getContestant = async (request) => {
  try {
    await connectDb();

    const body = await request.json();
    const contestantId = body.contestantId ?? body.contestantID ?? body._id;

    let result = await contestant.findById(contestantId).exec();
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

export default getContestant;
