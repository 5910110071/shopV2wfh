import React, { Component } from "react";
import { connect } from "react-redux";
import CommentForm from "../../containers/product/CommentForm";
import { commentPost, ratingUpdate } from "../../actions";
import StarRatingComponent from "react-star-rating-component";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      saved: false,
    };
  }
  // จัดการกับดาว
  onStarClick(nextValue, prevValue, name) {
    
    if (nextValue === prevValue && nextValue === 1) this.setState({ rating: 0 });
    else this.setState({ rating: nextValue });
  }

  // บันข้อมูลความคิดเห็นไปยัง DB
  onSubmit(formValues) {
    formValues.user_id = this.props.user.id;
    formValues.user_image = this.props.user.user_image;
    formValues.user_name = this.props.user.user_name;
    formValues.product_id = this.props.product_id;
    formValues.rating = this.state.rating;
    this.props.ratingUpdate(this.props.product_id, formValues);
    this.props.commentPost(formValues, this.props.product_id);
    this.setState({
      rating: 0,
      saved: true,
    });
  }

  render() {
    const { rating } = this.state;
    const { formValues } = this.props;
    return (
      <div className="container">
        <h2 className="mt-3 text-center">แสดงความคิดเห็น</h2>
        <div className="card">
          <div className="row">
            <div className="col-12 text-center mt-3">

              {/* แจ้งเตือนเมื่อกดบันทึก */}
              {this.state.saved && (
                <div className="container">
                  <div className="alert alert-success text-center " role="alert">
                    <h4 className="title col-12 text-right text-center">บันทึกความคิดเห็นแล้ว</h4>
                  </div>
                </div>
              )}

              {/* ให้ดาวสินค้า */}
              <label className="mt-3 text-center title">ระดับคะแนน</label>
              <div>
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={rating}
                  renderStarIcon={() => <h1>★</h1>}
                  onStarClick={this.onStarClick.bind(this)}
                />
              </div>

            </div>

            {/* แสดงฟอร์มกรอกข้อมูลความคิดเห็น */}
            <div className="col-12">
              <CommentForm onCommentSubmit={() => this.onSubmit(formValues)} />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ form, user }) {
  return {
    formValues: form.commentForm ? form.commentForm.values : null, user};
}
export default connect(mapStateToProps, { commentPost, ratingUpdate })(Comment);
