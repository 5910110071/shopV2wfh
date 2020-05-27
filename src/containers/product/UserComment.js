import React, { Component } from 'react';
import { commentFetch } from '../../actions'
import { connect } from "react-redux"
import StarRatingComponent from 'react-star-rating-component';

class UserComment extends Component {

    componentDidMount() {
        this.props.commentFetch(this.props.product_id)
    }

    renderComment() {
        return (
            this.props.comments && this.props.comments.map(comment => {
                return (
                    <div key = {comment._id}className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="card mb-3" Style="max-width: 540px;">
                            <div className="row no-gutters">
                                <div className="col-md-3">
                                    <img src={comment.user_image} className="card-img mt-3 ml-3" alt="..." Style="width: 70px;" />
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">{comment.user_name}</h5>
                                        <p className="card-text">{comment.comment}</p>
                                        <div className="text-right">
                                            < StarRatingComponent
                                                name="rate1"
                                                starCount={5}
                                                value={comment.rating}
                                                renderStarIcon={() => <h2>★</h2>}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className="container" >
                <h2 className="text-center">ความคิดเห็น</h2>

                <div className="row">
                    {this.renderComment()}
                </div>
                
            </div>
        )
    }
}
function mapStateToProps({ comments }) {
    return { comments }
}
export default connect(mapStateToProps, { commentFetch })(UserComment)