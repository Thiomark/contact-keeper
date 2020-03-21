import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER, UPDATE_CONTACT, FILTER_CONTACTS, CONTACT_ERROR, GET_CONTACT, CLEAR_CONTACT, CLEAR_REQUEST_RESPONSE} from '../types.js'

const contactReducer = (state, action) => {
    switch (action.type) {
        case GET_CONTACT: 
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                requestResponse: {
                    message: 'Contact Added',
                    type: 'success'
                },
                loading: false
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                requestResponse: {
                    message: 'Contact Deleted',
                    type: 'success'
                },
                loading: false
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
                requestResponse: {
                    message: 'Contact Deleted',
                    type: 'success'
                },
                loading: false
            }
        case CLEAR_CONTACT:
            return {
                ...state,
                contacts: null,
                current: null,
                filtered: null,
                error: null
            }
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex)
                })
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null 
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null 
            }
        case CLEAR_REQUEST_RESPONSE:
            return {
                ...state,
                requestResponse: null
            }
        case SET_CURRENT :
            return {
                ...state,
                current: action.payload
            }
        case CONTACT_ERROR :
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default contactReducer
