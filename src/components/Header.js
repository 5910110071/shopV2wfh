import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  categoriesFetch,
  productsFetchFromCategory,
  productsFetch,
  getUser,
} from "../actions";

import { authen } from "../FirebaseConfig";

class Header extends Component {
  componentDidMount() {
    this.props.categoriesFetch();
  }
  renderCategories() {
    return (
      this.props.categories &&
      this.props.categories.map((category) => {
        return (
          <a
            key={category.category_id}
            className="dropdown-item title"
            onClick={() => this.getProductFromCategory(category.category_id)}
            href="#"
          >
            {category.category_name}
          </a>
        );
      })
    );
  }

  getProductFromCategory(id) {
    this.props.productsFetchFromCategory(id);
  }

  getProducts() {
    this.props.productsFetch();
  }

  render() {
    return (
      <div>
        <div className="row bg-danger">
          <div className="container">
            <div className="row">
              <div className="col-md-7 text-left mt-2">
                <h1 className="text-white">
                  <img
                    className=""
                    style={{ height: 70 }}
                    src="https://img.icons8.com/material-outlined/100/000000/online-shop-2.png"
                    alt=""
                  />{" "}
                  eOnlineShop{" "}
                </h1>
              </div>
              <div className="col-md-5 text-right  mt-2 d-flex justify-content-end ">
                <h3 className="text-white mt-2">{this.props.user.user_name}</h3>
                <div className="btn" onClick={() => authen.auth().signOut()}>
                  <div className="text-black btn-block text-right btn title">
                    ออกจากระบบ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-danger " style={{ backgroundColor: "black" }}>
          <div className="col-12 ">
            <nav className="navbar navbar-expand-lg navbar-light  ">
              <div className="container bg-danger">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse  "
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto ">
                    
                    <li className="nav-item active">
                      <Link className={ this.props.menu === "/" ? "nav-link title card mr-2" : "nav-link title mr-2"}to="/">
                        สินค้า <span className="sr-only">(current)</span>
                      </Link>
                    </li>

                    <li className="nav-item active">
                      <Link
                        className={
                          this.props.menu === "/waitPayment" ||
                          this.props.menu.includes("paymentNotification")
                            ? "nav-link title card mr-2"
                            : "nav-link title mr-2"
                        }
                        to="/waitPayment"
                      >
                        ตะกร้า <span className="sr-only">(current)</span>
                      </Link>
                    </li>

                    <li className="nav-item active">
                      <Link
                        className={
                          this.props.menu === "/paid"
                            ? "nav-link title card mr-2"
                            : "nav-link title mr-2"
                        }
                        to="/paid"
                      >
                        ตรวจสอบรายการสั่งซื้อ
                        <span className="sr-only">(current)</span>
                      </Link>
                    </li>

                    {this.props.showCategoryAndSearch && (
                      <li className="nav-item dropdown ">
                        <a
                          className="nav-link dropdown-toggle title "
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          หมวดหมู่สินค้า
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          {this.renderCategories()}
                          <div className="dropdown-divider"></div>
                          <a
                            className="dropdown-item title"
                            href="#"
                            onClick={() => this.getProducts()}
                          >
                            สินค้าทั้งหมด
                          </a>
                        </div>
                      </li>
                    )}
                  </ul>
                  {this.props.showCategoryAndSearch && (
                    <form className="form-inline my-2 my-lg-0">
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn btn-secondary my-2 my-sm-0 text-white title"
                        type="submit"
                      >
                        ค้นหา
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ products, categories, user }) {
  return { products, categories, user };
}

export default connect(mapStateToProps, {
  categoriesFetch,
  productsFetchFromCategory,
  productsFetch,
  getUser,
})(Header);
