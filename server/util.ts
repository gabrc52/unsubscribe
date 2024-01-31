import User from "./models/User";
import { FoodEvent } from "./models/FoodEvent";

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

/**
 * Populate a list of food events with names
 *
 * @param foodEvents such list
 * @returns the same list with the added fields "creator" with creator name
 * and "markedGoneName" with the name of the person who marked as gone
 */
export async function populateFoodEvents(foodEvents: FoodEvent[]) {
  return await Promise.all(
    foodEvents.map(async (event) => {
      const creator = await getCreatorName(event.creator_userId, event.emailer_name);
      let markedGoneName: string | undefined;
      if (event.markedGoneBy) {
        const markedGoneUser = await User.findOne({
          userId: event.markedGoneBy,
        });
        markedGoneName = markedGoneUser?.name;
      }
      return { ...event.toObject(), creator, markedGoneName };
    })
  );
}
