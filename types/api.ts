import { Post, PostListItem, Reply } from "@/types/post";
import { User } from "@/types/user";

// 회원 정보 타입
export interface UserInfoRes {
  ok: 1;
  item: User;
}

// 서버 검증 에러 타입
export interface ServerValidationError {
  type: string;
  value: string;
  msg: string;
  location: string;
}

// 에러 타입
export interface ErrorRes {
  ok: 0;
  message: string;
  errors?: {
    [fieldName: string]: ServerValidationError;
  };
}

// 게시물 목록 조회 결과 타입
export interface PostListRes {
  ok: 1;
  item: PostListItem[];
  pagination: Pagination;
}

// 게시물 상세 조회 결과 타입
export interface PostInfoRes {
  ok: 1;
  item: Post;
}

// 댓글 페이지 네이션 목록
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 댓글 목록 조회 결과 타입
export interface ReplyListRes {
  ok: 1;
  item: Reply[];
  pagination: Pagination;
}

// 댓글 등록 결과 타입
export interface ReplyInfoRes {
  ok: 1;
  item: Reply;
}

// 파일 업로드 결과 타입
export interface FileUploadRes {
  ok: 1;
  item: {
    name: string;
    path: string;
  }[];
}

// 게시글, 댓글 삭제 결과 타입
export interface DeleteRes {
  ok: 1;
}
