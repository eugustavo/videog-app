export interface CommentDTO {
  id: string;
  content: string;
  author_id: {
    name: string;
    avatar_url: string;
  }
}
