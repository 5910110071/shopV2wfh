import {combineReducers} from "redux"
import {reducer as reduxForm} from "redux-form"
import ProductReducer from "./ProductReducer"
import OrderReducer from "./OrderReducer"
import CategoryReducer from "./CategoryReducer"
import UserReducer from "./UserReducer"
import CommentReducer from "./CommentReducer"
import Rating from "./RatingReducer"
import BasketReducer from "./BasketReducer"

const rootRuducer  = combineReducers({
    orders : OrderReducer,
    products : ProductReducer,
    categories : CategoryReducer,
    user : UserReducer,
    comments : CommentReducer,
    rating : Rating,
    basket: BasketReducer,
    form : reduxForm
})
export default rootRuducer