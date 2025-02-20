import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import doctorReducer from './slices/doctorSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define the persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'admin', 'doctor'], // Persist user, admin, and doctor slices
};

// Combine all slice reducers into a single root reducer
const rootReducer = combineReducers({
    user: userReducer,
    doctor: doctorReducer,
    admin: adminReducer,
});

// Apply the persistReducer to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Export persistor to use with PersistGate in your main app file
export const persistor = persistStore(store);

// Types for root state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;







// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './slices/authSlice';
// import adminReducer from './slices/adminSlice';
// import doctorReducer from './slices/doctorSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage

// // Define persist configuration for redux-persist
// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['user',"admin","doctor" ]// Specify which slices to persist, e.g., 'user' slice
// };

// // Combine reducers with persistence
// const rootReducer = {
//     user: userReducer,
//     doctor: doctorReducer,
//     admin: adminReducer
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: getDefaultMiddleware =>
//         getDefaultMiddleware({
//             serializableCheck: false, // Disable serializable checks for redux-persist compatibility
//         }),
// });






// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './slices/authSlice'
// import adminReducer from './slices/adminSlice'
// import doctorReducer from './slices/doctorSlice'
// import { persistStore,persistReducer } from "redux-persist";
// import { Storage } from "redux-persist";

// const store=configureStore({

//     reducer:{
//         user:userReducer,
//         doctor:doctorReducer,
//         admin:adminReducer,

//     }

// })

// export type RootState=ReturnType < typeof store.getState>
// export type AppDispatch= typeof store.dispatch

// export default store