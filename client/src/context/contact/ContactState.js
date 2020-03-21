import { useReducer } from 'react'
import axios from 'axios';
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import {ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER, UPDATE_CONTACT, FILTER_CONTACTS, CONTACT_ERROR, GET_CONTACT, CLEAR_CONTACT, CLEAR_REQUEST_RESPONSE} from '../types.js'

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        requestResponse: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact

    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/v1/contacts', contact, config)

            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })

        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.message
            })
        }
    }

    // Update Contact

    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            await axios.put(`api/v1/contacts/${contact._id}`, contact, config)
            dispatch({
                type: UPDATE_CONTACT,
                payload: contact
            })

        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.message
            })
        }

    }

    // Get Contact

    const getContacts = async () => {

        try {
            const res = await axios.get('api/v1/contacts')

            dispatch({
                type: GET_CONTACT,
                payload: res.data
            })

        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.message
            })
        }
    }

    // Delete Contact

    const deleteContact = async id => {

        try {
            await axios.delete(`api/v1/contacts/${id}`)
            dispatch({
                type: DELETE_CONTACT, 
                payload: id
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.message
            })
        }
    }

    // Set Current Contact

    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact})
    }

    // Clear Current Contact

    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }

    // Clear Contact

    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACT})
    }
    
    // Clear Contact

    const clearResponseResponse = () => {
        dispatch({type: CLEAR_REQUEST_RESPONSE})
    }

    // Filter Contact

    const filterContact = text => {
        dispatch({type: FILTER_CONTACTS, payload: text})
    }
    
    // Clear Filter

    const clearContact = () => {
        dispatch({type: CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                requestResponse: state.requestResponse,
                addContact,
                deleteContact,
                updateContact,
                clearCurrent,
                setCurrent,
                filterContact,
                clearContact,
                getContacts,
                clearContacts,
                clearResponseResponse
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState

