import { VALIDA_CNPJ } from './actionTypes'

export const validaCnpj = cnpj => {
    return {
        type: VALIDA_CNPJ,
        payload: cnpj

    }
}

