import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS } from "../constants/userConstants";

const userSigninReducers = (state ={}, action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return{loading: true };
        case USER_SIGNIN_SUCCESS:
            return {
                // ...state,
                loading:false,
                userInfo: action.payload
            }
        case USER_SIGNIN_FAIL:
            return {
                loading:false,
                error: action.payload
            }
        default: return state;
    }
}

const userRegisterReducers=(state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
// function userRegisterReducers(state = {}, action) {
//     debugger
//     switch (action.type) {
//       case USER_REGISTER_REQUEST:
//         return { loading: true };
//       case USER_REGISTER_SUCCESS:
//         return { loading: false, userInfo: action.payload };
//       case USER_REGISTER_FAIL:
//         return { loading: false, error: action.payload };
//       default: return state;
//     }
//   }
export {userSigninReducers, userRegisterReducers};

// function userSigninReducer(state = {}, action) {
//   switch (action.type) {
//     case USER_SIGNIN_REQUEST:
//       return { loading: true };
//     case USER_SIGNIN_SUCCESS:
//       return { loading: false, userInfo: action.payload };
//     case USER_SIGNIN_FAIL:
//       return { loading: false, error: action.payload };
//     case USER_LOGOUT:
//       return {};
//     default: return state;
//   }
// }