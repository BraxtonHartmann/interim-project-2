import { useState } from "react";
import "./InputForm.css";
import useReviewValidation from "../hooks/useReviewValidation";

function InputForm(props) {
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const { touched, errors, fieldProps, validate, resetValidation } = useReviewValidation({ location, rating, imageUrl });

    function handleSubmit(event) {
        event.preventDefault();
        if (!validate()) return;

        const newReview = {
            location: location.trim(),
            rating: Number(rating),
            review: review.trim(),
            imageUrl: imageUrl.trim(),
        };

        props.onAddReview(newReview);

        console.log(newReview);

        setLocation("");
        setRating("");
        setReview("");
        setImageUrl("");
        resetValidation();
    }



    return (
        <form className="review-form" onSubmit={handleSubmit} noValidate>
            <h1>Add a location review</h1>
            <label htmlFor="location">Location Name *</label>
            <input
                id="location"
                name="location"
                type="text"
                required
                placeholder="Location Name"
                value={location}
                {...fieldProps("location")}
                onChange={e => {
                    setLocation(e.target.value);
                }}
            />
            {touched.location && errors.location && <p className="field-error" id="location-error">{errors.location}</p>}

            <label htmlFor="rating">Rating out of 5 *</label>
            <input
                id="rating"
                name="rating"
                type="number"
                min="1" max="5"
                step="1"
                required
                value={rating}
                {...fieldProps("rating")}
                onChange={e => {
                    setRating(e.target.value);
                }}
            />
            {touched.rating && errors.rating && <p className="field-error" id="rating-error">{errors.rating}</p>}

            <label htmlFor="imageUrl">Image URL * </label>
            <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                required
                value={imageUrl}
                placeholder="https://example.com/location.jpg"
                {...fieldProps("imageUrl")}
                onChange={e => {
                    setImageUrl(e.target.value);
                }}
            />
            {touched.imageUrl && errors.imageUrl && <p className="field-error" id="imageUrl-error">{errors.imageUrl}</p>}
            <label htmlFor="review">Review</label>
            <textarea
                name="review"
                id="review"
                rows="4"
                value={review}
                onChange={e => {
                    setReview(e.target.value);
                }}
            >
            </textarea>

            <button type="submit">Submit Review</button>
            <p className="form-note">Fields marked with * are required</p>

        </form>
    )


}

export default InputForm;
