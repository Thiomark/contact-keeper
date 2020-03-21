import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {

    const contactContext = useContext(ContactContext)
    const {addContact, current, clearCurrent, updateContact} = contactContext

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    useEffect(() => {
        if(current){
            setContact(current)
        }else{
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current])

    

    const {name, email, phone, type} = contact


    const onChange = (e) => setContact({...contact, [e.target.name]: e.target.value})

    const onSubmit = (e) => {
        e.preventDefault();
        if(!current){
            if(name){
                addContact(contact)
                setContact({
                    name: '',
                    email: '',
                    phone: '',
                    type: 'personal'
                })
            }
        }else {
            updateContact(contact)
            clearCurrent()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary" >{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input 
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
            />
            <input 
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
            />
            <input 
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input 
                type="radio" 
                name="type" 
                value="personal"
                checked={type === 'personal'}  
                onChange={onChange}
            /> Personal{' '}
            <input 
                type="radio" 
                name="type" 
                value="professional"
                checked={type === 'professional'}  
                onChange={onChange}
            /> Professional{' '}
            <div>
                <ul style={{display: 'flex'}}>
                    <input type="submit" className={`btn btn-block ${current ? 'btn-success' : 'btn-primary'}`} value={current ? 'Update Contact' : 'Add Contact'}/>
                    {current && <input type="button" onClick={() => clearCurrent()} className="btn btn-danger btn-block" value="Cancel" />}
                </ul>
            </div>
        </form>
    )
}

export default ContactForm
