import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    detailDoctor: [],
    // markdown: [],
};

const adminReducer = (state = initialState, action) => {
    let copyState = { ...state };
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState.genders = action.data;
            copyState.isLoadingGender = false;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            copyState.isLoadingGender = false;
            copyState.genders = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_POSITION_START:
            return {
                ...copyState,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState.positions = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            copyState.positions = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState.roles = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            copyState.roles = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            copyState.users = action.users;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_USER_FAILED:
            copyState.users = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            copyState.topDoctors = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            copyState.topDoctors = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            copyState.allDoctors = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            copyState.allDoctors = [];
            return {
                ...copyState,
            };
        case actionTypes.FETCH_DETAIL_INFOR_DOCTOR_SUCCESS:
            copyState.detailDoctor = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_DETAIL_INFOR_DOCTOR_FAILED:
            copyState.detailDoctor = [];
            return {
                ...copyState,
            };
        // case actionTypes.FETCH_MARKDOWN_SUCCESS:
        //     copyState.mardown = action.data;
        //     return {
        //         ...copyState,
        //     };
        // case actionTypes.FETCH_MARKDOWN_FAILED:
        //     copyState.mardown = [];
        //     return {
        //         ...copyState,
        //     };
        default:
            return copyState;
    }
};

export default adminReducer;
