import {Get, Post, Route, Tags, Body, Header} from "tsoa";
import * as GroupToUserRepo from "../repositories/groupToUser.repo";
import * as util from '../utils/app.utils';
import {Group, GroupToUser} from '../models';
import * as GroupRepo from '../repositories/group.repo';

let bearer:string = process.env.GROUP_AUTH

@Route("group")
@Tags("group")

export default class GroupController {
  private async isAuthenticated(bearerHeader:string){
    if(bearer === bearerHeader){
      return true;
    }
    return false;
  }

  // return all groups as json array of id and name
  @Get("/")
  public async getGroups(@Header() header:any):Promise<any>{
    if(this.isAuthenticated(header.authorization)){
      return await GroupRepo.getGroups();  
    }else{
      return "error_not_authenticated";
    }
  }

  @Post("/updateGroup")
  public async updateGroup(@Header() header:any, @Body() body:any):Promise<any>{
    if(this.isAuthenticated(header.authorization)){
      return await GroupRepo.updateGroup(body.groupName, body.newDisplayname, body.newName);
    }else{
      return "error_not_authenticated"
    }
  }

  @Post("/addGroupTest")
  public async addGroup(@Header() header:any, @Body() body:any):Promise<any>{
    if(this.isAuthenticated(header.authorization)){
      return await GroupRepo.createGroup(body);
    }else{
      return "error_not_authenticated"
    }
  }

  @Post("/removeGroupByName")
  public async removeGroup(@Body() body:any, @Header() header:any):Promise<any>{
    if(this.isAuthenticated(header.authorization)){
      return await GroupRepo.deleteGroupByName(body.name);
    }
    return "error_not_authenticated";
  }

  @Post("/removeGroupById")
  public async removeGroupById(@Body() body:any, @Header() header:any):Promise<any>{
    if(this.isAuthenticated(header.authorization)){
      console.log("id: " + body.id);
      return await GroupRepo.deleteGroupById(body.id);
    }
    return "error_not_authenticated";
  }

  // return group by name
  @Post("/getGroupByName")
  public async getUserByGroupName(@Body() body:any,@Header() header:any):Promise<any> {
    if(this.isAuthenticated(header.authorization)){
      return await GroupRepo.getGroupByName(body.name);
    }else{
      return "error_not_authenticated";
    }
  }
}