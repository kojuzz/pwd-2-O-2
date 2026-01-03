export type UserType = {
    id: number;
    name: string;
    username: string;
    bio?: string;
}

export type CommentType = {
	id: number;
	content: string;
	user: UserType;
};

export type PostType = {
    id: number;
    content: string;
    user: UserType;
    userId: number;
    comments: CommentType[];
    likes: LikeType[];
    createdAt: string;
}

export type LikeType = {
    id: number;
    userId: number;
    postId: number;
}