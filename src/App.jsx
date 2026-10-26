import { useState } from "react"
import InputForm from "./components/InputForm"
import ReviewList from "./components/ReviewList";

function App() {
  const [reviews, setReviews] = useState([]);

  const onAddReview = (newReview) => {
    setReviews(previousReviews => [
      ...previousReviews,
      { ...newReview, id: Math.random().toString() },
    ]);
  };
  return (
    <>
      <InputForm onAddReview={onAddReview} />
      <ReviewList items={reviews} />
    </>
  );
}

export default App
