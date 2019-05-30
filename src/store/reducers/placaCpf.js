import { PLACA_CPF } from '../actions/actionTypes'

const intialState = {
    placa: null,
    cpf: null
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case PLACA_CPF:
            return {
                ...state,
                placa: action.payload.placa,
                cpf: action.payload.cpf


            }
        default:
            return state
    }
}

export default reducer