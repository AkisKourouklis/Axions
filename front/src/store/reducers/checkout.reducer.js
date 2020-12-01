import update from 'immutability-helper';
import types from '../actions/types';

const initialState = {
  product: null,
  discount: null,
  loading: false
};

const checkoutProductStart = (state) => {
  return update(state, {
    loading: { $set: true }
  });
};

const checkoutProduct = (state, action) => {
  return update(state, {
    product: { $set: action.product },
    loading: { $set: false }
  });
};

const checkoutDiscount = (state, action) => {
  return update(state, {
    discount: { $set: action.discount }
  });
};

const removeProduct = (state) => {
  return update(state, {
    product: { $set: null },
    loading: { $set: true },
    discount: { $set: null }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECKOUT_PRODUCT:
      return checkoutProduct(state, action);
    case types.CHECKOUT_PRODUCT_START:
      return checkoutProductStart(state);
    case types.CHECKOUT_DISCOUNT:
      return checkoutDiscount(state, action);
    case types.CHECKOUT_REMOVE_PRODUCT:
      return removeProduct(state);
    default:
      return state;
  }
};

export default reducer;
