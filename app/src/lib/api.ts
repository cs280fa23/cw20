import { users, posts } from "@/lib/data";
import type { User, PostWithUserData, Post } from "./types";
import { nanoid } from "nanoid";
import { getAuthenticatedUser } from "./auth";

// Mock database
const db = {
  users: [...users],
  posts: [...posts],
};

// Fetch all posts with user data
export const fetchPosts = async (): Promise<PostWithUserData[]> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/posts?withUserData=true`);
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
}; 


// Delete post by id
export const deletePost = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      db.posts = db.posts.filter((post) => post.id !== id);
      resolve();
    }, 200); // Simulate an API delay
  });
};

// Create a post
export const createPost = async (
  content: string,
  image?: string,
): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = getAuthenticatedUser();
      const newPost: Post = {
        id: nanoid(),
        userId: user.id,
        content,
        image,
        timestamp: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
      };
      db.posts.push(newPost);
      resolve(newPost);
    }, 200); // Simulate an API delay
  });
};
