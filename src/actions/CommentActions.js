import axios from "axios"
import { COMMENT_POST, COMMENT_FETCH } from "./types"

export const commentPost = (comment, id) => {
    return dispatch => {
        axios.post(process.env.REACT_APP_API_URL+"/comments", comment).then(
            res => {
                axios.get(process.env.REACT_APP_API_URL+"/comments/" + id).then(
                    res => {
                        dispatch({ type: COMMENT_POST, payload: res.data })
                    }
                )
            }
        )
    }
}

export const commentFetch = (id) => {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/comments/" + id).then(
            res => {
                dispatch({ type: COMMENT_FETCH, payload: res.data })
            }
        )
    }
}