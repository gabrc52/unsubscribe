import { simpleParser, ParsedMail, EmailAddress } from "mailparser";
import { uploadFile } from "./file";
import FoodEvent from "./models/FoodEvent";

const FREE_FOOD_PREFIX = "[Free-food] ";

const FREE_FOODS_FOOTER = `
_______________________________________________
Free-foods mailing list
Free-foods@mit.edu
https://mailman.mit.edu/mailman/listinfo/free-foods`;

// TODO: would be nice to remove "get outlook for ios", and other similar footers

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
  if (parsed.from.value.length > 1) {
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
  const rawSubject = parsed.subject ?? "No subject";
  const subject = rawSubject.startsWith(FREE_FOOD_PREFIX)
    ? rawSubject.substring(FREE_FOOD_PREFIX.length)
    : rawSubject;
  const address = getEmailAddress(parsed);
  const name = getSenderName(parsed);

  // remove "free-foods" banner from body:
  const rawBody = parsed.text ?? "";
  const trimmedBody = rawBody.trim();
  const body = trimmedBody.endsWith(FREE_FOODS_FOOTER)
    ? trimmedBody.substring(0, trimmedBody.length - FREE_FOODS_FOOTER.length - 1)
    : trimmedBody;

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
