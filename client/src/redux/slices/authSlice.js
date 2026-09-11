import { createSlice } from '@reduxjs/toolkit';

const initialUser = (() => {
  try {
    const saved = localStorage.getItem('fk_user');
    return saved ? JSON.parse(saved) : {
      _id: '65f1a1000000000000000099',
      name: 'Rohan Sharma',
      phone: '9876543210',
      email: 'rohan.sharma@example.com',
      addresses: [
        {
          _id: 'addr_1',
          name: 'Rohan Sharma',
          phone: '9876543210',
          pincode: '560001',
          locality: 'Koramangala 5th Block',
          addressLine: 'Flat 402, Prestige Towers',
          city: 'Bengaluru',
          state: 'Karnataka',
          landmark: 'Near Forum Mall',
          addressType: 'HOME',
          isDefault: true
        }
      ]
    };
  } catch (e) {
    return null;
  }
})();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    isModalOpen: false,
    loading: false,
    error: null
  },
  reducers: {
    toggleAuthModal: (state, action) => {
      state.isModalOpen = action.payload !== undefined ? action.payload : !state.isModalOpen;
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('fk_user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('fk_user');
    },
    addAddressSuccess: (state, action) => {
      if (state.user) {
        state.user.addresses = action.payload;
        localStorage.setItem('fk_user', JSON.stringify(state.user));
      }
    }
  }
});

export const { toggleAuthModal, setCredentials, logout, addAddressSuccess } = authSlice.actions;
export default authSlice.reducer;
