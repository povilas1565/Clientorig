import {Comment} from "./Comment";

export interface Post {
  likedUsers?: string[];
  id?: number;
  title: string;
  caption: string;
  location:string;
  image?: File;
  video?:File;
  likes?: number;
  userLiked?: string[];
  comments?: Comment[];
  username?: string;
}
