/* 
headers: {
          authorization: `Bearer ${token}`, // w2BX1jwnpD7wi2bvrCgKkhPBR9XPYlgfMuI4HiJT
        }, 
        
        */

import createHttpError from 'http-errors';
import { Session } from '../models/session.js';

export const authenticateAccessToken = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers; //

    const [bearer, token] = authorization.split(' '); // [bearer, token]

    if (bearer !== 'Bearer' || !token) {
      throw createHttpError(401, 'No authorization');
    }

    const session = await Session.findOne({ accessToken: token });

    if (!session && Date.now() > session.accessTokenValidUntil) {
      throw createHttpError(401, 'No authorization');
    }

    req.userId = session.userId;

    next();
  } catch (error) {
    next(error);
  }
};
