import ReviewItem from "./ReviewItem";
import "./ReviewList.css";

function ReviewList(props) {
    if (props.items.length === 0) {
        return <p className="reviews-empty">No reviews yet. Add one above!</p>;
    }

    return (
        <ul className="review-list">
            {props.items.map(item => (
                <ReviewItem
                    key={item.id}
                    location={item.location}
                    rating={item.rating}
                    review={item.review}
                    imageUrl={item.imageUrl}
                />
            ))}
        </ul>
    );
}

export default ReviewList;
