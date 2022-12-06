import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUsers = createAsyncThunk('users/all', async () => {
  const response = await axios.get('http://localhost:3001/api/users/all');

  return response.data.users || response.data;
});

export const createUser = createAsyncThunk('users/add', async (user: any) => {
  const response = await axios.post('http://localhost:3001/api/users/add', user);

  return response.data.user || response.data;
});

export const deleteUser = createAsyncThunk('users/delete', async (id: string | number) => {
  const response = await axios.delete(`http://localhost:3001/api/users/delete/${id}`);

  return response.data.user || response.data;
});

export interface UserState {
  users: Array<any>;
  errors: any;
  user: object | any;
  isCreated: boolean;
  isDeleted: boolean;
}

const initialState: UserState = {
  users: [],
  user: null,
  isCreated: false,
  isDeleted: false,
  errors: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get users
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isCreated = false;
      state.isDeleted = false;
    });
    // add user
    builder.addCase(createUser.pending, (state) => {
      state.isCreated = false;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isCreated = true;
      state.user = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isCreated = false;
      state.errors = {
        created: action.error
      };
    });
    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isDeleted = false;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isDeleted = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isDeleted = false;
      state.errors = {
        deleted: action.error
      };
    });
  }
});

export default userSlice.reducer;
