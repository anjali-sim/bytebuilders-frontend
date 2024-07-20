import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreferencesState {
  diet: string[];
  allergies: string[];
  flavors: string[];
  cuisines: string[];
  cookingTime: string[];
  meals: string[];
}

const initialState: PreferencesState = {
  diet: [],
  allergies: [],
  flavors: [],
  cuisines: [],
  cookingTime: [],
  meals: [],
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    updatePreference: (state, action: PayloadAction<{ category: keyof PreferencesState; option: string }>) => {
      const { category, option } = action.payload;
      if (state[category].includes(option)) {
        state[category] = state[category].filter(item => item !== option);
      } else {
        state[category].push(option);
      }
    },
  },
});

export const { updatePreference } = preferencesSlice.actions;

export default preferencesSlice.reducer;
