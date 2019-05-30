import { VALIDA_CNPJ } from '../actions/actionTypes'

const intialState = {
    cnpj: null,
    token: null
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case VALIDA_CNPJ:
            return {
                ...state,
                cnpj: action.payload.cnpj,
                token: action.payload.token
            }
        default:
            return state
    }
}

export default reducer