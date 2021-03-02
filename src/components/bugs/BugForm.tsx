import React, { useState, useEffect } from 'react';
import {Button, Grid, FormControl, Input, InputLabel, FormGroup} from '@material-ui/core/';
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap'
import {HTMLTable} from "@blueprintjs/core";
import '../../App.css';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { Bug, actionCreators } from '../../store/Bug';
import { ApplicationState } from '../../store';
import { Prompt, useHistory } from 'react-router';
import { Link } from "react-router-dom";

const BugForm = () =>
{
    const dispatch = useDispatch()
    
    const history = useHistory()
        const [bugDescQuery, setBugDescQuery] = useState('')
        const [bugIdQuery, setBugIdQuery] = useState('')
        const [popoverId, setPopoverId] = useState(-1)

        useEffect(() => {        
            dispatch(actionCreators.loadBugs()).catch(() => alert('nope'))
        }, [dispatch]);
    
        const useTypedSelector: TypedUseSelectorHook<ApplicationState> = useSelector
        const bugs: Bug[] = useTypedSelector(state => state.bugs!.bugs)
        const isLoading: boolean = useTypedSelector(state => state.bugs!.isLoading)

        const handleDelete = e => {

            dispatch(actionCreators.removeBug(popoverId)).then(() => {                           
                setPopoverId(-1)
                }).catch(err => console.log(err))
        }


        const bugList = (

            bugs.length > 0 &&
            
            <div>
                <div className='tableContainer'>
                    <HTMLTable interactive bordered>
                        <thead>
                            {bugs.length > 0 && <tr key={'listHead'}>{['Id', 'Description'].map(key => <td style={{fontWeight: 'bolder'}} key={key}><h4>{key}</h4></td>)}</tr>}
                        </thead>
                        <tbody>
                            {bugs && bugs.map((bug, index) => <tr key={`bug_${bug.id}`}>{Object.entries(bug)!.
                            filter(val => bugDescQuery && !bugIdQuery ? bug.descrip.includes(bugDescQuery) : bugIdQuery && !bugDescQuery ? bug.id === Number(bugIdQuery) : true)
                            .map(([key, value], index) => { return <>
                                <td key={`${value}`}>{ key === 'id' ? <Link to={`/bug/${bug.id}`} >{value}</Link> : value}</td>
                                { index + 1 === Object.keys(bug).length &&
                                    <td style={{width: "15%"}}>
                                        <div style={{display: "inline", paddingRight:"5px"}}>
                                        <Link to={`/bug/${bug.id}`} >
                                            <Button className='bug-button'>Edit</Button>
                                        </Link>
                                        </div>
                                        <div style={{display: "inline"}}>
                                        <Button className='bug-button-delete' id={`deleteBtn${bug.id}`} onClick={() => setPopoverId(bug.id)}>
                                            Delete
                                        </Button>
                                        <Popover placement="right" isOpen={popoverId === bug.id} target={`deleteBtn${bug.id}`}>
                                            <PopoverHeader>Sure about that?</PopoverHeader>
                                            <PopoverBody>
                                                <Button onClick={handleDelete}>I'm sure</Button>
                                                <Button onClick={() => setPopoverId(-1)}>Cancel</Button>
                                            </PopoverBody>
                                        </Popover>
                                        </div> 
                                    </td>
                                }
                                </>})}
                                </tr>)}
                        </tbody>
                    </HTMLTable>
                </div>
            </div>
            
        )

        const handleInput = (e) =>
        {
            switch(e.target.id)
            {
                case 'desc_query':
                    setBugDescQuery(e.target.value)
                    break;
                case 'id_query':
                    setBugIdQuery(e.target.value ? Number(e.target.value) : e.target.value)
                    break;
                default:
                    return;
            }
        }

        const handleKey = (e) => {

            if (isNaN(parseInt(e.key)) &&
                !['Enter',
                'Backspace',
                'Control',
                'Shift',
                'Tab',
                'Alt',
                'Home',
                'End',
                'Insert',
                'Delete',
                'F12'].includes(e.key)) e.preventDefault()
        }

        // const handleSubmit = e =>
        // {
        //     e.preventDefault()

        //     switch(e.currentTarget.id)
        //     {
        //         case 'descQuerySubmit':
        //             getBugsByDesc()
        //             break;
        //         case 'idQuerySubmit':
        //             getBugById()
        //             break;
        //         default:
        //             return;
        //     }
        // }

        const getBugsByDesc = () =>
        {
            // to do: either local search instead of db hit or make button to bring back all results
            if (bugDescQuery) {

            }
            //service.get().then(bugs => setBugs(bugs)).catch(err => console.log(err)) : service.query(bugDescQuery).then(bugs => setBugs(bugs)).catch(err => console.log(err))
        }

        const getBugById = () =>
        {
            if (bugIdQuery) {

            }
            //!bugIdQuery ? service.get().then(bugs => setBugs(bugs)).catch(err => console.log(err)) : service.getById(Number(bugIdQuery)).then(bugs => setBugs(bugs)).catch(err => console.log(err))
        }
        
        return (
            <>
                <div style={{paddingTop: '10px'}}>
                    <form>
                        <div style={{padding: '10px', paddingBottom: '30px'}}>
                            <InputLabel htmlFor='id_query'>Find Bug by ID</InputLabel>
                            <Input type='text' id='id_query' value={bugIdQuery} onKeyDown={handleKey} onChange={handleInput}/>
                            {/*<Button type='submit' id='idQuerySubmit' onClick={handleSubmit} variant='outlined' size="small">Submit</Button>>*/}
                            
                        </div>
                    </form>
                    <form>
                        <div style={{padding: '10px'}}>
                            <InputLabel htmlFor='desc_query'>Find Bugs by Description</InputLabel>
                            <Input type='text' id='desc_query' value={bugDescQuery} onChange={handleInput}/>
                            {/*<Button type='submit' variant='outlined' id='descQuerySubmit' onClick={handleSubmit} disableElevation size="small">Submit</Button>*/}
                        </div>
                    </form>
                </div >
                {bugs ? bugList : <div><p>NADA</p></div>}
                <Link to={`/bug/create`} >
                    <Button className='bug-button' variant='outlined' size='small'>
                        New Bug
                    </Button>
                </Link>
            </>
            
        )
    }

export default BugForm