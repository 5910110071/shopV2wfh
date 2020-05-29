import React, { Component } from "react"
import { connect } from "react-redux"
import Header from '../../components/Header3'
import Footer from '../../components/Footer'
import WaitPaymentForm from "../../containers/waitPayment/WaitPaymentForm"
import { basketFetch, basketPost, basketDelete } from '../../actions/'
import { authen } from "../../FirebaseConfig";

class PaymentOrderComfirm extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.basketFetch(this.props.match.params.id)
        }
    }

    onSubmit(formValues) {
        const uploadTask = authen.storage().ref(`images/${formValues.image[0].name}`).put(formValues.image[0]);
        uploadTask.on('state_changed',
            (snapshot) => {
                // // progrss function .... 
                // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // this.setState({ progress });
            },
            (error) => {
                // // error function ....
                // console.log(error);
            },
            () => {
                authen.storage().ref('images').child(formValues.image[0].name).getDownloadURL().then(url => {
                    formValues.image = "test"
                    formValues.Silp = url
                    formValues.status = "ชำระเงินแล้ว"
                    this.props.basketPost(formValues)
                    this.props.basketDelete(this.props.basket._id)
                })
            });
    }
    render() {
        const { formValues, basket } = this.props;

        return (
            <div>
                <Header menu={this.props.match.path} />
                <div className="container" style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }}>
                    <h2 className="text-center pt-3" >แจ้งชำระเงิน</h2>
                    {this.props.basket && <WaitPaymentForm onPaymentSubmit={() => this.onSubmit(formValues)} basket={basket} />}
                </div>
                <Footer />
            </div>
        )

    }
}

function mapStateToProps({ form, orders, basket }) {
    return { formValues: form.paymentForm ? form.paymentForm.values : null, orders, basket }
}

export default connect(mapStateToProps, { basketFetch, basketPost, basketDelete })(PaymentOrderComfirm)