import { createSlice } from '@reduxjs/toolkit';

export const SliceUser = createSlice({
  name: 'form',
  initialState: {
    prenom: '',
    nom: '',
    email: '',
    groupes: '',
    adresse: '',
    ville: '',
    pays: '',
    codePostal: '',
    tel: '',
    selectedFormation: '',
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    updateField: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    submitForm: (state) => {
      state.loading = true;
    },
    submitFormSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    submitFormError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetForm: (state) => {
      state.prenom = '';
      state.nom = '';
      state.email = '';
      state.groupes = '';
      state.adresse = '';
      state.ville = '';
      state.pays = '';
      state.codePostal = '';
      state.tel = '';
      state.selectedFormation = '';
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});


export const { afficheUser } = SliceUser.actions;
export default SliceUser.reducer;
