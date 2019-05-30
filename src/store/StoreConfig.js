import { createStore, combineReducers } from 'redux'
import validaCnpj from './reducers/validaCnpj'
import getCodeBar from './reducers/getCodeBar'
import placaCpf from './reducers/placaCpf'

const reducers = combineReducers({
    cnpj: validaCnpj,
    codeBar: getCodeBar,
    placaCpf: placaCpf
})

const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig