import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import restaurantRouter from './modules/Restaurent/routes/restaurants.routes';
import { connectDatabase } from './utils/database/sequelize';
import Employeerouter from './modules/User_employee/routes/Useremployee.route';
import loginRouter from './modules/IAM/routes/auth.route';
import sendotp from './modules/IAM/routes/otp.routes';
import Menurouter from './modules/menu/routes';
import './jobs/dailyEmailJob';
import { Cart } from './modules/cart/model/model';
import { Menu } from './modules/menu/model';
import { Restaurant } from './modules/Restaurent/model/restaurant.model';
import { UserEmployee } from './modules/User_employee/models/userEmployee.model';
import { setupAssociations } from './utils/database/setupAssociations';
import cartRouter from './modules/cart/routes/routes';
import { initModels } from './utils/database/modelLoader';
const app = express();
const PORT = 8005;

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
app.use('/api/employee', Employeerouter);
app.use('/api/iam/auth', loginRouter);
app.use('/api/iam/sendotps', sendotp);
app.use('/api/iam/verifys', sendotp);
app.use('/api/Menu', Menurouter);
app.use('/api/cart', cartRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const startServer = async () => {
  try {
    await connectDatabase();

    await  initModels();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
