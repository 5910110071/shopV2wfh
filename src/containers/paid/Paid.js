import React, { Component } from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import ShowPaid from "../paid/ShowPaid"
import axios from "axios"

import { ordersPaidFetch, ordersPaymentStatusPut } from '../../actions'

class PaymentMornitor extends Component {
    constructor(props) {
        super(props)
        this.changeStatus = this.changeStatus.bind(this)
    }
    componentDidMount() {
        this.props.ordersPaidFetch(this.props.user.id)
    }

    changeStatus(order, status) {
        order.status = status
        // ส่ง email ไปยังผู้ใช้
        axios.post(process.env.REACT_APP_API_URL+"/mail", { name: "test9", email: "chanon.5613@gmail.com", message: status }).then(
            res => {
            }
        )
        this.props.ordersPaymentStatusPut(order._id, order, this.props.user.id)
    }

    render() {
        return (
            
            <div>
                <Header menu={this.props.match.path} />
                <ShowPaid
                    orders={this.props.orders}
                    onChangeStatus={this.changeStatus}
                    user = {this.props.user} />
                <Footer />
            </div>
        )
    }
}

function mapStateToprops({ orders, user }) {
    return { orders, user }
}

export default withRouter(connect(mapStateToprops, { ordersPaidFetch , ordersPaymentStatusPut })(PaymentMornitor))