import express, { json } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import portfolioRoutes from './routes/portfolioRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

dotenv.config()



const app = express();
const port = process.env.PORT || 9090;

const databaseName = 'portfolio-db';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
   .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/img",express.static('public/images'));

app.get('/', function(req,res) {
     res.send("welcome to portfolio")
   });

app.use('/user',userRoutes);
app.use('/portfolio',portfolioRoutes);
app.use('/project',projectRoutes);

app.listen(port,() =>{
    console.log("localhost:"+ port)
})
   