import express, { Router } from "express";
import db from "../config/db";

const router = express.Router();

router.post("/newRoom", (req: express.Request, res: express.Response) => {
  const username: string = req.body.username;
  const room: string = req.body.room;
});

export default router;
