const admin = require("firebase-admin");
require("dotenv").config(); // Load environment variables from .env

// Create service account object from environment variables
const serviceAccount = {
  type: process.env.SERVICE_ACCOUNT_TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Ensure newline characters are correctly parsed
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

// Initialize Firebase Admin SDK with the dynamically created service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`, // Use the project ID from environment variables
});

// Create a reference to the storage bucket
const bucket = admin.storage().bucket();

module.exports = bucket;
