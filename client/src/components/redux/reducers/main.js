import { getProductsreducer } from "./ProductsReducers";
import { combineReducers } from "redux";

const rootreducers = combineReducers({
    getproductsdata: getProductsreducer
});

export default rootreducers;