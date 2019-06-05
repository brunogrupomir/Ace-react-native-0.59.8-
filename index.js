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
import { decode, encode } from 'base-64';

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}


const store = storeConfig()
const Redux = () => (
    <Provider store={store}>
        <MainNavigator />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
