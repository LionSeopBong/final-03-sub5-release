import type { User } from "@/types/user";

// 1-a. 댓글 상세
export interface Reply {
  _id: number;
  content: string;
  user: Pick<User, "_id" | "name" | "image">;
  createdAt: string;
  updatedAt: string;
}

// 1-b. 댓글 생성 폼
export type ReplyCreateForm = Pick<Reply, "content">;

// 2-a. 게시글 타입
export type PostType = "inquiry" | "notice";

// 2-b. 게시글 상세
export interface Post {
  _id: number;
  type: PostType;
  title: string;
  content: string;
  user: Pick<User, "_id" | "name" | "image">;
  views: number;
  replies?: Reply[];
  createdAt: string;
  updatedAt: string;
}

// 2-c. 목록용 게시글
export type PostListItem = Pick<
  Post,
  "_id" | "type" | "title" | "user" | "views" | "createdAt"
> & {
  repliesCount: number;
};

// 2-d. 게시글 수정 폼
export type PostUpdateForm = Pick<Post, "title" | "content">;

// 2-3. 게시글 생성 폼
export type PostCreateForm = PostUpdateForm & {
  type: PostType;
};

// 3-a. 공지 상세
export type Notice = Pick<
  Post,
  "_id" | "type" | "title" | "content" | "createdAt"
>;

// 3-b. 공지 목록
export type NoticeListItem = Pick<Notice, "_id" | "title" | "createdAt">;
