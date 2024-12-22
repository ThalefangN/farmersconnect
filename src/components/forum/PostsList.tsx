import { useState } from "react";
import ForumPost from "@/components/ForumPost";

interface PostsListProps {
  posts: any[];
  currentUser: any;
  onDeletePost: (postId: string) => void;
}

const PostsList = ({ posts, currentUser, onDeletePost }: PostsListProps) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <ForumPost
          key={post.id}
          id={post.id}
          content={post.content}
          authorId={post.user_id}
          authorName={post.profiles?.full_name}
          createdAt={post.created_at}
          imageUrl={post.image_url}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          isLiked={post.isLiked}
          currentUserId={currentUser?.id}
          onDelete={() => onDeletePost(post.id)}
        />
      ))}
    </div>
  );
};

export default PostsList;