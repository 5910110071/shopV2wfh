import React, { Component } from "react";
import App from "./App";
// import Login from "./containers/Login";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
import { connect } from "react-redux";
import { getUser, resetUser } from "./actions";

import Register from "./containers/register/Register";

import { authen } from "./FirebaseConfig";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Main extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      isSignedIn: false,
      user: null,
    };
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      authen.auth.GoogleAuthProvider.PROVIDER_ID,
      authen.auth.FacebookAuthProvider.PROVIDER_ID,
     
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };

  componentDidMount = () => {
    authen.auth().onAuthStateChanged((user) => {
      this.setState({
        isSignedIn: !!user,
        user: user,
      });
      if (user) {
        this.props.getUser(user.uid);
      } else {
        this.props.resetUser();
      }
    });
  };

  render() {
    return (
      <div>
        {this.props.user == null ? (
          <div
            className="container"
            style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
          >
            {this.state.isSignedIn ? (
              <span>
                {/* <div>Signed In!</div> */}
                {/* <button onClick={() => authen.auth().signOut()}>Sign out!</button> */}
                <img
                  className=" card-img-top img-thumbnail mb-2 rounded mx-auto d-block "
                  style={{ width: "100px" }}
                  alt=""
                  src={authen.auth().currentUser.photoURL}
                />
                <h1 className="text-center">
                  ยินดีต้อนรับคุณ {authen.auth().currentUser.displayName}
                </h1>
              </span>
            ) : (
              <div className="justify-content-center ">
                <div className="card">
                  <h2 className="text-center pt-3 mb-3">กรุณาเข้าสู่ระบบ</h2>
                  <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={authen.auth()}
                  />
                </div>
              </div>
            )}
            {this.props.user == null && this.state.user != null && (
              <div>
                <Register
                  user_id={this.state.user.uid}
                  user_image={this.state.user.photoURL}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <App />
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps({ user }) {
  //console.log("mapStateToProps",user)
  return { user };
}
export default connect(mapStateToProps, { getUser, resetUser })(Main);
