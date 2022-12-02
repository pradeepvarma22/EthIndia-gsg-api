
const walletReducer = (state, action) => {

    switch (action.type) {
        case WALLET_ACTIONS.SET_WALLET_ADDRESS: return { ...state, walletAddress: action.payload, isWalletConnected: true };
        case WALLET_ACTIONS.PROVIDER: return { ...state, provider: action.payload };
        case WALLET_ACTIONS.ERROR: return { ...state, error: true, errorMessage: action.payload };
        case WALLET_ACTIONS.SET_ADMIN: return { ...state, isAdmin: action.payload };
        case WALLET_ACTIONS.SET_WALLET_ID: return {...state, walletId: action.payload};

        default: return state;
    }
}

const WALLET_INITIAL_STATE = {
    walletAddress: "",
    walletId: 0,
    isWalletConnected: false,
    provider: {},
    error: false,
    errorMessage: "",
    isAdmin: false
}

const WALLET_ACTIONS = {
    SET_WALLET_ADDRESS: 'SET_WALLET_ADDRESS',
    PROVIDER: 'PROVIDER',
    ERROR: 'ERROR',
    SET_ADMIN: 'SET_ADMIN',
    SET_WALLET_ID: 'SET_WALLET_ID'
}

export { walletReducer, WALLET_INITIAL_STATE, WALLET_ACTIONS }
