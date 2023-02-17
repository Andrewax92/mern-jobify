import { initialState } from "./appContext"
export const reducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values!'
            }
        case 'CLEAR_ALERT':
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: ''
            }
        case 'REGISTER_USER_BEGIN':
            return {
                ...state, isLoading: true,
            }
        case 'REGISTER_USER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: 'User successfully created',
                alertType: 'success',
                user: action.payload.user,
                token: action.payload.token,
                jobLocation: action.payload.location
            }
        case 'REGISTER_USER_ERROR':
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        case 'LOGIN_USER_BEGIN':
            return {
                ...state, isLoading: true
            }
        case 'LOGIN_USER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: 'User successfully loggedIN',
                alertType: 'success',
                user: action.payload.user,
                token: action.payload.token,
                jobLocation: action.payload.location
            }
        case 'LOGIN_USER_ERROR':
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        case 'SHOW_SIDE_BAR':
            return {
                ...state,
                showSidebar: !state.showSidebar
            }
        case 'LOGOUT_USER':
            return {
                ...initialState,
                user: null,
                token: null,
                location: '',
                jobLocation: '',
            }
        case 'UPDATE_USER_BEGIN':
            return {
                ...state,
                isLoading: true,
            }
        case 'UPDATE_USER_SUCSSES':
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: 'User successfully updated',
                alertType: 'success',
                user: action.payload.user,
                token: action.payload.token,
                jobLocation: action.payload.location
            }
        case 'UPDATE_USER_ERROR':
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        case 'HANDLE_CHANGE':
            return {
                ...state, page: 1,
                [action.payload.name]: action.payload.value,
            }
        case 'CLEAR_VALUES':
            const initialStateValues = {
                isEditing: false,
                editJob: '',
                position: '',
                company: '',
                status: 'pending',
                jobType: "full-time",
                jobLocation: state.user.location,
            }
            return {
                ...state, ...initialStateValues
            }
        case 'CREATE_JOB_BEGIN':
            return {
                ...state, isLoading: true,
            }
        case 'CREATE_JOB_SUCCESS':
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertText: 'New JOB Created',
                alertType: 'success',
            }
        case 'CREATE_JOB_ERROR':
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        case "GET_ALL_JOBS_BEGIN":
            return {
                ...state, isLoading: true,
            }
        case "GET_ALL_JOBS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                jobs: action.payload.jobs,
                totalJobs: action.payload.totalJobs,
                numOfPages: action.payload.numOfPages,
            }
        case "SET_EDIT_JOB":
            const job = state.jobs.find((job) => job._id === action.payload.id)
            const { _id, position, company, jobLocation, jobType, status } = job
            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status
            }
        case "DELETE_JOB_BEGIN":
            return {
                ...state, isLoading: true
            }
        case "EDIT_JOB_BEGIN":
            return {
                ...state, isLoading: true
            }
        case "EDIT_JOB_SUCCESS":
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Job Updated'
            }
        case "SHOW_STATS_BEGIN":
            return {
                ...state, isLoading: true, showAlert: false
            }
        case "SHOW_STATS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                stats: action.payload.stats,
                monthlyApplications: action.payload.monthlyApplications
            }
        case "CLEAR_FILTERS":
            return {
                ...state,
                search: "",
                searchStatus: 'all',
                searchType: 'all',
                sort: 'latest',
            }
        case "CHANGE_PAGE":
            return {
                ...state, page: action.payload
            }
        default:
            return state
    }

}