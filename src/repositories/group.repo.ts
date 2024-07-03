import { connectDB } from '../config/database';
import { GroupToUser } from '../models';
import { Group } from '../models/group';

  export const getGroups = async (): Promise<Array<Group>> => {
    const groupRepository = connectDB.getRepository(Group);
    return groupRepository.find();
  };
  
  export const createGroup = async (payload: Group): Promise<Group> => {
    const groupRepository = connectDB.getRepository(Group);
    const group = new Group();
    return groupRepository.save({
      ...group,
      ...payload,
    });
  };

  export const updateGroup = async (newGroup: Group):Promise<Group> => {
    return null;
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
        return "501 - cannot delete non empty group";
      }else{
        return groupRepository.remove(group);
      }
    }else{
      return "404 - no group found"
    }
  }