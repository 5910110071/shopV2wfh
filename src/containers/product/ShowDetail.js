import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import {  ratingFetch, basketConfirm, basketFetch, } from "../../actions";

class ShowDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      confirm: false,
      quantity: 1,
      overflow: false,
    };
  }

  componentDidMount() {
    this.props.ratingFetch(this.props.product_id);
    this.props.basketFetch(this.props.user.id);
  }

  increaseQuantity(product) {
    if (this.state.quantity < product.product_inventory)
      this.setState({
        quantity: this.state.quantity + 1,
      });
  }

  decreaseQuantity() {
    if (this.state.quantity > 1)
      this.setState({
        quantity: this.state.quantity - 1,
      });
  }

  confirmOrder(product, saleman_id) {
    if (this.props.basket) {
      /*มีตระกร้า*/
      let findOrder = this.props.basket.orders.find((order) => order.product.product_id === product.product_id);
      if (findOrder) {
        /*มีตระกร้า มีสินค้าอยู่ในตระกร้า*/
        if (findOrder.quantity + this.state.quantity > findOrder.product.product_inventory) {
          /*ตรวจสอบจำนวนสินค้าในตระกร้ากับคลังสินค้า*/
          this.setState({
            overflow: true,
            quantity: 1
          });
        }
        else {
          this.props.basketConfirm(product, saleman_id, this.props.user, this.state.quantity);
          this.setState({
            confirm: true,
            quantity: 1
          });
        }
      }
      else {
        /*มีตระกร้า ไม่มีสินค้าอยู่ในตระกร้า*/
        this.props.basketConfirm(product, saleman_id, this.props.user, this.state.quantity);
        this.setState({
          confirm: true,
          quantity: 1
        });
      }
    }
    else {
      /*ไม่มีตระกร้า ไม่เคยซื้อสินค้า*/
      this.props.basketConfirm(product, saleman_id, this.props.user, this.state.quantity);
      this.setState({
        confirm: true,
        quantity: 1
      });
    }
  }

  render() {
    const { products } = this.props;
    return (
      <div className="container">
        <h2 className="text-center pt-3 mb-3">รายละเอียดสินค้า</h2>
        <div className="card mb-3 ">
          <div className="row no-gutters">

            {/* แจ้งเตือนเพิ่มสินค้าลงในตะกร้า*/}
            {this.state.confirm && (
              <div className="container mt-3">
                <div className="alert alert-success text-center " role="alert">
                  <h4 className="title col-12 text-right text-center">
                    ได้ทำการเพิ่มสินค้าลงตะกร้าแล้วกรุณาตรวจสอบที่{" "}
                    <Link to="/waitPayment">ตะกร้าสินค้า </Link>
                  </h4>
                </div>
              </div>
            )}

            {/* แจ้งเตือนจำนวนสินค้าไม่เพียงพอ*/}
            {this.state.overflow && (
              <div className="container mt-3">
                <div className="alert alert-danger text-center " role="alert">
                  <h4 className="title col-12 text-right text-center">
                    จำนวนสินค้าไม่เพียงพอ{" "}
                    <Link to="/waitPayment">ตะกร้าสินค้า </Link>
                  </h4>
                </div>
              </div>
            )}

            {/* ส่วนเเสดงรูปภาพสินค้า*/}
            <div className="col-md-5">
              <img src={products.product_image} className="card-img" alt="" />
            </div>

            {/* ส่วนเเสดงรายละเอียดการสั่งซื้อ */}
            <div className="col-md-7">
              <div className="card-body">
                <h3 className="card-title">{products.product_name}</h3>
                <p className="card-text">รายละเอียดสินค้า : {products.product_detail}</p>
                <p className="card-text">จำนวนที่เหลือ : {products.product_inventory}</p>
                <p className="card-text">ราคา : {products.product_price} บาท</p>
              </div>

              {/* ส่วนของปุ่มเพิ่มลดจำนวนการสั่งซื้อ */}
              <div className="container input-group d-flex justify-content-end   ">
                <h5 className="text-right mr-2">จำนวน : </h5>

                <span className="input-group-btn ">
                  <button type="button" className="quantity-left-minus btn btn-secondary btn-number" data-type="minus" data-field="" onClick={() => this.decreaseQuantity()}>
                    <span className="glyphicon glyphicon-minus">-</span>
                  </button>
                </span>

                <input type="text" id="quantity" name="quantity" className="form-control input-number col-1 text-center" value={this.state.quantity} />

                <span className="input-group-btn">
                  <button type="button" className="quantity-right-plus btn btn-secondary btn-number mr-2" data-type="plus" data-field="" onClick={() => this.increaseQuantity(products)}>
                    <span className="glyphicon glyphicon-plus">+</span>
                  </button>
                </span>

              </div>

              {/* ส่วนของปุ่มเพิ่มลงตระกร้าสินค้า */}
              <div className=" mr-4 mt-3 d-flex justify-content-end">
                <button className="btn btn-danger" onClick={() => this.confirmOrder(products, this.props.saleman_id)}>เพิ่มลงตะกร้า{" "}</button>
              </div>

              {/* ระดับคะแนนรวมของสินค้า */}
              <div className="d-flex justify-content-center">
                {this.props.rating != null && (
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={this.props.rating.average}
                    renderStarIcon={() => <h1>★</h1>}
                  />
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ rating, user, basket }) {

  return { rating, user, basket };
}

export default withRouter(connect(mapStateToProps, { ratingFetch, basketConfirm, basketFetch, })(ShowDetail));
