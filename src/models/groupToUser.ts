import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { BotUser } from "./botUser"
import { Group } from "./group"

@Entity()
export class GroupToUser {
    @PrimaryGeneratedColumn('increment')
    public id?: number;

    @Column()
    public userId: number

    @Column()
    public groupId: number  

    @ManyToOne(() => BotUser, (user) => user.channelToUser)
    public user!: BotUser

    @ManyToOne(() => Group, (group) => group.groupToUser)
    public group!: Group
}