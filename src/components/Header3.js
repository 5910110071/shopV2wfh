import React, { Component } from "react";
import SomeRandomText from "./SomeRandomText";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
    categoriesFetch,
    productsFetchFromCategory,
    productsFetch,
    getUser,
} from "../actions";

import { authen } from "../FirebaseConfig";

class Header3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            headerText: "I am not a fixed header :("
        }
    }
    componentDidMount() {
        this.props.categoriesFetch();
        const header = document.getElementById("myHeader");
        const sticky = header.offsetTop;
        const scrollCallBack = window.addEventListener("scroll", () => {
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky");
                if (this.state.headerText !== "I am fixed :)") {
                    this.setState({
                        headerText: "I am fixed :)"
                    });
                }
            } else {
                header.classList.remove("sticky");
                if (this.state.headerText !== "I am not a fixed header :(") {
                    this.setState({
                        headerText: "I am not a fixed header :("
                    });
                }
            }
        });
        return () => {
            window.removeEventListener("scroll", scrollCallBack);
        };

       
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
                <div className="header bg-danger">
                    <div className="container">
                        <div className="row">

                            {/* ชื่อร้าน */}
                            <div className="col-md-7 col-sm-12 text-left mt-2">
                                <h1 className="text-white">
                                    <img className="" style={{ height: 70 }} src="https://img.icons8.com/material-outlined/100/000000/online-shop-2.png" alt="" />{" "}
                                        eOnlineShop{" "}
                                </h1>
                            </div>

                            {/* ปุ่มออกจากระบบ */}
                            <div className="col-md-5 col-sm-12 text-right  mt-2 d-flex justify-content-end ">
                                <h3 className="text-white mt-2">{this.props.user.user_name}</h3>
                                <div className="btn" onClick={() => authen.auth().signOut()}>
                                    <div className="text-dark btn-block text-right btn title">
                                        ออกจากระบบ
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div id="myHeader" className="header bg-danger">
                    <div className="container d-flex justify-content-center">
                        <div className="row text-white ">

                            {/* รายการ*/}
                            <div className="col-3 text-center  ">
                                <Link className={this.props.menu === "/" ? "nav-link title card mr-2 text-dark" : "nav-link title mr-2 text-dark"} to="/">
                                    สินค้า 
                                </Link>
                            </div>

                            {/* <div className="col-md-4 text-left mt-2">
                                <Link className={ ( this.props.menu === "/waitPayment") || (this.props.menu.includes("paymentNotification")) ? "nav-link title card mr-2" : "nav-link title mr-2" } to="/waitPayment">
                                    ตะกร้า <span className="sr-only">(current)</span>
                                </Link>
                            </div> */}
                            <div className="col-3 text-center ">
                                <Link className={this.props.menu === "/waitPayment" ? "nav-link title card mr-2 text-dark" : "nav-link title mr-2 text-dark"} to="/waitPayment">
                                    ตะกร้า 
                                </Link>
                            </div>

                            <div className="col-3 text-center ">
                                <Link className={ this.props.menu === "/paid" ? "nav-link title card mr-2 text-dark" : "nav-link title mr-2 text-dark" } to="/paid">
                                    สถานะ
                       
                                </Link>
                            </div>

                            <div className="col-3 text-center ">

                                {this.props.showCategoryAndSearch && ( 
                                <li className="nav-item dropdown ">
                                    <a className="nav-link dropdown-toggle title text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        หมวดหมู่สินค้า
                                    </a>

                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {this.renderCategories()}
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item title" href="#" onClick={() => this.getProducts()}> สินค้าทั้งหมด</a>
                                    </div>
                                </li>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                <SomeRandomText />
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
})(Header3);
