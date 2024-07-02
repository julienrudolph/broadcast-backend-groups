import express from "express";
import userRouter  from "../routes/user.router";
import channelRouter from "../routes/channel.router";
import defaultRouter from "./default.router";
import romanRouter from "./roman.router";
import whitelistRouter from "./whitelist.router";
import groupRouter from "./group.router";
import groupToUserRouter from "./groupToUser.router";

const router = express.Router();

router.use("/", defaultRouter);
// router.use("/users", userRouter);
// router.use("/channel", channelRouter);
router.use("/roman", romanRouter);
router.use("/whitelist", whitelistRouter);
router.use("/group", groupRouter);
router.use("/groupToUser", groupToUserRouter);
export default router;