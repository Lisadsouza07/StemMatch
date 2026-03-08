import React, { createContext, useContext, useReducer, useEffect } from "react";
import mentorSeedData from "../data/mentors.js";
import userSeedData from "../data/users.js";

// --- INITIAL STATE ---
const initialState = {
  mentors: mentorSeedData,
  pendingRequests: userSeedData.pendingRequests,
  acceptedMatches: [],
  messages: {},
  currentUser: { id: 1, name: "Muna", role: "mentee" },
};


// --- REDUCER ---
function reducer(state, action) {
  switch (action.type) {
    case "LOAD_DATA":
      return { ...state, ...action.payload };

    case "REQUEST_MENTORSHIP":
      return {
        ...state,
        pendingRequests: [...state.pendingRequests, action.payload],
      };

    case "ACCEPT_REQUEST":
      return {
        ...state,
        pendingRequests: state.pendingRequests.filter(
          (r) => r.id !== action.payload.id
        ),
        acceptedMatches: [...state.acceptedMatches, action.payload],
      };

    case "DECLINE_REQUEST":
      return {
        ...state,
        pendingRequests: state.pendingRequests.filter(
          (r) => r.id !== action.payload.id
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

// --- CONTEXT ---
const GlobalContext = createContext();

// --- PROVIDER ---
export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("menmatch-data");
    if (saved) {
      dispatch({ type: "LOAD_DATA", payload: JSON.parse(saved) });
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("menmatch-data", JSON.stringify(state));
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

// --- CUSTOM HOOK ---
export function useGlobal() {
  return useContext(GlobalContext);
}
