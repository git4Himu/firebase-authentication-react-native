import { configureStore, createSerializableStateInvariantMiddleware , isPlain} from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import productReducer from './reducers/product.reducer'
export  const store = configureStore({
  reducer: {
    product:productReducer,
    auth:authReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch