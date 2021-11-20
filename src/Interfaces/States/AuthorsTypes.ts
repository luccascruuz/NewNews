import { INews } from "./NewsTypes";

export interface IAuthor {
    id: string;
    name: string;
    news?: INews[];
}