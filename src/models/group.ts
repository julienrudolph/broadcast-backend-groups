import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { GroupToUser } from "./groupToUser";
@Entity()
export class Group {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  botId!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;   

  @OneToMany(() => GroupToUser, groupToUser => groupToUser.group)
  public groupToUser?: GroupToUser[];
}