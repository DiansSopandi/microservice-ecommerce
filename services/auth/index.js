import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/users';

const app = express();
const PORT = process.env.PORT|| 7070;
const DB = "mongodb://127.0.0.1/ecommerce-services-auth";

app.use(cors());
app.use(bodyParser.json());

// app.get('/',(req,res)=>{res.status(200).json({success: true, message:"Home JSON message"}) });
app.use('/users', userRoutes);

const main = async () => {
    try {        
        await mongoose.connect(DB, 
            { useNewUrlParser: true,
              useUnifiedTopology: true
            }
        )
        .then(app.listen(PORT, () => {            
             console.log(`ecommerce services auth at http://localhost:${PORT}`);
             console.log('ecommerce services auth DB connected');
        }))
        .catch((error)=> console.log(`connection error: ${error}`));
    } catch (error) {        
        console.log(`Unable to start the server : \n ${error.message}`);
    }
}

main();