const admin = require("firebase-admin");

class FirebaseService {
  static getDB() {
    if (!FirebaseService.db) {
      let privateKey = process.env.FIREBASE_PRIVATE_KEY;
      privateKey = privateKey.replace(/\\n/g, "\n");

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          private_key: privateKey,
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
      FirebaseService.db = admin.firestore();
    }
    return FirebaseService.db;
  }
}
module.exports = FirebaseService;
