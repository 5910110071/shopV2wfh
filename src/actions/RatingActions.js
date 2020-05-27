import axios from "axios"
import { RATING_FETCH } from "./types"

export const ratingUpdate = (product_id, formValues) => {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/rating/" + product_id).then(
            res => {
                if (res.data == null) {
                    axios.post(process.env.REACT_APP_API_URL+"/rating", { product_id: product_id, sum: formValues.rating, count: 1, average: formValues.rating }).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
                        res => {
                            axios.get(process.env.REACT_APP_API_URL+"/rating/" + product_id).then(
                                res => {
                                    dispatch({ type: RATING_FETCH, payload: res.data })
                                }
                            )
                        }
                    )
                }
                else {
                    let value = {
                        product_id: product_id,
                        sum: (res.data.sum + formValues.rating),
                        count: res.data.count + 1,
                        average: (res.data.sum + formValues.rating) / (res.data.count + 1)
                    }
                    axios.put(process.env.REACT_APP_API_URL+"/rating/" + product_id, value).then(
                        res => {
                            axios.get(process.env.REACT_APP_API_URL+"/rating/" + product_id).then(
                                res => {
                                    dispatch({ type: RATING_FETCH, payload: res.data })
                                }
                            )
                        }
                    )
                }
            }
        )
    }
}

export const ratingFetch = (product_id) => {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/rating/" + product_id).then(
            res => {
                dispatch({ type: RATING_FETCH, payload: res.data })
            }
        )
    }
}

