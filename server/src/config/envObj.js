import dotenv from 'dotenv';
dotenv.config({path: '.env'});

const envObj = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET
    };

    export default Object.freeze(envObj);