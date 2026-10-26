import { useState } from "react";

export default function useReviewValidation({ location, rating, imageUrl }) {
    const [touched, setTouched] = useState({});

    const errors = {
        location: location.trim() ? "" : "Enter a location name.",
        rating: rating !== "" && Number.isInteger(Number(rating)) && Number(rating) >= 1 && Number(rating) <= 5
            ? "" : "Enter a whole number from 1 to 5.",
        imageUrl: "",
    };

    try {
        const url = new URL(imageUrl);
        if (url.protocol !== "https:" && url.protocol !== "http:") {
            errors.imageUrl = "Enter an image URL starting with https:// or http://.";
        }
    } catch {
        errors.imageUrl = "Enter a valid image URL starting with https:// or http://.";
    }

    function handleBlur(event) {
        const name = event.target.name;
        setTouched(previous => ({ ...previous, [name]: true }));
    }

    function fieldProps(name) {
        const invalid = Boolean(touched[name] && errors[name]);
        return {
            onBlur: handleBlur,
            "aria-invalid": invalid,
            "aria-describedby": invalid ? `${name}-error` : undefined,
        };
    }

    function validate() {
        setTouched({ location: true, rating: true, imageUrl: true });
        return !Object.values(errors).some(Boolean);
    }

    function resetValidation() {
        setTouched({});
    }

    return { touched, errors, fieldProps, validate, resetValidation };
}
