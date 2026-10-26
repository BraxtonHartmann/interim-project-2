import ReviewItem from "./ReviewItem";

function ReviewList(props) {
    if (props.items.length === 0) {
        return <p>No reviews yet. Add one above!</p>;
    }

    return (
        <ul>
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