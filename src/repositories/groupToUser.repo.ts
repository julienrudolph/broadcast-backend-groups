import { connectDB } from '../config/database';
import { GroupToUser, BotUser, ChannelToUser, Group } from '../models';
import * as groupRepo from '../repositories/group.repo';
import * as channelToUserRepo from '../repositories/channelToUser.repo';

  export const getAllGroupToUsers = async (): Promise<Array<GroupToUser>> => {
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    return groupToUserRepo.find();
  };

  export const getAllUserByGroupName = async (groupName: string): Promise<any> => {
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    let group:Group = await groupRepo.getGroupByName(groupName);
    if(group){
      const members = await groupToUserRepo.find({where: {groupId: group.id}});
      if(members && members.length > 0){
        return members;
      }else{
        return "error_no_members_found";
      }
    }else{
      return "error_no_group_found";
    }
  }

  export const getAllGroupsByUserEmail = async(mail: string):Promise<Array<GroupToUser> | string> => {
    const groupRepo = connectDB.getRepository(Group);
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    const botUserRepo = connectDB.getRepository(BotUser);
    
    let user = await botUserRepo.findOne({where: {email: mail}});
    if(user){
      console.log(user);
      return await groupToUserRepo.createQueryBuilder("GroupToUser")
      .where({ userId: user.id})
      .distinctOn(['GroupToUser.groupId'])
      .getMany();
    }else{
      return "error_user_not_found";
    }
  }

  export const createGroupToUser = async (payload:GroupToUser): Promise<GroupToUser> => {
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    const user = new GroupToUser();
    return groupToUserRepo.save({
      ...user,
      ...payload,
    });
  };

  export const addUserToGroupByEmail = async(userMail:string, groupName:string):Promise<GroupToUser | string> => {
    const groupRepo = connectDB.getRepository(Group);
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    const botUserRepo = connectDB.getRepository(BotUser);

    let group:Group = await groupRepo.findOne({where: {name: groupName}});
    let user:BotUser = await botUserRepo.findOne({where: {email: userMail}});
    
    if(group && user){
      return groupToUserRepo.save({
        userId: user.id,
        groupId: group.id
      });
    }else{
      return "error_user_or_group_not_found";
    }
  }

  export const removeUserFromGroupByEmail = async(mail: string, groupName: string):Promise<GroupToUser | string> => {
    const groupRepo = connectDB.getRepository(Group);
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    const botUserRepo = connectDB.getRepository(BotUser);

    let user:BotUser = await botUserRepo.findOne({where: { email: mail}});
    let group:Group = await groupRepo.findOne({where: {name: groupName}}); 
    let groupToUser:GroupToUser = await groupToUserRepo.createQueryBuilder("GroupToUser")
                                    .where({ userId: user.id})
                                    .andWhere({groupId: group.id})
                                    .getOne();

    if(groupToUser){
      return await groupToUserRepo.remove(groupToUser);
    }else{
      return "error_user_or_group_not_found";
    }
  }

  export const removeUserFromAllGroups = async (mail:string):Promise<Array<GroupToUser> | string> => {
    const groupRepo = connectDB.getRepository(Group);
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    const botUserRepo = connectDB.getRepository(BotUser);

    let user:BotUser = await botUserRepo.findOne({where: { email:mail}});
    let groupToUser:GroupToUser[] = await groupToUserRepo.find({where: {userId: user.id}})
    if(groupToUser){
      return groupToUserRepo.remove(groupToUser);
    }else{
      return "error_user_or_group_not_found"
    }
 }

  export const addUserToGroupByUserId = async(userId: number, groupName:string):Promise<GroupToUser | string> => {
    const groupRepo = connectDB.getRepository(Group);
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    const botUserRepo = connectDB.getRepository(BotUser);

    let group:Group = await groupRepo.findOne({where: {name: groupName}});
    let user:BotUser = await botUserRepo.findOne({where: {id: userId}});
    
    if(group && user){
      return groupToUserRepo.create({
        userId: user.id,
        groupId: group.id
      });
    }else{
      return "error_user_or_group_not_found";
    }  
  }

  export const getGroupToUserById = async (id: number): Promise<GroupToUser | null> => {
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    const user = await groupToUserRepo.findOne({where: {id: id}});
    if (!user) return null;
    return user;
  };

  export const getGroupToUserByUserId = async (id: number): Promise<GroupToUser | null> => {
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    const user = await groupToUserRepo.findOne({where: {userId: id}});
    if (!user) return null;
    return user;
  };

