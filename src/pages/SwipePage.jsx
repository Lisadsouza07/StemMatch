import React, { useState, useEffect } from "react";
import MentorCard from "../components/MentorCard.jsx";
import FullProfileSheet from "../components/FullProfileSheet.jsx";
import SwipeControls from "../components/SwipeControls.jsx";
import MatchToast from "../components/MatchToast.jsx";
import { useGlobal } from "../context/GlobalContext.jsx";
import { useFirebaseAuth } from "../config/FirebaseAuthContext.jsx";
import { getAllUsers } from "../config/authService.js";
import EmptyState from "../components/EmptyState.jsx";
import mentorSeedData from "../data/mentors.js";

export default function SwipePage() {
  const { state, dispatch } = useGlobal();
  const { user } = useFirebaseAuth();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);
  const [expandedMentor, setExpandedMentor] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Fetch mentors from Firebase + combine with seed data
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        
        // Get Firebase mentors
        const allUsers = await getAllUsers();
        const firebaseMentors = allUsers.filter(
          (mentor) =>
            mentor.role === "mentor" &&
            mentor.uid !== user?.uid &&
            !state.sentRequests.some((req) => req.uid === mentor.uid)
        );
        
        // Combine with seed data mentors
        const combinedMentors = [
          ...mentorSeedData,
          ...firebaseMentors.filter(
            fbMentor => !mentorSeedData.some(seed => seed.name === fbMentor.name)
          )
        ];
        
        setMentors(combinedMentors);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        // Fallback to seed data only
        setMentors(mentorSeedData);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchMentors();
    }
  }, [user?.uid, state.sentRequests]);

  const currentMentor = mentors[index];

  const handleNext = () => {
    if (index < mentors.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleRequest = () => {
    dispatch({
      type: "SEND_REQUEST",
      payload: {
        sender: user,
        recipient: currentMentor,
      },
    });

    setShowToast(true);
    handleNext();
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EEF4FF",
          fontFamily: "'Sora', sans-serif",
          fontSize: 18,
          color: "#666",
        }}
      >
        Loading mentors...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "20px 0 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#EEF4FF",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');`}</style>
      
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

