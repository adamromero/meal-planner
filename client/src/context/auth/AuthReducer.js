export default (state, action) => {
   switch (action.type) {
      case "REGISTER":
      case "LOGIN":
         localStorage.setItem("id", JSON.stringify(action.payload._id));
         localStorage.setItem("name", JSON.stringify(action.payload.name));
         localStorage.setItem("email", JSON.stringify(action.payload.email));
         localStorage.setItem("token", JSON.stringify(action.payload.token));

         return {
            ...state,
            isAuthenticated: true,
            id: action.payload._id,
            name: action.payload.name,
            email: action.payload.email,
            message: action.payload.message,
            token: action.payload.token,
            error: null,
         };
      case "LOGOUT":
         localStorage.removeItem("id");
         localStorage.removeItem("name");
         localStorage.removeItem("email");
         localStorage.removeItem("token");

         return {
            ...state,
            isAuthenticated: false,
            id: null,
            name: null,
            email: null,
            token: null,
            error: null,
         };

      case "ERROR":
         localStorage.removeItem("id");
         localStorage.removeItem("name");
         localStorage.removeItem("email");
         localStorage.removeItem("token");

         return {
            ...state,
            id: null,
            name: null,
            email: null,
            token: null,
            error: true,
            message: action.payload.message,
         };

      default:
         return state;
   }
};
