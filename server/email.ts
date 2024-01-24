import { simpleParser } from "mailparser";

export async function handleEmail(email: string): Promise<void> {
  const parsed = await simpleParser(email);
  const subject = parsed.subject ?? "No subject";
  const from = parsed.from ?? "free-foods@mit.edu";
  console.log(subject, from);
  console.log(parsed.text);
}
