import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import restaurantRouter from './modules/Restaurent/routes/restaurants.routes';
import { loginUserHandler } from './modules/IAM/controller/auth.controller';
import { connectDatabase } from './utils/database/sequelize';
import Employeerouter from './modules/User_employee/routes/Useremployee.route';
import loginRouter from './modules/IAM/routes/auth.route';
import sendotp from './modules/IAM/routes/otp.routes';
const app = express();
const PORT = 8005
app.use(helmet());         
app.use(cors());           
app.use(morgan('dev'));    
app.use(express.json());   

app.get('/', (req, res) => {
  res.send('Server is running');
});
app.get('/dashboard', (req, res) => {
  res.send('<h1>Welcome to the Dashboard</h1>');
});

app.use('/api/restaurants', restaurantRouter);
app.use('/api/employee',Employeerouter );
app.use('/api/iam/auth', loginRouter);
app.use('/api/iam/sendotps', sendotp);
app.use('/api/iam/verifys', sendotp);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const startServer = async () => {
  try {
    await connectDatabase()
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();
