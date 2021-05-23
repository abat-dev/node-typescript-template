import { RequestHandler } from 'express';
import { User } from '@models/User';
import HttpRequestError from '@httpRequestError';

interface indexResponse {
  ok: boolean;
  message: string;
}

interface createUserRequest {
  firstname: string;
  lastname: string;
}

interface createUserResponse {
  user: {
    firstname: string;
    lastname: string;
  };
}

const index: RequestHandler<{}, indexResponse> = (req, res, next) => {
  return res.status(200).json({ ok: true, message: 'Is this working?' });
};

const createUser: RequestHandler<{}, createUserResponse, createUserRequest> =
  async (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    try {
      const existingUser = await User.findOne({ firstname, lastname });
      if (existingUser) {
        throw new HttpRequestError(401, 'User already exists');
      }

      const user = await User.create({ firstname, lastname });
      await user.save();
      return res
        .status(201)
        .json({ user: { firstname: user.firstname, lastname: user.lastname } });
    } catch (err) {
      next(err);
    }
  };

export default {
  index,
  createUser,
};
