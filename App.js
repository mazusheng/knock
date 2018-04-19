import React from 'react';
import dva from './utils/dva';
import { AppRegistry, AsyncStorage } from 'react-native'
 import { persistStore, autoRehydrate } from 'redux-persist'
import Router, { routerMiddleware } from './router'
import AesModel from "./models/AesModel";
import CipherResult from "./models/CipherResult";
import routerModel from "./models/router";

const app = dva({
    initialState: {},
    onAction: [routerMiddleware],
    models: [
        AesModel,routerModel,CipherResult
    ],
    // onAction: createLogger,
     extraEnhancers: [autoRehydrate()],
})

persistStore(app.getStore(), {
    storage: AsyncStorage,
    blacklist: ['router','CipherResult'],
})

const App = app.start(<Router />)
export default App