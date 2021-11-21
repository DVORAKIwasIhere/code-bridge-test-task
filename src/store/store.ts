import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ArticleReducer from './reducers/ArticleSlice'

const rootReducer = combineReducers({
    ArticleReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

// export const store = configureStore({
//     reducer: {
//         app: appReducer,
//     },
// })

export type RootState = ReturnType<typeof rootReducer>

export type AppStore = ReturnType<typeof setupStore>

export type AppDispatch = AppStore['dispatch']