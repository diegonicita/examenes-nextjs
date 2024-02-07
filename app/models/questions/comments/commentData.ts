export interface UserData {
    comment:  Comment;
  }
  
  export interface Comment {
    id:                number;
    id_question:       number;
    id_user:           number;
    comment_text:      string;
    id_parent_comment: number | string;
    user_name:         string;
  }
  