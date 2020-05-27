import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Monitor extends Component {
  selectProduct(product) {
    this.props.history.push(
      "product/" + product.product_id + "/+saleman_id"
    );
  }

  showProducts() {
    return (
      this.props.products &&
      Array.isArray(this.props.products) &&
      this.props.products.map((product) => (
        <div
        className="col-md-3 btn"
          key={product.product_id}
          onClick={() => this.selectProduct(product)}
        >
          <div
            className="card bg-white text-black border border-danger"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <img src={product.product_image} className="card-img-top" alt="..." />
            <div className="d-flex justify-content-between mt-2 ml-2 mr-2">
              <h5 className="text-left mt-1">{product.product_name}</h5>
              <h5 className="title text-right text-danger mt-1">
                {product.product_price} บาท
              </h5>
            </div>
          </div>
        </div>
      ))
    );
  }

  render() {
    return (
      <div className="container pt-3 " style={{ minHeight: "79vh", backgroundColor: "#f5f5f5" }}>
        <h2 className="text-center">รายการสินค้า</h2>
        <div className="row justify-content-center ">{this.showProducts()}</div>
      </div>
    );
  }
}

export default withRouter(Monitor);
