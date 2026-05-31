import user from "../models/User.mjs";
import { connectDb, closeDb } from "../utils/db.mjs";

const createUser = async (request) => {
  try {
    await connectDb();

    const body = await request.json();
    const newEmail = body?.data?.email_addresses[0]?.email_address;
    const userID = body?.data?.id;
    const firstName = body?.data?.first_name ?? "";
    const lastName = body?.data?.last_name ?? "";
    const name =
      [firstName, lastName].filter(Boolean).join(" ") ||
      undefined;
    const userName = body?.data?.username || undefined;

    const existingUser = await user.findOne({ email: newEmail });
    if (existingUser) {
      return new Response(JSON.stringify(existingUser), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    let newUser = new user({
      userID: userID,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: newEmail,
      name: name,
    });

    const savedUser = await newUser.save();

    return new Response(JSON.stringify(savedUser), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.log("error creating user: " + error);
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } finally {
    await closeDb();
  }
};

export default createUser;
