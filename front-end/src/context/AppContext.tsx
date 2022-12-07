import React, { useReducer } from 'react'
import { Location, User } from '../components/api.types'

interface ReducerState {
  users: User[] | null
  error: string | null
  location: Location[] | null
}

export interface ContextValueTypes extends ReducerState {
  getUsers: () => Promise<void>
  addUser: (body: IFormUser) => Promise<void>
  deleteUser: (id: string | number) => Promise<void>
  getLocation: () => Promise<void>
}

export interface AppReducerPayloadError {
  error: string | null
}

interface AppReducerActionsError {
  type: 'ERROR'
  payload: {
    error: string | null
  }
}

interface AppReducerActions {
  type: 'GET_USERS'
  payload: {
    users: User[] | null
  }
}

interface AppReducerActionsLocation {
  type: 'GET_LOCATION'
  payload: {
    location: Location[] | null
  }
}

export interface IFormUser {
  name: string
  email: string
}

const AppContext = React.createContext<ContextValueTypes | null>(null)

export const useAppState = (): ContextValueTypes => {
  const context = React.useContext(AppContext)
  if (context === null)
    throw Error('Context cannot be used outside of a provider')
  return context
}

export const withAppState = (Component: React.ComponentType) => {
  const AppState: React.FC = (props) => {
    const initialState = {
      users: null,
      error: null,
      location: null
    }

    const reducer = (
      prevState: ReducerState,
      action: AppReducerActions | AppReducerActionsError | AppReducerActionsLocation,
    ) => {
      switch (action.type) {
        case 'GET_USERS':
          return {
            ...prevState,
            error: null,
            users: action.payload.users
          }
        case 'GET_LOCATION':
          return {
            ...prevState,
            error: null,
            location: action.payload.location
          }
        case 'ERROR':
          return {
            ...prevState,
            error: action.payload.error,
          }
        // no default
      }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const getUsers = React.useCallback(async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users/all")
          .then((response) => response.json())

        dispatch({
          type: 'GET_USERS',
          payload: {
            users: response.users
          },
        })
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: { error: 'There was a problem from API' },
        })
      }
    }, [])

    const getLocation = React.useCallback(async () => {
      try {
        const response = await fetch("http://localhost:3001/api/weather/location")
          .then((response) => response.json())
        dispatch({
          type: 'GET_LOCATION',
          payload: {
            location: response.weatherData.dataseries
          },
        })
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: { error: 'There was a problem from API' },
        })
      }
    }, [])

    const addUser = React.useCallback(async (body: IFormUser) => {
      try {
        await fetch("http://localhost:3001/api/users/add", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user: body })
        })
        getUsers()
      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: { error: 'There was a problem from API' },
        })
      }
    }, [])

    const deleteUser = React.useCallback(async (id: string | number) => {
      try {
        await fetch(`http://localhost:3001/api/users/delete/${id}`, {
          method: 'DELETE'
        })
        getUsers()

      } catch (error) {
        dispatch({
          type: 'ERROR',
          payload: { error: 'There was a problem from API' },
        })
      }
    }, [])

    const contextValue: ContextValueTypes = {
      ...state,
      getUsers,
      addUser,
      deleteUser,
      getLocation
    }
    return (
      <AppContext.Provider value={contextValue}>
        <Component {...props} />
      </AppContext.Provider>
    )
  }

  return AppState
}