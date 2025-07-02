import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
export const hash = async (password: string, saltRound: string | number): Promise<string> => {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRound, (error, hash) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(hash);
      }
    });
  });
};

export const compareHash = async (toCompare: string, hashed: string): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(toCompare, hashed, (error, isMatch) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(isMatch);
      }
    });
  });
};

export const generateAccessToken = (model: IAccessTokenModel): IAccessTokenResult => {
  const encryptionKey ='SECRET';

  const refreshTokenPayload = {
    id: model.id,
    email: model.email,
  };

  const token = JWT.sign(model, encryptionKey);
  const refreshToken = JWT.sign(refreshTokenPayload, encryptionKey, { expiresIn: '10d' });

  return {
    token,
    refreshToken
  };
};


export const verifyToken = (token: string): IVerifyUserResponse => {
  const encryptionKey =  'SECRET';

  const user = JWT.verify(token, encryptionKey) as IVerifyUserResponse;
  return user;
};

interface IAccessTokenModel {
  id: number | string
  email: string
}

interface IAccessTokenResult {
  token: string
  refreshToken: string
}


interface IVerifyUserResponse {
  id: number | string
  email: string
}