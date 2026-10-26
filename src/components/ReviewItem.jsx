function ReviewItem(props) {
    return (
        <li className="review-card">
            <img src={props.imageUrl} alt={props.location} loading="lazy" />
            <div className="review-card-content">
            <h2>{props.location}</h2>
            <p className="review-rating">★ {props.rating}/5</p>
            <p className="review-text">{props.review}</p>
            </div>
        </li>
    );
}

export default ReviewItem;
