import { connectDB } from '../config/database';
import { GroupToUser } from '../models';
import { Group } from '../models/group';

  export const getGroups = async (): Promise<any> => {
    const groupRepository = connectDB.getRepository(Group);
    const groups = await groupRepository.find();
    if(groups){
      return groups 
    }else{
      return "error_no_groups_found";
    }
  };
  
  export const createGroup = async (payload: Group): Promise<Group | string> => {
    const groupRepository = connectDB.getRepository(Group);
    const group = await groupRepository.findOne({where :{name: payload.name}});
    if(group){
      return "error_group_name_must_be_unique";
    }
    return groupRepository.save({
      ...payload,
    });
  };

  export const updateGroup = async (groupName?: string, newDisplayName?: string, newName?:string):Promise<any> => {
    const groupRepository = connectDB.getRepository(Group);
    let group:Group = await groupRepository.findOne({where: {name: groupName}});
    if(group){
      if(newDisplayName){
        group.displayName = newDisplayName;
      }
      if(newName){
        group.name = newName;
      }
      return groupRepository.save(group);
    }else{
      return "error_group_not_found";
    }
    
  }

  export const getGroupById = async (id: number): Promise<Group | null> => {
    const groupRepository = connectDB.getRepository(Group);
    const group = await groupRepository.findOne({where: {id: id}});
    if (!group) return null;
    return group;
  };

  export const getGroupTest = async (id:number): Promise<Group> => {
    return null;
  }

  export const getGroupByName = async (name: string): Promise<Group | null> => {
    const groupRepository = connectDB.getRepository(Group);
    const group:Group = await groupRepository.findOne({where: {name: name}});
    if (!group) return null;
    return group;
  };

  export const deleteGroupByName = async (name: string):Promise<any> => {
    const groupRepository = connectDB.getRepository(Group);
    const groupToUserRepo = connectDB.getRepository(GroupToUser);
    let group:Group = await groupRepository.findOne({where: {name: name}});
    if(group){
      let groupToUser:GroupToUser[] = await groupToUserRepo.find({where: {groupId: group.id}});
      if(groupToUser && groupToUser.length > 0){
        return "error_cannot_delete_non_empty_group";
      }else{
        return groupRepository.remove(group);
      }
    }else{
      return "error_group_not_found"
    }
  }

  export const deleteGroupById = async (id: number):Promise<any> => {
    console.log(id);
    const groupRepository = connectDB.getRepository(Group);
    const groupToUserRepo = connectDB.getRepository(GroupToUser);

    let group:Group = await groupRepository.findOne({where: {id: id}});
    console.log(group);
    if(group){
      let groupToUser:GroupToUser[] = await groupToUserRepo.find({where: {groupId: group.id}});
      console.log(groupToUser);
      if(groupToUser && groupToUser.length > 0){
        return "error_cannot_delete_non_empty_group";
      }else{
        return groupRepository.remove(group);
      }
    }else{
      return "error_group_not_found"
    }
  }