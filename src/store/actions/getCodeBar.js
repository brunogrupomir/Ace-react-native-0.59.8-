import { GET_CODE_BAR } from './actionTypes'

export const getCodeBar = codeBar => {
    return {
        type: GET_CODE_BAR,
        payload: codeBar

    }
}