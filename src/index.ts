/**
 *
 * required external dependencies
 *
 */

import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();
/**
 *
 * define app variables
 *
 */

if(!process.env.PORT){
    process.exit();
}

const PORT : number = parseInt(process.env.PORT as string, 10);

const app  = express();

/**
 *
 *  app middleware configuration
 *
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 *
 * fire up the application
 *
 */

app.listen(PORT, ()=> {
    console.log(`app listening on port ${PORT}`);
});
