import { createSlice } from "@reduxjs/toolkit"
const storedAuth = JSON.parse(
    localStorage.getItem("auth")
);
const authSlice = createSlice({
  name: "auth",
  // initialState:{    
  //   user: null,  //this will contain id, username and role    
  //   token: null,
  //   isAuthenticated: false,
  // }, 

  initialState:{    
    user: storedAuth?.user || null,
    token: storedAuth?.token || null,
    isAuthenticated: !!storedAuth,
},
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    // logout: (state) => {
    //   state.user = null;
    //   state.token = null;
    //   state.isAuthenticated = false;
    // },
    logout: (state) => {
  state.user = null;
  state.token = null;
  state.isAuthenticated = false;

  localStorage.removeItem("auth");
},
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
