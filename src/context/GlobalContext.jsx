import React, { createContext, useContext, useReducer } from "react";
import mentorSeedData from "../data/mentors.js";
import userSeedData from "../data/users.js";

const GlobalContext = createContext();

const initialState = {
  mentors: mentorSeedData,
  pendingRequests: userSeedData.pendingRequests, // mentors see these
  sentRequests: [], // mentees see these
  acceptedMatches: [],
  messages: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SEND_REQUEST":
      return {
        ...state,
        sentRequests: [...state.sentRequests, action.payload],
        pendingRequests: [...state.pendingRequests, action.payload],
      };

    case "CANCEL_REQUEST":
      return {
        ...state,
        sentRequests: state.sentRequests.filter(
          (m) => m.id !== action.payload.id
        ),
        pendingRequests: state.pendingRequests.filter(
          (m) => m.id !== action.payload.id
        ),
      };

    case "ACCEPT_REQUEST":
      return {
        ...state,
        pendingRequests: state.pendingRequests.filter(
          (m) => m.id !== action.payload.id
        ),
        acceptedMatches: [...state.acceptedMatches, action.payload],
      };

    case "DECLINE_REQUEST":
      return {
        ...state,
        pendingRequests: state.pendingRequests.filter(
          (m) => m.id !== action.payload.id
        ),
      };

    case "SEND_MESSAGE":
      return {
        ...state,
        messages: {
        ...state.messages,
        [action.payload.matchId]: [
          ...(state.messages[action.payload.matchId] || []),
          action.payload.message,
        ],
      },
    };

    default:
      return state;
  }
}

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => useContext(GlobalContext);

