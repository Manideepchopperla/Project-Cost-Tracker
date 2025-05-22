import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where
} from 'firebase/firestore';
import { db } from '../../firebase/config';

// Create async thunks for items CRUD operations
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (userId, { rejectWithValue }) => {
    try {
      const itemsQuery = query(
        collection(db, 'users', userId, 'items')
      );
      const querySnapshot = await getDocs(itemsQuery);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addItem = createAsyncThunk(
  'items/addItem',
  async ({ userId, name, cost }, { rejectWithValue }) => {
    try {
      const itemsRef = collection(db, 'users', userId, 'items');
      const docRef = await addDoc(itemsRef, {
        name,
        cost: Number(cost),
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, name, cost: Number(cost), createdAt: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ userId, itemId, name, cost }, { rejectWithValue }) => {
    try {
      const itemRef = doc(db, 'users', userId, 'items', itemId);
      await updateDoc(itemRef, {
        name,
        cost: Number(cost),
        updatedAt: new Date().toISOString(),
      });
      return { id: itemId, name, cost: Number(cost), updatedAt: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      const itemRef = doc(db, 'users', userId, 'items', itemId);
      await deleteDoc(itemRef);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the items slice
const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add item
      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update item
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete item
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearItems } = itemsSlice.actions;
export default itemsSlice.reducer;