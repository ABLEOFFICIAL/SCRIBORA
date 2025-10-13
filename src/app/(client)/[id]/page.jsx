"use client";
import Loading from "@/components/Loading";
import PostNotFound from "@/components/PostNotFound";
// import { posts } from "@/lib/posts";
import { addComment, loadComments, loadSinglePost } from "@/utils/postThunks";
import { ChevronRight, Send, Share, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import SuccessSubmit from "@/components/successSubmit";
import { setEmailSuccess } from "@/store/contextSlice";

const BlogsDetails = ({ params }) => {
  const { id } = use(params);
  const clickedPost = useSelector((state) => state.context.singlePost);
  const { AllPost, detailsLoading, comments, commentsLoading, emailSuccess } =
    useSelector((state) => state.context);
  const dispatch = useDispatch();
  const commentsRef = useRef(null);
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
  const [data, setData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const { name, email: commentEmail, comment: commentBody } = data;
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    // Increment views when user visits post
    async function addView() {
      try {
        await fetch(`/api/posts/${id}/view`, { method: "PATCH" });
      } catch (error) {
        console.error("Failed to update views:", error);
      }
    }
    addView();
  }, [id]);

  useEffect(() => {
    if (window.location.hash === "#comments") {
      commentsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center", // center comments in viewport
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (id) {
      dispatch(loadSinglePost(id));
      dispatch(loadComments(id));
    }
  }, [id, dispatch]);
  // const clickedPost = posts.find((post) => post._id === parseInt(id));
  const nextArticles = AllPost.filter(
    (post) =>
      post._id !== clickedPost?._id && // exclude current post
      post.tags.some((tag) => clickedPost?.tags.includes(tag)) // overlap check
  );
  console.log("nextArticles", nextArticles);
  // if (!clickedPost) {
  //   return <PostNotFound />;
  // }

  console.log("Clicked Post:", clickedPost);
  console.log("all Post:", AllPost);

  const handleShare = async () => {
    if (isSharing) return; // Prevent multiple calls
    setIsSharing(true);

    if (navigator.share) {
      try {
        await navigator.share({
          title: clickedPost?.title || "Check this out!",
          text: "I found this post interesting, take a look:",
          url,
        });
      } catch (err) {
        // Only log if it's not a user cancellation
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      } finally {
        setIsSharing(false); // Reset so it can be used again
      }
    } else {
      // fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Clipboard error:", err);
      } finally {
        setIsSharing(false);
      }
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_xw05ht7";
    const templateID = "template_vqxo8x7";
    const publicKey = "0-UL1jRHodRtq_rl7";

    const templateParams = {
      email: email,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      () => {
        setEmail("");
        setIsSubmitting(false);
      },
      (error) => {
        setIsSubmitting(false);
        console.error("EmailJS error:", error);
      }
    );
    dispatch(setEmailSuccess(true));
    setTimeout(() => {
      dispatch(setEmailSuccess(false));
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentSuccess(true);
    setTimeout(() => {
      setCommentSuccess(false);
    }, 3000);
    dispatch(
      addComment({
        postId: id,
        author: data.name,
        email: data.email,
        comment: data.comment,
      })
    );
    setData({ name: "", email: "", comment: "" });
  };

  if (detailsLoading) {
    return (
      <div className="pr-10 flex flex-col border-r border-r-neutral-300 w-3/5 justify-center items-center h-[60vh]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {detailsLoading ? (
        <div className="pr-10 flex flex-col border-r border-r-neutral-300 w-full justify-center items-center h-[60vh]">
          <Loading />
        </div>
      ) : (
        clickedPost && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-10">
            {emailSuccess && <SuccessSubmit />}
            {commentSuccess && (
              <SuccessSubmit text="Comment submitted successfully!" />
            )}
            <div className="">
              <span className="font-semibold text-blue-500 flex flex-wrap items-center gap-2 py-3 sm:py-5 border-b border-b-neutral-200 text-sm sm:text-base">
                <Link href={"/"} className="hover:underline">
                  Home
                </Link>
                <ChevronRight className="size-3 text-neutral-600" />
                {clickedPost.headCategory ? (
                  <>
                    {clickedPost.headCategory}
                    <ChevronRight className="size-3 text-neutral-600" />
                    {clickedPost.category[0]}
                  </>
                ) : (
                  "General"
                )}
              </span>

              <div className="py-3 sm:py-5 border-b border-b-neutral-200">
                <h2 className="font-medium font-serif text-2xl sm:text-4xl leading-snug">
                  {clickedPost.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 font-normal py-2 sm:py-3">
                  Posted on {clickedPost.date} by {clickedPost.author}
                </p>
              </div>

              <div className="py-4 sm:py-5 border-b border-b-neutral-200 flex flex-wrap sm:flex-nowrap items-center gap-3 text-sm">
                <p className="text-sm text-gray-600 font-normal">
                  Share this article:
                </p>
                <span className="h-6 w-px bg-neutral-300"></span>
                <button
                  onClick={handleShare}
                  href={"/"}
                  className="flex items-center gap-1 text-sm bg-amber-500 text-white font-semibold cursor-pointer rounded px-2 py-1"
                >
                  <Send className="size-4  cursor-pointer" />
                  Share
                </button>
              </div>

              <div className="py-4 sm:py-5 border-b border-b-neutral-200 flex flex-col gap-3">
                <p className="font-semibold text-base sm:text-lg leading-relaxed">
                  {clickedPost.excerpt}
                </p>
                <img
                  src={clickedPost.image}
                  alt=""
                  className="w-full h-56 sm:h-[60vh] object-cover object-center rounded"
                />
              </div>

              <div className="py-4 sm:py-5 border-b border-b-neutral-200 flex flex-wrap items-center gap-2 text-sm">
                <User className="bg-neutral-300 rounded-full p-1 size-8" />
                <span className="text-sm text-neutral-800 font-semibold">
                  {clickedPost.author}
                </span>
                <span className="h-6 w-px bg-neutral-300"></span>

                <span className="text-sm text-neutral-800 font-semibold">
                  {clickedPost.country}
                </span>
              </div>

              <div className="pt-6 sm:pt-10 flex flex-col gap-8 sm:gap-10 pb-10">
                {clickedPost.content.map((paragraph, idx) => (
                  <div key={idx} className="flex flex-col gap-4 sm:gap-6">
                    <h2 className="font-medium font-serif text-2xl sm:text-3xl">
                      {paragraph.subtitle}
                    </h2>
                    <p className="text-gray-800 text-base sm:text-lg leading-7">
                      {paragraph.text}
                    </p>
                    {paragraph.image && (
                      <img
                        src={paragraph.image}
                        alt=""
                        className="w-full h-56 sm:h-[60vh] object-cover object-center rounded"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div
                style={{
                  backgroundImage:
                    "url('/Fotos de Background library - Baixe fotos grátis de alta qualidade _ Freepik.jpeg')",
                }}
                className="border rounded-2xl h-60 sm:h-[40vh] p-5 sm:p-10 bg-cover bg-center bg-no-repeat relative text-white"
              >
                <div className="bg-black/60 rounded-2xl absolute w-full h-full top-0 left-0 flex flex-col items-center gap-3 sm:gap-5 justify-center px-3 text-center">
                  <h4 className="font-serif text-xl sm:text-2xl">
                    Subscribe to Scribora!
                  </h4>
                  <p className="text-sm sm:text-base">
                    Get updates on the latest posts and more from Random Info
                    straight to your inbox.
                  </p>
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 w-full justify-center"
                  >
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full sm:w-80 h-10 rounded sm:rounded-l focus:outline-none px-5 border"
                    />
                    <button
                      type="submit"
                      className="bg-amber-500 cursor-pointer text-white px-5 py-2 rounded sm:rounded-r w-full sm:w-max font-semibold"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              {/* Comment Form */}
              <div
                ref={commentsRef}
                className="my-10 sm:my-20 flex flex-col gap-3 shadow-md p-5 sm:p-10 rounded-2xl border border-neutral-200"
              >
                <h3 className="text-2xl sm:text-4xl font-medium font-serif">
                  Leave a comment
                </h3>
                <form onSubmit={handleSubmit}>
                  {formStatus && (
                    <p
                      className={`${
                        formStatus.includes("successfully")
                          ? "text-green-600"
                          : "text-red-600"
                      } mb-3 text-sm sm:text-base`}
                    >
                      {formStatus}
                    </p>
                  )}

                  <div className="flex flex-col gap-5">
                    <div className="w-full flex flex-col sm:flex-row justify-between gap-3 sm:gap-10">
                      <input
                        type="name"
                        name="name"
                        value={name}
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                        placeholder="Your name"
                        className="h-12 sm:h-14 rounded focus:outline-none px-5 border mb-2 sm:mb-5 w-full"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        value={commentEmail}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        placeholder="Your email"
                        className="h-12 sm:h-14 rounded focus:outline-none px-5 border mb-2 sm:mb-5 w-full"
                        required
                      />
                    </div>
                    <textarea
                      className="w-full border border-neutral-300 rounded-xl h-40 sm:h-56 focus:outline-none p-4 sm:p-5 text-sm sm:text-base"
                      value={commentBody}
                      onChange={(e) =>
                        setData({ ...data, comment: e.target.value })
                      }
                      placeholder="Your comment"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-amber-500 cursor-pointer text-white px-5 py-2 rounded w-full sm:w-max font-semibold"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>
              </div>
              <div className="my-20 flex flex-col gap-3">
                <h3 className="text-2xl md:text-4xl font-medium font-serif">
                  Comments
                </h3>

                {commentsLoading ? (
                  <p className="text-gray-500">Loading comments...</p>
                ) : comments.length === 0 ? (
                  <p className="text-gray-600">
                    No comments yet. Be the first to comment!
                  </p>
                ) : (
                  <div className="flex flex-col gap-6">
                    {comments.map((c) => (
                      <div key={c._id} className="p-4 flex gap-4">
                        <span className="w-8 h-8 flex justify-center items-center bg-blue-500 text-white rounded-full font-bold text-lg">
                          {c.author.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="font-semibold">{c.author}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(c.createdAt).toLocaleString()}
                            </p>
                          </div>

                          <p className="mt-2 text-gray-800">{c.comment}</p>
                        </div>
                        {/* <p className="text-gray-600 text-sm">{c.email}</p> */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* next article */}
              <span className="relative h-10 w-full flex justify-center items-center my-6 sm:my-10 px-2 sm:px-0">
                <span className="w-full border-t border-t-neutral-300 block"></span>
                <span className="absolute h-full w-full top-0 left-0 flex justify-center items-center">
                  <span className="text-blue-500 bg-white px-2 sm:px-3 text-sm sm:text-base font-semibold">
                    Next Article
                  </span>
                </span>
              </span>

              <div className="px-4 sm:px-0">
                {nextArticles.map((post, idx) => (
                  <div key={idx} className="mb-10 sm:mb-16">
                    <span className="font-semibold text-blue-500 flex flex-wrap items-center gap-1 sm:gap-2 py-3 sm:py-5 border-b border-b-neutral-200 text-sm sm:text-base">
                      <Link href={"/"} className="hover:underline">
                        Home
                      </Link>
                      <ChevronRight className="size-3 text-neutral-600" />
                      {post.headCategory ? (
                        <>
                          {post.headCategory}
                          <ChevronRight className="size-3 text-neutral-600" />
                          {post.category[0]}
                        </>
                      ) : (
                        "General"
                      )}
                    </span>

                    <div className="py-3 sm:py-5 border-b border-b-neutral-200">
                      <h2 className="font-medium font-serif text-2xl sm:text-4xl leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 font-normal py-2 sm:py-3">
                        Posted on {post.date} by {post.author}
                      </p>
                    </div>

                    <div className="py-4 sm:py-5 border-b border-b-neutral-200 flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 text-sm">
                      <p className="text-gray-600 font-normal">
                        Share this article:
                      </p>
                      <span className="h-5 sm:h-6 w-px bg-neutral-300"></span>
                      <Link
                        href={"/"}
                        className="flex items-center gap-1 text-xs sm:text-sm bg-amber-500 text-white font-semibold cursor-pointer rounded px-2 py-1"
                      >
                        <Send className="size-4 cursor-pointer" />
                        Share
                      </Link>
                    </div>

                    <div className="py-4 sm:py-5 border-b border-b-neutral-200 flex flex-col gap-3">
                      <p className="font-semibold text-base sm:text-lg leading-relaxed">
                        {post.excerpt}
                      </p>
                      <img
                        src={post.image}
                        alt=""
                        className="w-full h-56 sm:h-[60vh] object-cover object-center rounded"
                      />
                    </div>

                    <div className="py-4 sm:py-5 border-b border-b-neutral-200 flex flex-wrap items-center gap-2 text-sm">
                      <User className="bg-neutral-300 rounded-full p-1 size-7 sm:size-8" />
                      <span className="text-neutral-800 font-semibold">
                        {post.author}
                      </span>
                      <span className="h-5 sm:h-6 w-px bg-neutral-300"></span>
                      <span className="text-neutral-800 font-semibold">
                        {post.country}
                      </span>
                    </div>

                    <div className="pt-6 sm:pt-10 flex flex-col gap-8 sm:gap-10 pb-10">
                      {post.content.map((paragraph, idx) => (
                        <div key={idx} className="flex flex-col gap-4 sm:gap-6">
                          <h2 className="font-medium font-serif text-2xl sm:text-3xl">
                            {paragraph.subtitle}
                          </h2>
                          <p className="text-gray-800 text-base sm:text-lg leading-7">
                            {paragraph.text}
                          </p>
                          {paragraph.image && (
                            <img
                              src={paragraph.image}
                              alt=""
                              className="w-full h-56 sm:h-[60vh] object-cover object-center rounded"
                            />
                          )}
                          <p className="text-gray-800 text-base sm:text-lg leading-7">
                            What if your favorite Nigerian celebrities weren’t
                            just stars on stage or screen, but machines on
                            wheels? In this whimsical exploration, we match some
                            of Nigeria’s most beloved celebrities with cars that
                            embody their unique personalities and styles. From
                            sleek sports cars to rugged SUVs, here’s a fun look
                            at which vehicles best represent these iconic
                            figures.
                          </p>
                        </div>
                      ))}

                      {/* comment box */}
                      {/* <div className="my-10 sm:my-20 flex flex-col gap-3">
                  <h3 className="text-2xl sm:text-4xl font-medium font-serif">
                    Leave a comment
                  </h3>
                  <div className="flex flex-col sm:flex-row items-end gap-3 sm:gap-5">
                    <textarea className="w-full sm:w-2/5 bg-neutral-50 border border-neutral-600 rounded-xl h-32 sm:h-40 focus:outline-none p-4 sm:p-5 text-sm sm:text-base" />
                    <button className="bg-amber-500 cursor-pointer text-white px-5 py-2 rounded w-full sm:w-max font-semibold">
                      Post Comment
                    </button>
                  </div>
                </div> */}
                    </div>
                    <span className="relative h-10 w-full flex justify-center items-center my-6 sm:my-10 px-2 sm:px-0">
                      <span className="w-full border-t border-t-neutral-300 block"></span>
                      <span className="absolute h-full w-full top-0 left-0 flex justify-center items-center">
                        <span className="text-blue-500 bg-white px-2 sm:px-3 text-sm sm:text-base font-semibold">
                          Next Article
                        </span>
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default BlogsDetails;
