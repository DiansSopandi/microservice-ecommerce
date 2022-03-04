import express from 'express';
import mongoose from 'mongoose';
import amqp from 'amqplib';
import bodyParser from 'body-parser';
import cors from 'cors';
import { isAuthenticated } from '../../isAuthenticated';
import productRoutes from './routes/products';

const app = express();
const PORT = process.env.PORT|| 8080;
const DB = "mongodb://127.0.0.1/ecommerce-services-product";

app.use(cors());
app.use(bodyParser.json());

// app.get('/',(req,res)=>{res.status(200).json({success: true, message:"Home JSON message"}) });
app.use('/products',isAuthenticated, productRoutes);

const main = async () => {
    try {        
        await mongoose.connect(DB, 
            { useNewUrlParser: true,
              useUnifiedTopology: true
            }
        )
        .then(app.listen(PORT, () => {            
             console.log(`ecommerce services product at http://localhost:${PORT}`);
             console.log('ecommerce services product DB connected');
        }))
        .catch((error)=> console.log(`connection error: ${error}`));
    } catch (error) {        
        console.log(`Unable to start the server : \n ${error.message}`);
    }
}

async function connectMQ() {
    const amqpServer = 'amqp://localhost:5672';
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue('PRODUCT');
    console.log('rabbitMQ succeded');
}

connectMQ();
main();