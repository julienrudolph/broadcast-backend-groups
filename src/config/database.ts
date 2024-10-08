import { DataSource } from "typeorm";
import { BotUser, Channel, ChannelToUser, Message, BroadCast, Whitelist, Group, GroupToUser } from "../models";

export const connectDB = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "broadcast-bot-backend-db-1",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "postgres",
    entities: [BotUser, BroadCast, Channel, ChannelToUser, Message, Whitelist, Group, GroupToUser],
    synchronize: true,
    connectTimeoutMS: 0
});

export default connectDB;