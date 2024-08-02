import express from "express";
import GroupController from "../controllers/group.controller";
import { Group } from "../models/group";

const groupRouter = express.Router();

groupRouter.get("/getGroup", async (_req, res) => {
  const controller = new GroupController();
  const response = await controller.getGroups(_req.headers);
  if(typeof response === 'string'){
    return res.status(500).send(response);
  }else{}
    return res.send(response);
});

groupRouter.post("/addGroup", async (req, res) => {
  const controller = new GroupController();
  const response = await controller.addGroup(req.headers, req.body);
  if(typeof response === 'string'){
    return res.status(500).send(response);
  }else{
    if(response.id && response.createdAt){
      return res.send(response);
    }else{
      return res.status(500).send(response);
    }
  }
  
});

groupRouter.post("/updateGroup", async (req, res) => {
  return null;
});

groupRouter.post("/removeGroupByName", async (req, res) => {
  const controller = new GroupController();
  const response = await controller.removeGroup(req.body, req.headers);
  if(typeof response === 'string'){
    return res.status(500).send({message: response});
  }
  return res.send(response);
});

groupRouter.post("/removeGroupById", async (req, res) => {
  const controller = new GroupController();
  const response = await controller.removeGroupById( req.body, req.headers);
  if(typeof response === 'string'){
    return res.status(500).send({message: response});
  }
  return res.send(response);
});

groupRouter.post("/getGroupByName", async (req, res) => {
  const controller = new GroupController();
  const response = await controller.getGroupByName(req.headers, req.body);
  if (!response){ 
    return res.status(500).send({ message: "No group found" });
  }
  return res.send(response);
});

export default groupRouter;
