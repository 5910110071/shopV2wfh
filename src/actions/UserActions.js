import axios from "axios"
import { SET_USER, GET_USER, RESET_USER } from "./types"

export const setUser = (user) => {
    return dispatch => {
        axios.post(process.env.REACT_APP_API_URL+"/users",user).then( 
            res => {
                dispatch({ type: SET_USER, payload: res.data })
            }
        )
    }
}

export const getUser = (user_id) => {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/user/" + user_id).then( 
            res => {
                dispatch({ type: GET_USER, payload: res.data })
            }
        )
    }
}

export const resetUser = () => {
    return dispatch => {
        dispatch({ type: RESET_USER })
    }
}