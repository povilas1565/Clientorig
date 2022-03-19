export interface Message {
  id?: number;
  message: string;
  username: string;
  title: string;
  caption: string;
  location:string;
  image?: File;
}
