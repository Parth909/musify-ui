import React, {createContext, useContext, useReducer} from 'react';

export const DataLayerContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => (
    // <App/> is the children
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
)

// Provides a way to grab the data from the data layer
export const useDataLayerValue = () => useContext(DataLayerContext);