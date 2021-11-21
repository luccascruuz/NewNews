export interface IResponseRequest<T = any> {
  data: T;
}
export interface NavbarState {
  openedNavBar: boolean;
}

export interface IOptionsAuthor {
  key: string;
  text: string;
  value: string;
}

export interface IPayloadNews {
  id: string;
  createdAt: string;
  title: string;
  text: string;
  authorId: string;
}

export interface IPayloadAuthor {
  id: string;
  createdAt: string;
  name: string;
}
