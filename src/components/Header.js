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
    constructor(props) {
        super(props)
    }
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
            <>
                <div className="bg-danger" >
                    <div className="container header title" >
                        <div className="row" >

                            <div className="col-6 text-white d-flex justify-content-start " >
                                {/* <img style={{ height: 50 }} className = "mt-3 mr-3" src="https://img.icons8.com/material-outlined/100/000000/online-shop-2.png" alt="" /> */}
                                <div className = "shadow">
                                    <div className=" text-left mt-4 h3 ml-2 mr-2">{" "}ของฝาก.com</div>

                                </div>
                            </div>

                            {/* <div className="col-4 mt-1 d-flex justify-content-end" >

                                {this.props.showCategoryAndSearch && (
                                    <form className="form-inline my-2 my-lg-0 ">
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

                            </div> */}

                            <div className="col-6 text-right" >
                                <div className="text-white text-right mt-3 title"> <img className="rounded-circle mr-2" style={{ height: 40 }} src={this.props.user.user_image} alt="" />{" "}ชื่อผู้ใช้ : {this.props.user.user_name}</div>
                                <div className="text-right text-black-50 btn" onClick={() => authen.auth().signOut()}>ออกจากระบบ</div>
                                {/* <div className="btn" onClick={() => authen.auth().signOut()}>
                                    <div className="text-black btn-block text-right btn title">
                                        ออกจากระบบ
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" sticky-top bg-danger">
                    <div className="container bg-danger " >
                        <div className="row d-flex justify-content-center">

                            <div className="row text-center h5">
                                <Link className={this.props.menu === "/" ? "nav-link title  mr-2 text-white" : "nav-link title mr-2 text-dark"} to="/">
                                    สินค้า
                                </Link>

                                <Link className={this.props.menu === "/waitPayment" ? "nav-link title  mr-2 text-white" : "nav-link title mr-2 text-dark"} to="/waitPayment">
                                    ตะกร้า
                                </Link>

                                <Link className={this.props.menu === "/paid" ? "nav-link title  mr-2 text-white" : "nav-link title mr-2 text-dark"} to="/paid">
                                    สถานะ
                                </Link>
                            </div>

                            {/* <div className="col-3 text-center h5">

                                {this.props.showCategoryAndSearch && (
                                    <div className="nav-item dropdown ">
                                        <a className="nav-link dropdown-toggle title text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            หมวดหมู่
                                        </a>

                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {this.renderCategories()}
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item title" href="#" onClick={() => this.getProducts()}> สินค้าทั้งหมด</a>
                                        </div>
                                    </div>
                                )}

                            </div> */}

                        </div>







                        {/* <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form> */}

                    </div>
                </div>
            </>



        )
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