import { posts } from "@/lib/posts";

const { createSlice } = require("@reduxjs/toolkit");

const contextSlice = createSlice({
  name: "context",
  initialState: {
    category: "allcategories",
    isOpen: false,
    // AllPost: posts,
    AllPost: [],
    filteredPosts: [],
    editPost: null,
    singlePost: null,
    search: "",
    emailSuccess: false,
    //  admin states
    showAdminSidebar: true,
    showAddModal: false,
    isLoading: false,
    detailsLoading: false,
    // comments
    comments: [],
    commentsLoading: false,
    showMobileSideBar: false,
    showSearchBar: false,
    searchMobile: "",
    selectedCountry: "all",

    // visitor count
    visitorCount: 0,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setFilteredPosts(state, action) {
      state.filteredPosts = action.payload;
    },
    setAllPost(state, action) {
      state.AllPost = action.payload;
    },
    setSinglePost: (state, action) => {
      state.singlePost = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    // admin reducers
    setShowAdminSidebar(state) {
      state.showAdminSidebar = !state.showAdminSidebar;
    },
    setShowAddModal(state, action) {
      state.showAddModal = action.payload;
    },
    AddPost(state, action) {
      state.AllPost = [action.payload, ...state.AllPost];
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setDetailsLoading(state, action) {
      state.detailsLoading = action.payload;
    },

    // ✅ Comments
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addCommentToList: (state, action) => {
      state.comments.unshift(action.payload); // new comment goes to top
    },
    setCommentsLoading: (state, action) => {
      state.commentsLoading = action.payload;
    },
    // mobile sidebar
    setShowMobileSideBar(state, action) {
      state.showMobileSideBar = action.payload;
    },
    setShowSearchBar(state, action) {
      state.showSearchBar = action.payload;
    },
    setSearchMobile(state, action) {
      state.searchMobile = action.payload;
    },
    // visitor count
    setVisitorCount(state, action) {
      state.visitorCount = action.payload;
    },
    setSelectedCountry(state, action) {
      state.selectedCountry = action.payload;
    },
    setEmailSuccess(state, action) {
      state.emailSuccess = action.payload;
    },
    // setEditPost: (state, action) => {
    //   state.editPost = action.payload;
    // },
    // deletePost: (state, action) => {
    //   state.AllPost = state.AllPost.filter(
    //     (post) => post._id !== action.payload
    //   );
    // },
    setEditPost: (state, action) => {
      state.editPost = action.payload;
    },

    removePost: (state, action) => {
      state.AllPost = state.AllPost.filter(
        (post) => post._id !== action.payload
      );
    },

    updatePostInStore: (state, action) => {
      const index = state.AllPost.findIndex(
        (post) => post._id === action.payload._id
      );
      if (index !== -1) {
        state.AllPost[index] = action.payload;
      }
    },
    filterByCountry(state, action) {
      const country = action.payload;
      state.selectedCountry = country;

      // First, start with all posts
      let filtered = state.AllPost;

      // Filter by country (if not "all")
      if (country !== "all") {
        filtered = filtered.filter(
          (post) => post.country?.toLowerCase() === country.toLowerCase()
        );
      }

      // Then, also filter by selected category (if any)
      if (state.category !== "allcategories") {
        filtered = filtered.filter((post) =>
          post.category.some(
            (c) => c.toLowerCase() === state.category.toLowerCase()
          )
        );
      }

      state.filteredPosts = filtered;
    },
  },
  // extraReducers: (builder) => {

  // },
});

export const {
  setCategory,
  setIsOpen,
  setFilteredPosts,
  setAllPost,
  setSearch,
  setEmail,
  setSinglePost,
  setShowAdminSidebar,
  setShowAddModal,
  AddPost,
  setIsLoading,
  setDetailsLoading,
  // comments
  setComments,
  addCommentToList,
  setCommentsLoading,
  setShowMobileSideBar,
  setShowSearchBar,
  setSearchMobile,
  setVisitorCount,
  filterByCountry,
  setSelectedCountry,
  setEmailSuccess,
  setEditPost,
  removePost,
  updatePostInStore,
} = contextSlice.actions;
export default contextSlice.reducer;
