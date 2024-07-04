import express from "express";
import GroupController from "../controllers/group.controller";

const groupRouter = express.Router();

groupRouter.get("/getGroup", async (_req, res) => {
  const controller = new GroupController();
  const response = await controller.getGroups(_req.headers);
  return res.send(response);
});

groupRouter.post("/addGroupTest", async (req, res) => {
  const controller = new GroupController();
  const response = await controller.addGroup(req.headers, req.body);
  return res.send(response);
});

groupRouter.post("/removeGroupByName", async (req, res) => {
  const controller = new GroupController();
  const response = await controller.removeGroup(req.headers, req.body);
  return res.send(response);
});

groupRouter.post("/removeGroupById", async (req, res) => {
  const controller = new GroupController();
  const response = await controller.removeGroupById(req.headers, req.body);
  return res.send(response);
});

groupRouter.post("/getGroupByName", async (req, res) => {
  const controller = new GroupController();
  const response = await controller.getUserByGroupName(req.headers, req.body);
  if (!response) res.status(404).send({ message: "No group found" });
  return res.send(response);
});

export default groupRouter;
