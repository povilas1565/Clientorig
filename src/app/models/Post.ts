import {Comment} from "./Comment";
export interface Post {
  likedUsers?: string[];
  userLiked?: string[];
  title: string;
  id?: number;
  caption: string;
  location:string;
  image?: File;
  video?: File;
  likes?: number;
  comments?: Comment[];
  username?: string;
}
