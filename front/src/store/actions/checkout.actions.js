import types from './types';

const addProduct = (product) => ({
  type: types.CHECKOUT_PRODUCT,
  product
});

const checkoutStart = () => ({
  type: types.CHECKOUT_PRODUCT_START
});

const addDiscount = (discount) => ({
  type: types.CHECKOUT_DISCOUNT,
  discount
});

const removeProduct = () => ({
  type: types.CHECKOUT_REMOVE_PRODUCT
});

export const checkoutProduct = (product) => {
  return (dispatch) => {
    dispatch(checkoutStart());
    dispatch(addProduct(product));
  };
};

export const checkoutRemoveProduct = () => {
  return (dispatch) => {
    dispatch(removeProduct());
  };
};

export const checkoutDiscount = (discount) => {
  return (dispatch) => {
    dispatch(addDiscount(discount));
  };
};
