import { PrimalType } from './primal-type';

export interface PokemonWithMoveset {
    "id": number
    "name": string
    "type1": PrimalType
    "type2": PrimalType
    "form": string | null
    "qm": string
    "qm_id": number
    "qm_type": PrimalType
    "cm": string
    "cm_id": number
    "cm_type": PrimalType
    "DPS": number
    "TDO": number
    "POW": number
}