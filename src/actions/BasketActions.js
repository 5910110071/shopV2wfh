import axios from "axios"
import { BASKET_POST } from "./types"



export const basketConfirm = (product, saleman_id, user, quantity) => {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/basket/" + user.id).then(
            res => {
                if (res.data !== null) {
                    let findOrder = res.data.orders.find(order => order.product.product_id === product.product_id);
                    if (findOrder) {
                        if (findOrder.quantity + quantity <= findOrder.product.product_inventory) {
                            findOrder.quantity += quantity;
                            res.data.totalPrice += quantity * product.product_price
                        }
                    }
                    else {
                        res.data.orders.push({ product: product, quantity: quantity, saleman_id: saleman_id });
                        res.data.totalPrice += quantity * product.product_price
                    }
                    axios.put(process.env.REACT_APP_API_URL+"/basket/" + user.id, res.data).then(
                        res => {
                            axios.get(process.env.REACT_APP_API_URL+"/basket/" + user.id).then(
                                res => {
                                    dispatch({ type: BASKET_POST, payload: res.data })
                                }
                            )
                        }
                    )
                }
                else {

                    axios.post(process.env.REACT_APP_API_URL+"/basket", { orderDate: new Date(), totalPrice: quantity * product.product_price, orders: [{ product: product, quantity: quantity, saleman_id: saleman_id }], status: "รอชำระเงิน", user_name: user.user_name, user_id: user.id, user_address: user.user_address, user_tel: user.user_tel }).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
                        res => {
                            axios.get(process.env.REACT_APP_API_URL+"/basket/" + user.id).then(
                                res => {
                                    dispatch({ type: BASKET_POST, payload: res.data })
                                }
                            )
                        }
                    )
                }
            }
        )
    }
}

export const basketFetch = (id) => {// เพิ่ม user_id
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL+"/basket/" + id).then(res => {
            dispatch({ type: BASKET_POST, payload: res.data })
        })
    }
}

export const basketPost = (formValues) => {// เพิ่ม user_id
    return dispatch => {
        axios.post(process.env.REACT_APP_API_URL+"/orders", formValues).then(res => {
            dispatch({ type: BASKET_POST, payload: res.data })
        })
    }
}

export const basketDelete = (id) => {
    return dispatch => {
        axios.delete(process.env.REACT_APP_API_URL+"/basket/" + id).then(
            res => {
                axios.get(process.env.REACT_APP_API_URL+"/basket/" + id).then(
                    res => {
                        dispatch({ type: BASKET_POST, payload: res.data })
                    }
                )
            }
        )
    }
}


export const basketDeleteProduct = (id, product_id, user_id) => {
    return dispatch => {

        axios.get(process.env.REACT_APP_API_URL+"/basket/" + user_id).then(
            res => {
                let findOrder = res.data.orders.find(order => order.product.product_id === product_id);
                res.data.orders = res.data.orders.filter(order => order.product.product_id !== product_id);
                if (res.data.orders.length === 0) {
                    axios.delete(process.env.REACT_APP_API_URL+"/basket/" + id).then(
                        res => {
                            axios.get(process.env.REACT_APP_API_URL+"/basket/" + id).then(
                                res => {
                                    dispatch({ type: BASKET_POST, payload: res.data })
                                }
                            )
                        }
                    )
                }
                else {

                    res.data.totalPrice -= findOrder.quantity * findOrder.product.product_price
                    axios.put(process.env.REACT_APP_API_URL+"/basket/" + user_id, res.data).then(
                        res => {
                            axios.get(process.env.REACT_APP_API_URL+"/basket/" + user_id).then(
                                res => {
                                    dispatch({ type: BASKET_POST, payload: res.data })
                                }
                            )
                        }
                    )
                }
            }
        )
    }
}

export const basketEditQuantity = (product_id, user_id, op) => {
    return dispatch => {

        axios.get(process.env.REACT_APP_API_URL+"/basket/" + user_id).then(
            res => {
                let findOrder = res.data.orders.find(order => order.product.product_id === product_id);
                if (op === "+") {
                    if (findOrder.quantity + 1 <= findOrder.product.product_inventory) {
                        findOrder.quantity++
                        res.data.totalPrice += findOrder.product.product_price
                    }
                }
                else if (op === "-") {
                    if (findOrder.quantity - 1 >= 1) {
                        findOrder.quantity--
                        res.data.totalPrice -= findOrder.product.product_price
                    }
                }
                axios.put(process.env.REACT_APP_API_URL+"/basket/" + user_id, res.data).then(
                    res => {
                        axios.get(process.env.REACT_APP_API_URL+"/basket/" + user_id).then(
                            res => {
                                dispatch({ type: BASKET_POST, payload: res.data })
                            }
                        )
                    }
                )
            }
        )
    }
}

