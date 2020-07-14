import React, { useState, useEffect } from 'react';
import * as service from '../services/BugService';
import {Button, FormControl, Input, InputLabel, FormGroup} from '@material-ui/core/' //TableHead, TableBody, TableRow, TableCell, 
import {Table, Cell, Column, ColumnHeaderCell} from "@blueprintjs/table"
import {HTMLTable} from "@blueprintjs/core"
import "@blueprintjs/table/lib/css/table.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "normalize.css";
import '../App.css';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { Bug, actionCreators } from '../store/Bug'
import { ApplicationState } from '../store'
import { Prompt, useHistory } from 'react-router'

const BugForm = () =>
{
    const dispatch = useDispatch()
    
    const history = useHistory()
        const [bugDescQuery, setBugDescQuery] = useState('')
        const [bugIdQuery, setBugIdQuery] = useState('')
        //const [bugs, setBugs] = useState([]);

        useEffect(() => {        
            dispatch(actionCreators.loadBugs()).catch(() => alert('nah son'))
        }, [dispatch]);
    
        const useTypedSelector: TypedUseSelectorHook<ApplicationState> = useSelector
        const bugs: Bug[] = useTypedSelector(state => state.bugs!.bugs)
        const isLoading: boolean = useTypedSelector(state => state.bugs!.isLoading)
        

        // useEffect(() => {

        //     service.get().then(bugs => setBugs(bugs)).catch(err => console.log(err))

        // }, []);

        //const tableClasses = 'bp3-html-table bp3-html-table-bordered bp3-interactive'

        const bugList = (


            bugs.length > 0 &&
            <div>
                <div className='tableContainer'>
                <HTMLTable interactive bordered style={{width: '20%'}}>
                    <thead>
                        {bugs.length > 0 && <tr key={'listHead'}>{['Id', 'Description'].map(key => <td style={{fontWeight: 'bolder'}} key={key}><h4>{key}</h4></td>)}</tr>}
                    </thead>
                    <tbody>
                        {bugs && bugs.map((bug, index) => <tr key={`bug_${bug.id}`}>{Object.values(bug)!.filter(val => bugDescQuery && !bugIdQuery ? bug.descrip.includes(bugDescQuery) : bugIdQuery && !bugDescQuery ? bug.id === Number(bugIdQuery) : true).map(value => <td key={`${value}`}>{value}</td>)}</tr>)}
                    </tbody>
                </HTMLTable>
                </div>
                {/*<br/>
                <div className='tableContainer'>
                <Table numRows={bugs.length} defaultColumnWidth={(window.innerWidth*.70 - 50)/Object.keys(bugs[0]).length} defaultRowHeight={60} enableRowHeader={false}>
                    {Object.keys(bugs[0]).map((key, index) => {

                    return <Column name={key} columnHeaderCellRenderer={index => <ColumnHeaderCell style={{}} name={key}><p style={{borderTop: '1px solid LightGrey', paddingLeft: '10px'}}>{`Column ${index+1}`}</p></ColumnHeaderCell>} cellRenderer={(index) => <Cell style={{}}>{bugs[index][key]}</Cell> } /> 
                 })}
                </Table>
                </div>*/}
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

        const handleSubmit = e =>
        {

            e.preventDefault()

            switch(e.currentTarget.id)
            {
                case 'descQuerySubmit':
                    getBugsByDesc()
                    break;
                case 'idQuerySubmit':
                    getBugById()
                    break;
                default:
                    return;
            }

        }

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
            <div style={{width: 4000}}>
                <form>
                    <div style={{padding: '10px', paddingBottom: '30px'}}>
                        <InputLabel htmlFor='id_query'>Find Bug by ID</InputLabel>
                        <Input type='text' id='id_query' value={bugIdQuery} onKeyDown={handleKey} onChange={handleInput}/>
                        <Button type='submit' id='idQuerySubmit' onClick={handleSubmit} variant='outlined' size="small">Submit</Button>
                        
                    </div>
                </form>
                <form>
                    <div style={{padding: '10px'}}>
                        <InputLabel htmlFor='desc_query'>Find Bugs by Description</InputLabel>
                        <Input type='text' id='desc_query' style={{width: "10%"}} value={bugDescQuery} onChange={handleInput}/>
                        <Button type='submit' variant='outlined' id='descQuerySubmit' onClick={handleSubmit} disableElevation size="small">Submit</Button>
                    </div>
                </form>
            </div >
            {bugs ? bugList : <div><p>NADA</p></div>}
            <br></br>
            <br></br>
            </>
        )
    }

export default BugForm