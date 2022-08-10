import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    authUser: null,
    tenantId: "",
    count: 0,
    roles: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser= action.payload
    },
    setTenantId: (state, action) => {
      state.tenantId = action.payload
    },
    setCount: (state, action) => {
      state.count = action.payload
    },
    setRoles: (state, action) => {
      state.roles = action.payload
    }
  }
});

export const { setAuthUser, setTenantId, setCount, setRoles } = loginSlice.actions;

export const setAuthUserAsync = user => dispatch => {
  dispatch(setAuthUser(user));
};

export const setTenantIdAsync = tenantId => dispatch => {
  dispatch(setTenantId(tenantId));
};

export const setRolesAsync = rolesArr => dispatch => {
  dispatch(setRoles(rolesArr));
};

export default loginSlice.reducer;
