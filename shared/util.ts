import { Document } from "mongoose";

export type PlainInterface<T> = Omit<T, keyof Document> & { _id: string };
