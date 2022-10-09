import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { User, LoginInput, RegisterInputAPI } from "../../models/userTypes";
import UserServices from "../../services/userService";
import jwt_decode from "jwt-decode";

export interface UserState {
  user: User;
  isLoggedIn: boolean;
  jwt: string;
  status: {
    login: {
      message: string;
      loading: boolean;
      error: string;
    };
    register: {
      message: string;
      loading: boolean;
      error: string;
    };
    edit: {
      message: string;
      loading: boolean;
      error: string;
    };
  };
}

const initialState: UserState = {
  user: {},
  isLoggedIn: false,
  jwt: "",
  status: {
    login: {
      message: "idle",
      loading: false,
      error: "",
    },
    register: {
      message: "idle",
      loading: false,
      error: "",
    },
    edit: {
      message: "idle",
      loading: false,
      error: "",
    },
  },
};

export const loginAsync = createAsyncThunk(
  "user/login",
  async (input: LoginInput) => {
    const response = await UserServices.login(input);
    return response.data;
  }
);

export const registerAsync = createAsyncThunk(
  "user/register",
  async (input: RegisterInputAPI) => {
    const response = await UserServices.register(input);
    return response.data;
  }
);

export const getProfileAsync = createAsyncThunk(
  "user/getProfile",
  async (input: string) => {
    const response = await UserServices.getById(input);
    return response.data;
  }
);

export const editProfileAsync = createAsyncThunk(
  "user/editProfile",
  async (input: RegisterInputAPI) => {
    const response = await UserServices.editProfile(input);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setLoginError: (state, action: PayloadAction<string>) => {
      state.status.login.error = action.payload;
    },
    setRegisterError: (state, action: PayloadAction<string>) => {
      state.status.register.error = action.payload;
    },
    clearStatus: (state) => {
      state.status = {
        login: {
          message: "idle",
          loading: false,
          error: "",
        },
        register: {
          message: "idle",
          loading: false,
          error: "",
        },
        edit: {
          message: "idle",
          loading: false,
          error: "",
        },
      };
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status.login.message = "loading";
        state.status.login.loading = true;
        state.status.login.error = "";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status.login.message = "success";
        state.status.login.loading = false;
        state.status.login.error = "";

        const token = action.payload.token;
        state.jwt = token;
        state.isLoggedIn = true;
        localStorage.setItem("token", token);
        try {
          const decodedData: any = jwt_decode(token);
          state.user.studentId = decodedData["StudentId"];
        } catch (e) {}
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status.login.message = "failed";
        state.status.login.loading = false;

        const errorMessage = action.error.message;
        state.status.login.error = errorMessage
          ? errorMessage
          : "Student ID or Password is incorrest.";
      })

      .addCase(registerAsync.pending, (state) => {
        state.status.register.message = "loading";
        state.status.register.loading = true;
        console.log("loading");
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status.register.message = "success";
        state.status.register.loading = false;
        console.log(action.payload);
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status.register.message = "failed";
        state.status.register.loading = false;
        console.dir(action);
        console.log(action);
        console.log("failed");
      })

      .addCase(getProfileAsync.pending, (state) => {})
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.user.name = user.Name;
        state.user.email = user.Email;
        state.user.nickname = user.Nickname;
        state.user.tel = user.Tel;
        state.user.faculty = user.Faculty;
      })
      .addCase(getProfileAsync.rejected, (state, action) => {})
      
      .addCase(editProfileAsync.pending, (state) => {
        state.status.edit.message = "loading";
        state.status.edit.loading = true;
      })
      .addCase(editProfileAsync.fulfilled, (state, action) => {
        state.status.edit.message = "success";
        state.status.edit.loading = false;
      })
      .addCase(editProfileAsync.rejected, (state, action) => {
        state.status.edit.message = "failed";
        state.status.edit.loading = false;
        
        const errorMessage = action.error.message;
        state.status.edit.error = errorMessage
          ? errorMessage
          : "Fail to edit profile.";
      });
  },
});

export const {
  setJwt,
  setIsLoggedIn,
  setLoginError,
  setRegisterError,
  clearStatus,
  updateUser,
} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsLoggedIn = (state: RootState) =>
  state.userReducer.isLoggedIn;

export const selectLoginLoading = (state: RootState) =>
  state.userReducer.status.login.loading;
export const selectLoginMessage = (state: RootState) =>
  state.userReducer.status.login.message;
export const selectLoginError = (state: RootState) =>
  state.userReducer.status.login.error;

export const selectRegisterLoading = (state: RootState) =>
  state.userReducer.status.register.loading;
export const selectRegisterMessage = (state: RootState) =>
  state.userReducer.status.register.message;
export const selectRegisterError = (state: RootState) =>
  state.userReducer.status.register.error;

export const selectEditLoading = (state: RootState) =>
  state.userReducer.status.edit.loading;
export const selectEditMessage = (state: RootState) =>
  state.userReducer.status.edit.message;
export const selectEditError = (state: RootState) =>
  state.userReducer.status.edit.error;

export const selectUser = (state: RootState) => state.userReducer.user;

export default userSlice.reducer;
