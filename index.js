/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native';
import MainNavigator from './src/Navigation';
import { name as appName } from './app.json';

import storeConfig from './src/store/StoreConfig'

const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <MainNavigator />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
