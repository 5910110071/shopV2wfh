import { ORDERS_WAIT_PAYMENT, ORDERS_PAYMENT, ORDER_PAYMENT_FETCH, ORDER_RESET, ORDERS_PAID, ORDERS_PAID_DELETE } from "../actions/types"
export default function (state = { totalPrice: 0, orders: [], confirm: false, msg: '' }, action) {
    switch (action.type) {

        case ORDERS_WAIT_PAYMENT:
            let resultOrder2 = action.payload.filter(order => (order.status === "รอชำระเงิน"));
            return resultOrder2
        case ORDERS_PAID:
            return action.payload
        case ORDERS_PAID_DELETE:
            let resultOrder4 = action.payload.filter(order => (order.status === "รอชำระเงิน"));
            return resultOrder4
        case ORDERS_PAYMENT:
            return { totalPrice: 0, orders: [], saved: true, msg: "บันทึกสินค้าเรียบร้อย" }
        case ORDER_PAYMENT_FETCH:
            return action.payload
        case ORDER_RESET:
            return { totalPrice: 0, orders: [], confirm: false, msg: '' }
        default: return state
    }
}