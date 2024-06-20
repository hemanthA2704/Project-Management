export const initialRole = null;

export const roleReducer = (state, action) => {
    if(action.type=='USER'){
        return action.payload;
    }
    if(action.type=='CLEAR'){
        return null;
    }
    return state;
}