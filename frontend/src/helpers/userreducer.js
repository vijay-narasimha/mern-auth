
export default (state = {user:null}, action) => {
  switch (action.type) {
    case 'LOGIN': {
    localStorage.setItem('user',JSON.stringify({...action.payload}))
      return { ...state,  user: action.payload };
      
    }
    case 'LOGOUT':
        localStorage.clear()
      return { ...state,user: null };
    default:
      return state;
  }
};
