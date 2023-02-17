import { useReducer, useContext, createContext } from "react";
import { reducer } from "./reducer";
import axios from 'axios';



const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    location: '',
    showSidebar: true,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    status: 'pending',
    jobType: "full-time",
    jobLocation: user ? JSON.parse(user).location : '',
    jobTypeOptions: ['full-time', 'remote', 'internship'],
    statusOptions: ['interview', 'declined', 'pending'],
    jobs: [],
    totalJobs: 0,
    numOfPages: 0,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']



}

const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios.create({
        baseURL: 'api/v1/',
    })
    // response interceptor
    authFetch.interceptors.request.use(
        (config) => {
            const token = state.token
            if (!config.headers) {
                config.headers = {}
            }
            config.headers.Authorization = `Bearer ${token}`
            //   config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    // response interceptor
    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            console.log(error.response)
            if (error.response.status === 401) {
                logOut()
            }
            return Promise.reject(error)
        }
    )


    const displayAlert = () => {
        dispatch({ type: 'SHOW_ALERT' })
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: 'CLEAR_ALERT' })
        }, 3000)
    }
    const addUsertolocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: 'REGISTER_USER_BEGIN' })
        try {
            const response = await axios.post('api/v1/auth/register',
                currentUser)
            const { user, token, location } = response.data
            // console.log(response);
            dispatch({
                type: 'REGISTER_USER_SUCCESS',
                payload: { user, token, location, },
            })
            // save to local storage
            addUsertolocalStorage({ user, token, location })

        } catch (error) {
            // console.log(error);
            dispatch({
                type: 'REGISTER_USER_ERROR',
                payload: { msg: error.response.data.msg }
            })

        }
        clearAlert()
    }
    const loginUser = async (currentUser) => {
        dispatch({ type: 'LOGIN_USER_BEGIN' })
        try {
            const response = await axios.post('api/v1/auth/login',
                currentUser)
            const { user, token, location } = response.data
            // console.log(response);
            dispatch({
                type: 'LOGIN_USER_SUCCESS',
                payload: { user, token, location, },
            })
            // save to local storage
            addUsertolocalStorage({ user, token })

        } catch (error) {
            // console.log(error);
            dispatch({
                type: 'LOGIN_USER_ERROR',
                payload: { msg: error.response.data.msg }
            })

        }
        clearAlert()
    }
    const toggleSidebar = () => {
        dispatch({ type: 'SHOW_SIDE_BAR' })
    }
    const logOut = () => {
        dispatch({ type: 'LOGOUT_USER' })
        removeUserFromLocalStorage()
    }
    const updateUser = async (currentUser) => {
        dispatch({ type: 'UPDATE_USER_BEGIN' })
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser)
            const { user, location, token } = data
            dispatch({
                type: 'UPDATE_USER_SUCSSES',
                payload: { user, location, token }
            })
            addUsertolocalStorage({ user, location, token: initialState.token })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: 'UPDATE_USER_ERROR',
                    payload: { msg: error.response.data.msg }
                })
            }

        }

        clearAlert()

    }
    // Handle change in the state
    const handleChange = ({ name, value }) => {
        dispatch({
            type: 'HANDLE_CHANGE',
            payload: {
                name,
                value
            }
        })
    }
    // Clear Values function for Clear button in the form 
    const clearValues = async () => {
        dispatch({ type: 'CLEAR_VALUES' })

    }

    // Create a job function which sends request to the server with axios

    const createJob = async () => {
        dispatch({ type: 'CREATE_JOB_BEGIN' })
        try {
            const { position, company, jobLocation, jobType, status } = state
            await authFetch.post('job', {
                position,
                company,
                jobLocation,
                jobType,
                status,
                token
            })
            dispatch({
                type: 'CREATE_JOB_SUCCESS'
            })
            dispatch({ type: 'CLEAR_VALUES' })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({ type: 'CREATE_JOB_ERROR', payload: { msg: error.response.data.msg } })
        }

    }
    const getAllJobs = async () => {

        const { search, searchStatus, searchType, sort, page } = state
        let url = `/job?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
        if (search) {
            url = url + `&search=${search}`
        }
        dispatch({
            type: "GET_ALL_JOBS_BEGIN",
        })
        try {
            const response = await authFetch.get(url)
            const { jobs, totalJobs, numOfPages, } = response.data
            // console.log(response);
            dispatch({
                type: "GET_ALL_JOBS_SUCCESS",
                payload: { jobs, totalJobs, numOfPages, }
            })

        } catch (error) {
            console.log(error.response);
            // logOut()

        }
        clearAlert()
    }
    const setEditJob = (id) => {
        dispatch({
            type: "SET_EDIT_JOB",
            payload: { id }
        })
        console.log("job", id)
    }
    const editJob = async () => {
        dispatch({ type: "EDIT_JOB_BEGIN " })
        try {
            const { position, company, jobLocation, jobType, status } = state
            await authFetch.patch(`job/${state.editJobId}`, {
                position,
                company,
                jobLocation,
                jobType,
                status
            })
            dispatch({ type: "EDIT_JOB_SUCCESS" })
            clearValues()
        } catch (error) {
            if (error.response.staus === 401) return
            dispatch({
                type: "EDIT_JOB_ERROR",
                payload: { msg: error.response.data.msg }

            })
        }
        clearAlert()
    }
    const deleteJob = async (jobId) => {
        dispatch({ type: "DELETE_JOB_BEGIN" })
        try {
            await authFetch.delete(`job/${jobId}`)
            getAllJobs()
        } catch (error) {

            logOut()
        }
    }
    const showStats = async () => {
        dispatch({ type: "SHOW_STATS_BEGIN" })
        try {
            const { data } = await authFetch(`job/stats`)
            dispatch({
                type: "SHOW_STATS_SUCCESS",
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications
                }
            })
        } catch (error) {

            logOut()
        }
    }
    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" })
    }
    const changePage = (page) => {
        dispatch({
            type: "CHANGE_PAGE",
            payload: page
        })
    }


    return (
        <AppContext.Provider value={{
            ...state,
            displayAlert,
            clearAlert,
            registerUser,
            loginUser,
            toggleSidebar,
            logOut,
            updateUser,
            handleChange,
            clearValues,
            createJob,
            getAllJobs,
            setEditJob,
            deleteJob,
            editJob,
            showStats,
            clearFilters,
            changePage

        }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }