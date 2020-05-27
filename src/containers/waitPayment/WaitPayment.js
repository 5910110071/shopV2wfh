import React, { Component } from 'react';
import ShowWaitPayment from '../../containers/waitPayment/ShowWaitPayment'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

class PaymentOrder extends Component {
    render() {
        return (
            <div>
                <Header menu={this.props.match.path} />
                <ShowWaitPayment/>
                <Footer />
            </div>
        )
    }
}
export default PaymentOrder