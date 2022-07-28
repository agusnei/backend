import dotenv from 'dotenv';
dotenv.config();

export default {
    mongodb: {
      connectionString: process.env.PAK_MONGO,
    },
    firebase: {
        "type": "service_account",
        "project_id": "coderhouse-backend-78301",
        "private_key_id": "afe5de6f39579cf83dea89ee85f98467018480ce",
        "private_key": process.env.PAK_FIREBASE,
        "client_email": "firebase-adminsdk-ot53g@coderhouse-backend-78301.iam.gserviceaccount.com",
        "client_id": "104846969123883076804",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ot53g%40coderhouse-backend-78301.iam.gserviceaccount.com",      
    },
  };