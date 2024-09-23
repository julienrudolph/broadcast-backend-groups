import {Get, Post, Route, Tags, Body, Header} from "tsoa";
import * as GroupToUserRepo from "../repositories/groupToUser.repo";
import * as util from '../utils/app.utils';
import {Group, GroupToUser} from '../models';

let bearer:string ='Bearer ' + process.env.GROUP_AUTH

@Route("groupToUser")
@Tags("groupToUser")
export default class GroupToUserController {
  // eventually write function for checking possible injections -- validate input

  private async isAuthenticated(bearerHeader:string){
    if(bearer === bearerHeader){
      return true;
    }
    return false;
  }

  @Get("/getAll")
  public async getAll(@Header() header:any):Promise<any>{
    if(await this.isAuthenticated(header.authorization)){
      return await GroupToUserRepo.getAll();
    }
  }

  @Get("/getAllAvailiableUser")
  public async getAllAvailiableUser(@Header() header:any):Promise<any>{
    if(await this.isAuthenticated(header.authorization)){
      return await GroupToUserRepo.getAllAvailiableUsers();
    }
  }

  @Post("/getGroupmemberByGroupname")
  public async getGroupmemberByGroupname(@Body() body: any,@Header() header:any): Promise<any> {
    if(await this.isAuthenticated(header.authorization)){
      return await GroupToUserRepo.getAllUserByGroupName(body.groupName);
    }
    return "error_not_authenticated"
  }

  @Post("/getGroupsOfUserByEmail")
  public async getGroupsOfUserByEmail(@Body() body: any, @Header() header:any): Promise<any> {
    if(await this.isAuthenticated(header.authorization)){
      return GroupToUserRepo.getAllGroupsByUserEmail(body.email);  
    }else{
      return "error_not_authenticated";
    }
  } 

  @Post("/addUserToGroupByEmail")
  public async addUserToGroupByEmail(@Body() body:any, @Header() header:any): Promise<any>{
    if(await this.isAuthenticated(header.authorization)){
      return await GroupToUserRepo.addUserToGroupByEmail(body.email, body.groupName);    
    }else{
      return "error_not_authenticated";
    }
  }

  @Post("/addUserToGroupByUserId")
  public async addUserToGroupByUserId(@Body() body: any, @Header() header:any): Promise<any> {
    if(await this.isAuthenticated(header.authorization)){
      return await GroupToUserRepo.addUserToGroupByUserId(body.userId, body.groupName);  
    }else{
      return "error_not_authenticated";
    }
  }

  @Post("/removeUserFromGroupByEmail")
  public async removeUserFromGroupByEmail(@Body() body:any,@Header() header:any):Promise<any> {
    if(await this.isAuthenticated(header.authorization)){
      return GroupToUserRepo.removeUserFromGroupByEmail(body.email, body.groupName);  
    }else{
      return "error_not_authenticated";
    }  
  }

  @Post("/removeUserFromAllGroups")
  public async removeUserFromAllGroups(@Body() body:any,@Header() header:any):Promise<any> {
    if(await this.isAuthenticated(header.authorization)){
      return GroupToUserRepo.removeUserFromAllGroups(body.email);  
    }else{
      return "error_not_authenticated";
    }  
  }
}