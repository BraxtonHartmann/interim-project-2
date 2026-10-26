import { useState, useEffect } from "react"
import InputForm from "./components/InputForm"
import ReviewList from "./components/ReviewList";
import useHttp from "./hooks/useHttp";

function App() {
  const [reviews, setReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("highest");
  const { isLoading, error, sendRequest } = useHttp();
  const {
    isLoading: isFetching,
    error: fetchError,
    sendRequest: fetchReviews,
  } = useHttp();

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      try {
        const data = await fetchReviews(
          "https://interim-project-2-default-rtdb.firebaseio.com/reviews.json"
        );

        // Firebase returns an object keyed by review IDs, or null when empty. (ai helped me with this one)
        const loadedReviews = Object.entries(data || {}).map(([id, review]) => ({
          ...review,
          id,
        }));

        if (active) setReviews(loadedReviews);
      } catch {
        // The hook exposes the error for the message below.
      }
    }

    loadReviews();

    return () => {
      active = false;
    };
  }, [fetchReviews]);

  const onAddReview = async (newReview) => {
    const data = await sendRequest(
      "https://interim-project-2-default-rtdb.firebaseio.com/reviews.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newReview,
      }
    );

    setReviews(previousReviews => [
      ...previousReviews,
      { ...newReview, id: data.name },
    ]);
  };

  // Ai helped me with the logic for this
  const sortedReviews = [...reviews].sort((a, b) => {
    return sortOrder === "highest"
      ? b.rating - a.rating
      : a.rating - b.rating;
  });

  return (
    <>
      {!isFetching && <InputForm onAddReview={onAddReview} />}
      {isFetching && <p>Loading reviews...</p>}
      {isLoading && <p>Saving review...</p>}
      {error && <p role="alert">{error}</p>}
      {fetchError && <p role="alert">Could not load reviews. Please refresh to try again.</p>}
      <label htmlFor="sortOrder">
        Custom Feature: Sort by rating
      </label>

      <select
        id="sortOrder"
        value={sortOrder}
        onChange={event => setSortOrder(event.target.value)}
      >
        <option value="highest">Highest rated first</option>
        <option value="lowest">Lowest rated first</option>
      </select>
      {!isFetching && !fetchError && <ReviewList items={sortedReviews} />}
    </>
  );
}

export default App
