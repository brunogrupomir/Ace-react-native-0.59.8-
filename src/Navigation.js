import React from 'react'
import {
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation'

import Auth from './Screens/Auth'
import ValidaToken from './Screens/ValidaToken'
import Home from './Screens/Home'
import Novo from './Screens/AdicionarCodeBar'
import Pendentes from './Screens/EntregasPendentes'
import Addcanhoto from './Screens/AdicionarCanhoto'
import AddSemCanhoto from './Screens/AdicionarSemCanhoto'
import Canhoto from './Screens/EntregasComCanhoto'
import SemCanhoto from './Screens/EntregasSemCanhoto'
import DetalhesCanhoto from './Screens/DetalhesCanhoto'
import DetalhesSemCanhoto from './Screens/DetalhesSemCanhoto'

const MainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    ValidaToken: {
        name: 'ValidaToken',
        screen: ValidaToken
    },
    Home: {
        name: 'Home',
        screen: Home
    },
    Novo: {
        name: 'Novo',
        screen: Novo
    },
    Pendentes: {
        name: 'Pendentes',
        screen: Pendentes
    },
    Addcanhoto: {
        name: 'Addcanhoto',
        screen: Addcanhoto
    },
    AddSemCanhoto: {
        name: 'AddSemCanhoto',
        screen: AddSemCanhoto
    },
    Canhoto: {
        name: 'Canhoto',
        screen: Canhoto
    },
    SemCanhoto: {
        name: 'SemCanhoto',
        screen: SemCanhoto
    },
    DetalhesCanhoto: {
        name: 'DetalhesCanhoto',
        screen: DetalhesCanhoto
    },
    DetalhesSemCanhoto: {
        name: 'DetalhesSemCanhoto',
        screen: DetalhesSemCanhoto
    }
}

const MainNavigator = createSwitchNavigator(MainRoutes, {
    initialRouteName: 'Auth'
})

const AppContainer = createAppContainer(MainNavigator);


export default AppContainer;