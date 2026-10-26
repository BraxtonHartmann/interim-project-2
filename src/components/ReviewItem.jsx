function ReviewItem(props) {
    return (
        <li>
            <img src={props.imageUrl} alt={props.location} width="240" />
            <h2>{props.location}</h2>
            <p>Rating: {props.rating}/5</p>
            <p>{props.review}</p>
        </li>
    );
}

export default ReviewItem;