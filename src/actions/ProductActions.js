import axios from "axios"
import { PRODUCTS_FETCH, PRODUCT_FETCH } from "./types"

export const productFetch = id => {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/product/" + id).then(
            res => {
                dispatch({ type: PRODUCT_FETCH, payload: res.data })
            }
        )
    }
}

export const productsFetchFromCategory = id => {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/product/category/" + id).then(
            res => {
                dispatch({ type: PRODUCTS_FETCH, payload: res.data }) 
            }
        )
    }
}

export const productsFetch = () => {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/product/all").then(
            res => {
                dispatch({ type: PRODUCTS_FETCH, payload: res.data })
            }
        )
    }
}
