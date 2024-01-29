import User from "./models/User";

export async function getCreatorName(userId: string, emailName: string): Promise<string> {
  console.log("trying to get creator name", userId, emailName);
  try {
    if (userId) {
      const user = await User.findOne({ userId });
      console.log(user);
      return user ? user.name : "Unknown";
    } else {
      return emailName || "Unknown";
    }
  } catch (error) {
    console.error("Error getting creator name:", error);
    return "Unknown";
  }
}
