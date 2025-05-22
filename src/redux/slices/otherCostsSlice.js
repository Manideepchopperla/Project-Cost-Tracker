import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query
} from 'firebase/firestore';
import { db } from '../../firebase/config';

// Create async thunks for other costs CRUD operations
export const fetchOtherCosts = createAsyncThunk(
  'otherCosts/fetchOtherCosts',
  async (userId, { rejectWithValue }) => {
    try {
      const costsQuery = query(
        collection(db, 'users', userId, 'otherCosts')
      );
      const querySnapshot = await getDocs(costsQuery);
      const costs = [];
      querySnapshot.forEach((doc) => {
        costs.push({ id: doc.id, ...doc.data() });
      });
      return costs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addOtherCost = createAsyncThunk(
  'otherCosts/addOtherCost',
  async ({ userId, description, amount }, { rejectWithValue }) => {
    try {
      const costsRef = collection(db, 'users', userId, 'otherCosts');
      const docRef = await addDoc(costsRef, {
        description,
        amount: Number(amount),
        createdAt: new Date().toISOString(),
      });
      return { 
        id: docRef.id, 
        description, 
        amount: Number(amount), 
        createdAt: new Date().toISOString() 
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOtherCost = createAsyncThunk(
  'otherCosts/updateOtherCost',
  async ({ userId, costId, description, amount }, { rejectWithValue }) => {
    try {
      const costRef = doc(db, 'users', userId, 'otherCosts', costId);
      await updateDoc(costRef, {
        description,
        amount: Number(amount),
        updatedAt: new Date().toISOString(),
      });
      return { 
        id: costId, 
        description, 
        amount: Number(amount), 
        updatedAt: new Date().toISOString() 
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOtherCost = createAsyncThunk(
  'otherCosts/deleteOtherCost',
  async ({ userId, costId }, { rejectWithValue }) => {
    try {
      const costRef = doc(db, 'users', userId, 'otherCosts', costId);
      await deleteDoc(costRef);
      return costId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the otherCosts slice
const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState: {
    costs: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearOtherCosts: (state) => {
      state.costs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch other costs
      .addCase(fetchOtherCosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOtherCosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.costs = action.payload;
      })
      .addCase(fetchOtherCosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add other cost
      .addCase(addOtherCost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOtherCost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.costs.push(action.payload);
      })
      .addCase(addOtherCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update other cost
      .addCase(updateOtherCost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOtherCost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.costs.findIndex(cost => cost.id === action.payload.id);
        if (index !== -1) {
          state.costs[index] = { ...state.costs[index], ...action.payload };
        }
      })
      .addCase(updateOtherCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete other cost
      .addCase(deleteOtherCost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOtherCost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.costs = state.costs.filter(cost => cost.id !== action.payload);
      })
      .addCase(deleteOtherCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOtherCosts } = otherCostsSlice.actions;
export default otherCostsSlice.reducer;