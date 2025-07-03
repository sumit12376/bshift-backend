// import bcrypt from 'bcrypt';
// import { User } from '../models/user.model';
// import { generateAccessToken } from '../../../utils/security/security';
// interface LoginInput {
//   identifier: string;
//   password: string;
// }

// export async function loginUser({ identifier, password }: LoginInput) {
//   const user = await User.findOne({
//     where: { email: identifier },
//     paranoid: false,
//   });

//   if (!user) {
//     return { status: false, message: 'wrong email' };
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return { status: false, message: 'wrong password' };
//   }

//   const tokenData = {
//     id: user.id,
//     email: user.email,
//   };

//   const userToken = generateAccessToken(tokenData).token;

//   return {
//     status: true,
//     message: 'Login successful',
//     user: {
//       token: userToken,
//       id: user.id,
//       email: user.email,
//       name: user.firstName + ' ' + user.lastName,
//     },
//   };
// }






import bcrypt from 'bcrypt';
import { getCachedItem, setCachedItem } from "../../../utils/redis/redisHelper";
import { User } from '../models/user.model';
import { generateAccessToken } from '../../../utils/security/security';
import { UserEmployee } from '../../../modules/User_employee/models/userEmployee.model';
interface LoginInput {
  identifier: string;
  password: string;
}

export async function loginUser({ identifier, password }: LoginInput) {
  const user = await UserEmployee.findOne({
    where: { email: identifier },
    paranoid: false,
  });

  if (!user) {
    return { status: false, message: 'Wrong email' };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: false, message: 'Wrong password' };
  }

  const tokenData = {
    id: user.id,
    email: user.email,
  };

  const userToken = generateAccessToken(tokenData).token;

  const RedisIdentifier = {
    OTP: 'OTP'
  };

  await setCachedItem(
    `${RedisIdentifier.OTP}::${userToken }`, 
    {
      id: user.id,
      email: user.email
    }
  );

  return {
    status: true,
    message: 'Login successful',
    user: {
      token: userToken,
      id: user.id,
      email: user.email,
      name: user.name
    },
  };
}




