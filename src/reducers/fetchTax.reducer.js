import { getTaxMain } from "../services/tax.services";

export default function taxMainReducer(state, action) {
  if (action.type === "fetching") {
    return {
      success: false,
      err: false,
      loading: true,
    };
  }
  if (action.type === "error") {
    return {
      success: false,
      err: true,
      loading: false,
      message: action.message,
    };
  }
  // if (action.type === "post") {
  //   return {
  //       success: false,
  //       err: false,
  //       loading: true
  //     };
  // }
  if (action.type === "success") {
    return {
      success: true,
      err: false,
      loading: false,
    };
  }

  throw Error("Unknown action.");
}
