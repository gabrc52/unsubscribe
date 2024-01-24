import { simpleParser, ParsedMail, EmailAddress } from "mailparser";
import { uploadFile } from "./file";
import FoodEvent from "./models/FoodEvent";

// Why???? Does email really have all of these edge cases? Or is it just the library?
function _getFullFrom(parsed: ParsedMail): EmailAddress | undefined {
  if (!parsed.from) {
    console.warn("Email has no From field?!");
    return undefined;
  }
  if (parsed.from.value.length === 0) {
    console.warn("Email has a From field with no emails?!");
    return undefined;
  }
  if (parsed.from.value.length > 0) {
    console.warn("Email has multiple senders?!");
  }
  return parsed.from.value[0];
}

function getSenderName(parsed: ParsedMail): string | undefined {
  const from = _getFullFrom(parsed);
  return from?.name;
}

function getEmailAddress(parsed: ParsedMail): string {
  const from = _getFullFrom(parsed);
  if (!from || !from.address) return "free-foods@mit.edu";
  return from.address;
}

export async function handleEmail(email: string): Promise<void> {
  const parsed = await simpleParser(email);
  const subject = parsed.subject ?? "No subject";
  const address = getEmailAddress(parsed);
  const name = getSenderName(parsed);
  const body = parsed.text;
  const images = parsed.attachments.filter((attachment) =>
    attachment.contentType.includes("image")
  );
  const imageURLs = await Promise.all(
    images.map((image) => uploadFile(image.content, image.filename, image.contentType))
  );
  // Add email to database
  const event = new FoodEvent({
    title: subject,
    content: body,
    emailer_address: address,
    emailer_name: name,
    scheduled: false, // except for farm stand, community dinner (TODO: handle)
    photos: imageURLs,
  });
  await event.save();
}
