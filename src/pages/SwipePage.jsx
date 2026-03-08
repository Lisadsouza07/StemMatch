import React, { useState } from "react";
import MentorCard from "../components/MentorCard.jsx";
import FullProfileSheet from "../components/FullProfileSheet.jsx";
import SwipeControls from "../components/SwipeControls.jsx";
import MatchToast from "../components/MatchToast.jsx";
import { useGlobal } from "../context/GlobalContext.jsx";
import EmptyState from "../components/EmptyState.jsx";

export default function SwipePage() {
  const { state, dispatch } = useGlobal();
  const mentors = state.mentors;

  const [index, setIndex] = useState(0);
  const [expandedMentor, setExpandedMentor] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const currentMentor = mentors[index];

  const handleNext = () => {
    if (index < mentors.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleRequest = () => {
    dispatch({
      type: "SEND_REQUEST",
      payload: currentMentor,
    });

    setShowToast(true);
    handleNext();
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "20px 0 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#F0F7FF",
      }}
    >
      {currentMentor ? (
        <>
          <MentorCard
            mentor={currentMentor}
            onExpand={() => setExpandedMentor(currentMentor)}
            onSwipeLeft={handleNext}
            onSwipeRight={handleRequest}
          />

          <SwipeControls onSkip={handleNext} onRequest={handleRequest} />
        </>
      ) : (
        <EmptyState onReset={() => setIndex(0)} />
      )}

      <FullProfileSheet
        mentor={expandedMentor}
        onClose={() => setExpandedMentor(null)}
        onRequest={() => {
          handleRequest();
          setExpandedMentor(null);
        }}
      />

      <MatchToast
        show={showToast}
        mentorName={currentMentor?.name}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

