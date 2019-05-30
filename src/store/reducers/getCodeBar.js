import { GET_CODE_BAR } from '../actions/actionTypes'

const intialState = {
    codeBar: null,
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case GET_CODE_BAR:
            return {
                ...state,
                codeBar: action.payload.codeBar,
            }
        default:
            return state
    }
}

export default reducer