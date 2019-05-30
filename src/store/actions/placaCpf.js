import { PLACA_CPF } from './actionTypes'

export const onPlacaCpf = placaCpf => {
    return {
        type: PLACA_CPF,
        payload: placaCpf

    }
}