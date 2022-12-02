
const adminReducer = (state, action) => {

    switch (action.type) {

        case ADMIN_ACTIONS.ERROR: return { ...state, error: true, errorMessage: action.payload };

        
        default: return state;
    }
}

const ADMIN_INITIAL_STATE = {

    error: false,
    errorMessage: "",
}

const ADMIN_ACTIONS = {

    ERROR: 'ERROR',

}

export { adminReducer, ADMIN_INITIAL_STATE, ADMIN_ACTIONS }
