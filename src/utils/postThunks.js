import {
  addCommentToList,
  setAllPost,
  setComments,
  setCommentsLoading,
  setDetailsLoading,
  setIsLoading,
  setSinglePost,
} from "@/store/contextSlice";
import {
  createPost,
  fetchComments,
  fetchPostById,
  fetchPosts,
  postComment,
} from "./helper";

export const loadPosts = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true)); // turn loading ON
    const posts = await fetchPosts();
    dispatch(setAllPost(posts));
  } catch (err) {
    console.error("Failed to load posts", err);
  } finally {
    dispatch(setIsLoading(false)); // turn loading OFF
  }
};

export const loadSinglePost = (id) => async (dispatch) => {
  try {
    dispatch(setDetailsLoading(true)); // turn loading ON
    const post = await fetchPostById(id);
    dispatch(setSinglePost(post)); // ✅ put into Redux
  } catch (err) {
    console.error("Failed to load single post", err);
  } finally {
    dispatch(setDetailsLoading(false)); // turn loading OFF
  }
};

// ✅ New: Load comments
export const loadComments = (postId) => async (dispatch) => {
  try {
    dispatch(setCommentsLoading(true));
    const comments = await fetchComments(postId);
    dispatch(setComments(comments));
  } catch (err) {
    console.error("Failed to load comments", err);
    dispatch(setComments([]));
  } finally {
    dispatch(setCommentsLoading(false));
  }
};

// ✅ New: Add comment
export const addComment = (commentData) => async (dispatch) => {
  try {
    const newComment = await postComment(commentData);
    dispatch(addCommentToList(newComment));
  } catch (err) {
    console.error("Failed to create comment", err);
  }
};
