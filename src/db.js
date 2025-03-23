import { openDB } from "idb";

const initializeDB = async () => {
  return openDB("faceRecognitionDB", 1, {
    upgrade(db) {
      // Create an object store (like a database table)
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", {
          keyPath: "id", // Unique identifier for each entry
          autoIncrement: true,
        });
      }
    },
  });
};

export default initializeDB;
