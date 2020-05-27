import axios from "axios"
import { ORDERS_WAIT_PAYMENT, ORDERS_PAYMENT, ORDER_PAYMENT_FETCH, ORDER_RESET, ORDERS_PAID, ORDERS_PAID_DELETE } from "./types"

export const ordersWaitPaymentFetch = (id) => { 
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/orders/" + id).then( 
            res => {
                dispatch({ type: ORDERS_WAIT_PAYMENT, payload: res.data }) 
            }
        )
    }
}

export const ordersPaidFetch = (id) => { 
    if (id === "PoK3aDRlXeYhtHWBg1sMYSZIOHo1") {
        return dispatch => {
            axios.get(process.env.REACT_APP_API_URL+"/orders/").then( 
                res => {
                    dispatch({ type: ORDERS_PAID, payload: res.data })
                }
            )
        }
    }
    else {
        return dispatch => {
            axios.get(process.env.REACT_APP_API_URL+"/orders/" + id).then( 
                res => {
                    dispatch({ type: ORDERS_PAID, payload: res.data })
                }
            )
        }
    }

}

export const orderPaidDelete = (id, uid) => {
    return dispatch => {
        axios.delete(process.env.REACT_APP_API_URL+"/order/" + id).then(
            res => {
                axios.get(process.env.REACT_APP_API_URL+"/orders/" + uid).then(
                    res => {
                        dispatch({ type: ORDERS_PAID_DELETE, payload: res.data })
                    }
                )
            }
        )
    }
}

export const ordersPaymentPut = (id, values) => {
    return dispatch => {
        axios.put(process.env.REACT_APP_API_URL+"/order/" + id, values).then(res => {
            dispatch({ type: ORDERS_PAYMENT });
        })
    }
}

export const ordersPaymentStatusPut = (id, values, uid) => {
    if (uid === "PoK3aDRlXeYhtHWBg1sMYSZIOHo1") {
        return dispatch => {
            axios.put(process.env.REACT_APP_API_URL+"/order/" + id, values).then(res => {
                axios.get(process.env.REACT_APP_API_URL+"/orders/").then( 
                    res => {
                        dispatch({ type: ORDERS_PAID, payload: res.data })
                    }
                )
            })
        }
    }
    else {
        return dispatch => {
            axios.put(process.env.REACT_APP_API_URL+"/order/" + id, values).then(res => {
                axios.get(process.env.REACT_APP_API_URL+"/orders/" + uid).then( 
                    res => {
                        dispatch({ type: ORDERS_PAID, payload: res.data })
                    }
                )
            })
        }
    }

}

export const orderPaymentFetch = (id) => { // ตอนนี้ทุก order จะส่งมาที่เดียวกันเพราะยังมีการการ login เพื่อระบุตัวตน user
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/order/" + id).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
            res => {
                dispatch({ type: ORDER_PAYMENT_FETCH, payload: res.data })
            }
        )
    }
}

export const ordersReset = () => {
    return dispatch => {
        dispatch({ type: ORDER_RESET })
    }
}

