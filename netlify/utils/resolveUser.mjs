import user from "../models/User.mjs";

export async function getUserByClerkId(clerkUserId) {
  if (!clerkUserId) return null;
  return user.findOne({ userID: clerkUserId });
}

export async function getUserObjectId(clerkUserId) {
  const doc = await getUserByClerkId(clerkUserId);
  return doc?._id ?? null;
}
