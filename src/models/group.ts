import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
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
  botId?: string;

  @PrimaryColumn()
  name!: string;

  @Column()
  displayName?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;   

  @OneToMany(() => GroupToUser, groupToUser => groupToUser.group)
  public groupToUser?: GroupToUser[];
}