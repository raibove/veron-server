import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import Reward from "../models/reward.model";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const getPoints = async (req: Request, res: Response) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json("Not Authorized");
  }
  try {
    const bearer = bearerHeader?.split(" ");
    const token = bearer[1];
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(403).json("User do not exist");
    }

    let user = await Reward.findOne({ userMail: payload?.email });
    if (!user) {
      return res.status(200).json({ points: 0 });
    }
    return res.status(200).json({ points: 10 });
  } catch (e) {
    res.status(403).json("Failed to validate user");
  }
};

export const addPoints = async (req: Request, res: Response) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json("Not Authorized");
  }
  try {
    const bearer = bearerHeader?.split(" ");
    const token = bearer[1];
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(403).json("User do not exist");
    }

    let user = await Reward.findOne({ userMail: payload?.email });
    if (user) {
        let currentPoints = user.points + req.body.points

        await Reward.findOneAndUpdate(
        { userMail: payload?.email },
        { points: currentPoints},
        { new: true },
        (err, doc) => {
          if (err) {
            return res.status(500).json("Something wrong when updating data!");
          }
        }
      );
    } else {
      user = new Reward({
        userMail: payload?.email,
        points: req.body.points,
      });

      await user.save();
    }
    return res.status(200).json("Points Added");
  } catch (e) {
    res.status(403).json("Failed to validate user");
  }
};
