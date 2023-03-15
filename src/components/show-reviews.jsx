import {useState, useEffect} from "react";
import { getReviews, patchReview } from "../utils/axiosData";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import ReviewCard from "./review-card";



export default function ShowReviews() {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState(null);

    useEffect(() => {
        getReviews().then(response => {
            setReviews(response.data.reviews)
            setIsLoading(false)
        })
    },[])

    const returnItem = isLoading ? (
    <div className="progress-container">
    <h2>Loading reviews...</h2>
    <CircularProgress size={150} />
    </div>
  ) : ( 
        <ol className="review-list">
            {err ? <p>{err}</p> : null}
            {
                reviews.map(review => {
                    return (
                        <li key={review.review_id} className="review-card">
                            <Link to={`/reviews/${review.review_id}`} className="link">
                                <ReviewCard review={review} setReviews={setReviews} review_id={review.review_id}/>
                            </Link>
                        </li>
                            )
                })
            }
        </ol>
    )
    return <>{returnItem}</>
}