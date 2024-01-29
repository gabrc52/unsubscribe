// import { OpenAI } from "openai";
// import { ChromaClient } from "chromadb";
// import Document from "./models/document";

// require("dotenv").config();

// const ANYSCALE_API_KEY: string | undefined = process.env.ANYSCALE_API_KEY;
// const CHROMADB_URI: string = process.env.CHROMADB_URI || "http://localhost:8000";

// // some information about this model: https://ai.meta.com/llama/
// const MODEL: string = "meta-llama/Llama-2-13b-chat-hf";

// // another common choice of embedding model is text-embedding-ada-002.
// // we use gte-large because this is the only embedding model anyscale has access to
// const EMBEDDING_MODEL: string = "thenlper/gte-large";

// const anyscale = new OpenAI({
//   baseURL: "https://api.endpoints.anyscale.com/v1",
//   apiKey: ANYSCALE_API_KEY,
// });

// // check whether the api key is valid.
// // this is only called on server start, so it does not waste too many resources (and will present expensive server crashes when api keys expire)
// let hasapikey: boolean = false;
// const validateAPIKey = async (): Promise<boolean> => {
//   try {
//     await anyscale.chat.completions.create({
//       model: "meta-llama/Llama-2-7b-chat-hf",
//       messages: [{ role: "system", content: "" }],
//     });
//     hasapikey = true;
//     return hasapikey;
//   } catch {
//     console.log("validate api key failed");
//     return hasapikey;
//   }
// };

// let collection: any = null; // TODO: replace 'any' with the actual type of 'collection'
// const isRunnable = () => hasapikey && collection !== null;

// // initialize vector database
// const COLLECTION_NAME: string = "foodevents";
// const client = new ChromaClient({
//   path: CHROMADB_URI,
// });

// // sync main and vector dbs
// const syncDBs = async (): Promise<void> => {
//   // retrieve all documents
//   const allDocs = await collection.get();
//   // delete all documents
//   await collection.delete({
//     ids: allDocs.ids,
//   });
//   // retrieve corpus from main db
//   const allMongoDocs = await Document.find({}); // CANNOT RESOLVE NAMING ERRORS
//   if (allMongoDocs.length === 0) {
//     // avoid errors associated with passing empty lists to chroma
//     console.log("number of documents", await collection.count());
//     return;
//   }
//   const allMongoDocIds = allMongoDocs.map((mongoDoc) => mongoDoc._id.toString());
//   const allMongoDocContent = allMongoDocs.map((mongoDoc) => mongoDoc.content);
//   let allMongoDocEmbeddings = allMongoDocs.map((mongoDoc) => generateEmbedding(mongoDoc.content));
//   allMongoDocEmbeddings = await Promise.all(allMongoDocEmbeddings); // ensure embeddings finish generating
//   // add corpus to vector db
//   await collection.add({
//     ids: allMongoDocIds,
//     embeddings: allMongoDocEmbeddings,
//     documents: allMongoDocContent,
//   });
//   console.log("number of documents", await collection.count());
// };

// const initCollection = async (): Promise<void> => {
//   await validateAPIKey();
//   if (!hasapikey) return;
//   try {
//     collection = await client.getOrCreateCollection({
//       name: COLLECTION_NAME,
//     });
//     // initialize collection embeddings with corpus
//     // in production, this function should not run that often, so it is OK to resync the two dbs here
//     await syncDBs();
//     console.log("finished initializing chroma collection");
//   } catch (error) {
//     console.log("chromadb not running");
//   }
// };

// // This is an async function => we don't know that the collection is
// // initialized before someone else runs functions that depend on the 
// // collection, so we could get null pointer errors when collection = null
// // before initCollection() has finished. That's probably okay, but if we 
// // see errors, it's worth keeping in mind.
// initCollection();

// // embedding helper function
// const generateEmbedding = async (document: any): Promise<any> => {
//   const embedding = await anyscale.embeddings.create({
//     model: EMBEDDING_MODEL,
//     input: document,
//   });
//   return embedding.data[0].embedding;
// };

// chat completion helper function
// const chatCompletion = async (query: string, context: string): Promise<string> => {
//   const prompt = {
//     model: MODEL,
//     messages: [
//       {
//         role: "system",
//         content:
//           "Your role is to answer questions for a user. You are given the following context to help you answer questions: \n" +
//           `${context}. \n` +
//           "Please do not mention that you were given any context in your response.",
//       },
//       { role: "user", content: `${query}` },
//     ],
//     // temperature controls the variance in the llms responses
//     // higher temperature = more variance
//     temperature: 0.7,
//   };
//   const completion = await anyscale.chat.completions.create(prompt);
//   return completion.choices[0].message.content; // RESOLVE????????
// };

// // retrieving context helper function
// const NUM_DOCUMENTS: number = 2;
// const retrieveContext = async (query: string, k: number): Promise<string[]> => {
//   const queryEmbedding = await generateEmbedding(query);
//   const results = await collection.query({
//     queryEmbeddings: [queryEmbedding],
//     nResults: k,
//   });
//   return results.documents;
// };

// // RAG
// const retrievalAugmentedGeneration = async (query: string): Promise<string> => {
//   const context = await retrieveContext(query, NUM_DOCUMENTS);
//   const llmResponse = await chatCompletion(query, context);
//   return llmResponse;
// };

// // add a document to collection
// const addDocument = async (document: any): Promise<void> => {
//   const embedding = await generateEmbedding(document.content);
//   await collection.add({
//     ids: [document._id.toString()],
//     embeddings: [embedding],
//     documents: [document.content],
//   });
// };

// // update a document in collection
// const updateDocument = async (document: any): Promise<void> => {
//   await collection.delete({ ids: [document._id.toString()] });
//   await addDocument(document);
// };

// // delete a document in collection
// const deleteDocument = async (id: string): Promise<void> => {
//   await collection.delete({
//     ids: [id.toString()],
//   });
// };

// export {
//   isRunnable,
//   addDocument,
//   updateDocument,
//   deleteDocument,
//   retrievalAugmentedGeneration,
// };
