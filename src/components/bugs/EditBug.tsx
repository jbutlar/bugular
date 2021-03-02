import React, { useState, useEffect } from 'react';
import * as service from '../../services/BugService';
import { useParams } from 'react-router-dom'
import {OutlinedInput, Button, InputLabel} from '@material-ui/core/';
import {Spinner} from 'reactstrap'
//import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { Bug, actionCreators } from '../../store/Bug';
//import { ApplicationState } from '../../store';
//import { useHistory } from 'react-router';
//import {Link} from 'react-router-dom';

const inputStyle = {
   padding: "15px"
}


const EditBug = () => {
    // to-do setup redux
    const { id } = useParams();    
    //const dispatch = useDispatch()
    //const history = useHistory()
    const [bugDesc, setBugDesc] = useState('')
    const [currentBug, setCurrentBug] = useState({} as Bug)
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        
        if (!isNaN(id))
        {
            setIsLoading(true)
            service.getById(id).then(bug => { 
                                                setCurrentBug(bug as Bug);  
                                                setBugDesc(bug.id ? bug.descrip : '');
                                                setIsLoading(false)
                                             }).catch(err => console.log(err))
        }
        setIsLoading(false)
    }, []);
    
    const handleInput = e => {
        switch(e.target.id)
        {
            case 'bugDesc': 
                setBugDesc(e.target.value)
                break;
        }
    }

    const handleSave = e =>
    {
        //to-do: move this to redux
        setIsLoading(true)
        
        !isNaN(id) ? service.put({id: currentBug.id, descrip: bugDesc} as Bug).then(bug => setCurrentBug(bug as Bug)).catch(err => alert('no such luck')) 
        : service.post({id: -1, descrip: bugDesc} as Bug).then(bug => setCurrentBug(bug as Bug)).catch(err => alert('no such luck'))

        setIsLoading(false)
        
    }


    return (
    
        isLoading ? <Spinner/> : <><div><p style={{fontSize: "60px"}}>{`What to know about ${currentBug.id ? `bug ${currentBug.id}` : 'this bug'}`}</p></div>
        
        <InputLabel style={inputStyle} htmlFor='bugDesc'>Description:</InputLabel>
        <OutlinedInput
          id="bugDesc"
          multiline
          rowsMax={4}
          rows={4}
          value={bugDesc}
          onChange={handleInput}
          color="secondary"
        />
        <Button className='bug-button' variant='outlined' size='small' onClick={handleSave}>
            Save
        </Button></>
    
    )
}

export default EditBug