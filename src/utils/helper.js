// fetch all posts
export async function fetchPosts() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`;
  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      const text = await res.text();
      console.error(
        "❌ Failed to fetch posts:",
        res.status,
        text.slice(0, 200)
      );
      return { data: [], message: "Failed to fetch posts" };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// fetch a single post by ID
export async function fetchPostById(id) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`;
  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Failed to fetch post:", res.status, text.slice(0, 200));
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// make a new post
export async function createPost(newPostData) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPostData),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(
        "❌ Failed to create post:",
        res.status,
        text.slice(0, 200)
      );
      throw new Error("Failed to create post");
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// fetch comments
export async function fetchComments(postId) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?postId=${postId}`;
  try {
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      console.error(
        "❌ Failed to fetch comments:",
        res.status,
        text.slice(0, 200)
      );
      throw new Error("Failed to fetch comments");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

// post a comment
export async function postComment(commentData) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(
        "❌ Failed to post comment:",
        res.status,
        text.slice(0, 200)
      );
      throw new Error("Failed to post comment");
    }

    return await res.json();
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}

// delete a post by ID
export async function deletePost(id) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`;
  try {
    const res = await fetch(url, { method: "DELETE" });

    if (!res.ok) {
      const text = await res.text();
      console.error(
        "❌ Failed to delete post:",
        res.status,
        text.slice(0, 200)
      );
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting post:", error);
    return null;
  }
}
