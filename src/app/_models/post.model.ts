import {PostComment} from './Comment.model';
import { User } from './user.model';

export interface Post {
  _id: string;
  title: string;
  body: string;
  creator: User;
  createdAt: string;
  comments?: PostComment[];
  totalComments?: number;
}
