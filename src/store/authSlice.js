import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk — verify authentication
export const verifyAuth = createAsyncThunk(
  "auth/verifyAuth",
  async (_, { rejectWithValue }) => {
    console.log("🔍 verifyAuth: sending request to /api/auth/verify");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const res = await fetch("/api/auth/verify", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log("🔍 verifyAuth: response status:", res.status);

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          errorData = { message: `HTTP error ${res.status}` };
        }
        console.error("🔍 verifyAuth: HTTP error:", res.status, errorData);
        return rejectWithValue(errorData.message || `HTTP error ${res.status}`);
      }

      const data = await res.json();
      console.log("🔍 verifyAuth: response data:", data);

      if (data.authenticated) {
        console.log("🔍 verifyAuth: authenticated as", data.admin.email);
        return data.admin;
      } else {
        console.log("🔍 verifyAuth: not authenticated");
        return rejectWithValue("Not authenticated");
      }
    } catch (err) {
      console.error("🔍 verifyAuth: error:", err.message);
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// Async thunk — login
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email, password }, { rejectWithValue }) => {
    console.log("🔍 loginAdmin: sending request to /api/auth/login", { email });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      console.log("🔍 loginAdmin: response status:", res.status);
      const data = await res.json();
      console.log("🔍 loginAdmin: response data:", data);

      if (data.success) {
        console.log("✓ loginAdmin: successful:", data.admin.email);
        return data.admin;
      } else {
        console.log("✗ loginAdmin: failed:", data.message);
        return rejectWithValue(data.message || "Login failed");
      }
    } catch (err) {
      console.error("✗ loginAdmin: error:", err.message);
      return rejectWithValue(err.message || "Login failed. Please try again.");
    }
  }
);

// Async thunk — logout
export const logoutAdmin = createAsyncThunk(
  "auth/logoutAdmin",
  async (_, { rejectWithValue }) => {
    console.log("🔍 logoutAdmin: sending request to /api/auth/logout");
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      console.log("🔍 logoutAdmin: response status:", res.status);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("✗ logoutAdmin: HTTP error:", res.status, errorData);
        return rejectWithValue(errorData.message || `HTTP error ${res.status}`);
      }
      console.log("✓ logoutAdmin: successful");
      return true;
    } catch (err) {
      console.error("✗ logoutAdmin: error:", err.message);
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuth(state) {
      console.log("🔄 authSlice: clearAuth");
      state.admin = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Verify Auth
      .addCase(verifyAuth.pending, (state) => {
        console.log("🔄 authSlice: verifyAuth pending");
        state.loading = true;
        state.error = null;
        state.admin = null;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        console.log(
          "🔄 authSlice: verifyAuth fulfilled, admin:",
          action.payload
        );
        state.loading = false;
        state.admin = action.payload;
        state.error = null;
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        console.log(
          "🔄 authSlice: verifyAuth rejected, error:",
          action.payload
        );
        state.loading = false;
        state.admin = null;
        state.error = action.payload;
      })

      // Login
      .addCase(loginAdmin.pending, (state) => {
        console.log("🔄 authSlice: loginAdmin pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        console.log(
          "🔄 authSlice: loginAdmin fulfilled, admin:",
          action.payload
        );
        state.loading = false;
        state.admin = action.payload;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        console.log(
          "🔄 authSlice: loginAdmin rejected, error:",
          action.payload
        );
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutAdmin.pending, (state) => {
        console.log("🔄 authSlice: logoutAdmin pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        console.log("🔄 authSlice: logoutAdmin fulfilled");
        state.admin = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        console.log(
          "🔄 authSlice: logoutAdmin rejected, error:",
          action.payload
        );
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
