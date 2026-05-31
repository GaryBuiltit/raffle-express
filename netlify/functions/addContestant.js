import contestant from "../models/contestant.mjs";
import mongoose from "mongoose";
import { getUserObjectId } from "../utils/resolveUser.mjs";
import { connectDb, closeDb } from "../utils/db.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

const resolveHostUserId = async (userValue) => {
  if (!userValue) return null;
  const userStr = String(userValue);
  if (userStr.startsWith("user_")) {
    return getUserObjectId(userStr);
  }
  if (mongoose.Types.ObjectId.isValid(userStr)) {
    return new mongoose.Types.ObjectId(userStr);
  }
  return null;
};

const addContestant = async (request) => {
  try {
    await connectDb();

    const body = await request.json();
    const raffleId = body.raffle;
    const raffleName = body.raffleName;
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const fullName = String(body.fullName ?? `${firstName} ${lastName}`).trim();
    const email = body.email;
    const phone = body.phone;
    const avatar = body.avatar;
    const userValue = body.user;

    const hostUserId = await resolveHostUserId(userValue);
    if (!hostUserId) {
      return new Response(
        JSON.stringify({ error: "Host user not found." }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    let newContestant = new contestant({
      raffle: raffleId,
      raffleName: raffleName,
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      email: email,
      phone: phone,
      avatar: avatar,
      user: hostUserId,
    });

    const savedContestant = await newContestant.save();

    return new Response(JSON.stringify(savedContestant), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("error adding contestant: " + error);
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: corsHeaders,
    });
  } finally {
    await closeDb();
  }
};

export default addContestant;
