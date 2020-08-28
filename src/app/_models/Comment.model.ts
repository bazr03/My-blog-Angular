import { User } from './user.model';

export interface PostComment {
    _id: string;
    body: string;
    postId?: string;
    creator: User;
}