import { Action, Reducer } from 'redux';
import * as service from '../services/BugService';


export interface Bug {
    id: number,
    descrip: string
}

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface BugsState {
    bugs: Bug[],
    bug: Bug,
    isLoading: boolean,
    isLoaded: boolean
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface RequestBugsAction { type: 'REQUEST_BUGS'}
export interface ReceiveBugsAction { type: 'RECEIVE_BUGS', bugs: Bug[] }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = RequestBugsAction | ReceiveBugsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    loadBugs: (): any => async (dispatch, getState) => new Promise(async (resolve, reject) => {
        const state = getState().bugs
        if (state.isLoaded || state.isLoading) return resolve ()

        dispatch({ type: 'REQUEST_BUGS' })

        try {
            const bugs = await service.get()
            dispatch({ type: 'RECEIVE_BUGS', bugs })
            resolve()
        } catch {
            //TODO this should set isLoading to false somehow
            reject()
        }
    })
}


export const unloadedState: BugsState = {
    bugs: [],
    bug: {} as Bug,
    isLoading: false,
    isLoaded: false
}
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<BugsState> = (state: BugsState | undefined, incomingAction: Action): BugsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction
    switch (action.type) {
        case 'REQUEST_BUGS':
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            }
        case 'RECEIVE_BUGS':
            return {
                ...state,
                bugs: action.bugs,
                isLoading: false,
                isLoaded: true
            }
        default:
            return state;
    }
};
