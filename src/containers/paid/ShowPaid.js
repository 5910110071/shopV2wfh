import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Header from '../../components/Header'


class PaymentMornitor extends Component {

    showOrders() {
        const { orders, onChangeStatus } = this.props
        return orders && Array.isArray(orders) && orders.map(order => {
            const date = new Date(order.orderDate)
            return (

                <div key={order._id} className="container mb-3  " >
                    
                    <div className="card">
                        <div className="row d-flex justify-content-center" >
                            <h6 className="text-center mt-3 mb-3 ">รายการสั่งซื้อวันที่ {date.toLocaleDateString()} {date.toLocaleTimeString()}</h6>
                        </div>

                        <div className="row d-flex justify-content-center title">
                            {order.orders && order.orders.map(record => {
                                return (
                                    <div key={record.product.product_id} className="col-4 text-center ">
                                        <img src={record.product.product_image} className="card-img-top img-thumbnail mb-2 rounded mx-auto d-block sticky2 " Style="width: 70px;" alt="..." />
                                        <div>
                                            {record.product.product_name}
                                        </div>
                                        <div >
                                            จำนวน {record.quantity}
                                        </div>
                                        <div >
                                            ราคา {record.product.product_price * record.quantity}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>


                        <div className="row d-flex justify-content-center">
                            <div className="title  text-danger text-center ">ยอดรวม {order.totalPrice} บาท </div>
                        </div>


                        <hr />
                        <h5 className="text-right mt-2 text-center">ข้อมูลการชำระเงิน</h5>


                        <div className="d-flex justify-content-center">
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                                <div className="row title">

                                    <div className="col-12">
                                        ชื่อ : {order.user_name}
                                    </div>

                                    <div className="col-12 mt-1">
                                        เบอร์โทร : {order.user_tel}
                                    </div>

                                    <div className="col-12 mt-1">
                                        ที่อยู่ : {order.user_address}
                                    </div>

                                    <div className="col-12 mt-1">
                                        สถานะ : {order.status}
                                    </div>

                                    <div className="col-12 mt-2 d-flex justify-content-center mb-2 ">
                                        {this.props.user.id === "PoK3aDRlXeYhtHWBg1sMYSZIOHo1" &&
                                            <button className={order.status === "สินค้ากำลังจัดส่ง" ? "btn btn-sm btn-success ml-2 " : "btn btn-sm btn-secondary ml-2"} onClick={() => this.props.history.push('/UpdateTrackingNumber/' + order._id)
                                            }>
                                                เพิ่มหมายเลขติดตามสินค้า
                                </button>}

                                    </div>

                                    <div className="col-12 text-center">
                                        ติดตามสินค้า : {order.TrackingNumber}
                                    </div>


                                    {/* <div className="col-6  mb-3 mt-2">
                            <img src={order.Silp} style={{ width: "500px;" }} alt="" />
                        </div> */}


                                    <div className="col-12 mt-2 mb-3">
                                        {this.props.user.id === "PoK3aDRlXeYhtHWBg1sMYSZIOHo1" &&
                                            <div className="d-flex justify-content-center">
                                                <button className={order.status === "ข้อมูลการชำระเงินถูกต้อง" ? "btn btn-sm btn-success ml-2 " : "btn btn-sm btn-secondary ml-2"} onClick={() => onChangeStatus(order, "ข้อมูลการชำระเงินถูกต้อง")}>ถูกต้อง</button>
                                                <button className={order.status === "สินค้ากำลังจัดส่ง" ? "btn btn-sm btn-success ml-2 " : "btn btn-sm btn-secondary ml-2"} onClick={() => onChangeStatus(order, "สินค้ากำลังจัดส่ง")}>จัดส่ง</button>
                                                <button className={order.status === "สินค้าจัดส่งสำเร็จ" ? "btn btn-sm btn-success ml-2 mr-2 " : "btn btn-sm btn-secondary ml-2 mr-2"} onClick={() => onChangeStatus(order, "สินค้าจัดส่งสำเร็จ")}>สำเร็จ</button>
                                            </div>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            )
        })
    }
    render() {
        return (
            <div className="container" style={{ minHeight: '79vh', backgroundColor: '#f5f5f5', top: '30' }} >
                <h4 className="text-center pt-2 mb-2">ตรวจสอบรายการสั่งซื้อ</h4>
                <div className="row">
                    {this.showOrders()}
                </div>
            </div>
        )
    }
}

export default withRouter(PaymentMornitor)