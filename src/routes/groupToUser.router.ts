import express from "express";
import GroupToUserController from "../controllers/groupToUser.controller";

const groupToUserRouter = express.Router();

groupToUserRouter.post("/getGroupmemberByGroupname", async (req, res) => {
  const controller = new GroupToUserController();
  const response = await controller.getGroupmemberByGroupname(req.body, req.headers);
  return res.send(response);
});

groupToUserRouter.post("/getGroupsOfUserByEmail", async (req, res) => {
  const controller = new GroupToUserController();
  const response = await controller.getGroupsOfUserByEmail(req.body, req.headers);
  return res.send(response);
});

groupToUserRouter.post("/addUserToGroupByEmail", async (req, res) => {
  const controller = new GroupToUserController();
  const response = await controller.addUserToGroupByEmail(req.body, req.headers);
  return res.send(response);
});

groupToUserRouter.post("/addUserToGroupByUserId", async (req, res) => {
  const controller = new GroupToUserController();
  const response = await controller.addUserToGroupByUserId(req.body, req.headers);
  return res.send(response);
});

groupToUserRouter.post("/removeUserFromGroupByEmail", async (req, res) => {
  const controller = new GroupToUserController();
  const response = await controller.removeUserFromGroupByEmail(req.body, req.headers);
  if (!response) res.status(404).send({ message: "No group found" });
  return res.send(response);
});

groupToUserRouter.post("/removeUserFromAllGroups", async (req, res) => {
  const controller = new GroupToUserController();
  const response = await controller.removeUserFromAllGroups(req.body, req.headers);
  if (!response) res.status(404).send({ message: "No group found" });
  return res.send(response);
});

export default groupToUserRouter;
