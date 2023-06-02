export default (state, action) => {
   switch (action.type) {
      case "LOGIN":
         localStorage.setItem(
            "username",
            JSON.stringify(action.payload.username)
         );
         localStorage.setItem("token", JSON.stringify(action.payload.token));
         return {
            ...state,
            isAuthenticated: true,
            username: action.payload.username,
            token: action.payload.token,
            error: null,
         };
      case "LOGOUT":
         localStorage.removeItem("username");
         localStorage.removeItem("token");
         return {
            ...state,
            isAuthenticated: false,
            username: null,
            token: null,
            error: null,
         };

      case "ERROR":
         localStorage.removeItem("username");
         localStorage.removeItem("token");

      default:
         return state;
   }
};
