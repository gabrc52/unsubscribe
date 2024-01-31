import User from "./models/User";

export async function getCreatorName(
  userId: string | undefined,
  emailName: string | undefined
): Promise<string> {
  try {
    if (userId) {
      const user = await User.findOne({ userId });
      return user ? user.name : "Unknown";
    } else {
      return emailName || "Unknown";
    }
  } catch (error) {
    console.error("Error getting creator name:", error);
    return "Unknown";
  }
}
