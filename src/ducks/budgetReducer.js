import axios from "axios";

const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false
};

export const REQUEST_BUDGET_DATA = "REQUEST_BUDGET_DATA";
export const ADD_PURCHASE = "ADD_PURCHASE";
export const REMOVE_PURCHASE = "REMOVE_PURCHASE";

export const requestBudgetData = () => {
  return {
    type: REQUEST_BUDGET_DATA,
    payload: axios.get("/api/budget-data").then(res => res.data)
  };
};

export const addPurchase = (description, price, category) => {
  return {
    type: ADD_PURCHASE,
    payload: axios
      .post("/api/budget-data/purchase", { description, price, category })
      .then(res => res.data)
  };
};

export const removePurchase = id => {
  return {
    type: REMOVE_PURCHASE,
    payload: axios
      .delete(`/api/budget-data/purchase/${id}`)
      .then(res => res.data)
  };
};
export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${REQUEST_BUDGET_DATA}_PENDING`:
      return { ...state, loading: true };
    case `${REQUEST_BUDGET_DATA}_FULFILLED`:
      return { ...state, loading: false, ...payload };
    case `${ADD_PURCHASE}_PENDING`:
      return { ...state, loading: true };
    case `${ADD_PURCHASE}_FULFILLED`:
      return { ...state, loading: false, purchases: payload };
    case `${REMOVE_PURCHASE}_PENDING`:
      return { ...state, loading: true };
    case `${REMOVE_PURCHASE}_FULFILLED`:
      return { ...state, loading: false, purchases: payload };
    default:
      return state;
  }
}
