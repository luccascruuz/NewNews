import { INews } from "./NewsTypes";

export interface IAuthor {
    id: string;
    name: string;
    createdAt: string;
    news?: INews[];
}