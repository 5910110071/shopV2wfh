import axios from "axios"
import { CATEGORIES_FETCH } from "./types"

export const categoriesFetch = () => {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/category").then(
            res => {
                dispatch({ type: CATEGORIES_FETCH, payload: res.data })
            } 
        )
    }
}