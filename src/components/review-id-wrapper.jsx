import ReviewId from "./review-id";
import ReviewIdComments from './review-id-comments';
import { getCommentsByReview } from "../utils/axiosData";
import { getReview } from "../utils/axiosData";
import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ReviewCommentAdder from "./review-comment-adder";

export default function ReviewIdAndComments({users}) {
    const [commentsIsLoading, setCommentsIsLoading] = useState(true)
    const [reviewIsLoading, setReviewIsLoading] = useState(true)
    const [comments, setComments] = useState([]);
    const [review, setReview] = useState({})
    const [error, setError] = useState(false)
    const {review_id} = useParams();
    let returnItem = null;
    
    useEffect(() => {
        getCommentsByReview(review_id).then(response => {
            setComments(response.data.comments)
            setCommentsIsLoading(false)
        })
    }, [review_id])

    useEffect(() => {
        getReview(review_id).then(response => {
            setReview(response.data.review)
            setReviewIsLoading(false)
        }).catch(() => {
            setError(true)
            setReviewIsLoading(false)
        })
    }, [review_id]);

    if(error) {
        return (<p className="search-error">invalid review id</p>)
    }

    if (commentsIsLoading === false && reviewIsLoading === false) { 
        returnItem = (
        <section>
            <ReviewId review={review}/>
            <ReviewCommentAdder review_id={review_id} setComments={setComments}/>
            <ReviewIdComments comments={comments} setComments={setComments} users={users}/>
        </section>
        ) 
    } else {
        returnItem = (
            <div className="progress-container">
            <h2>Loading review...</h2>
            <CircularProgress size={150} />
            </div>
        )
    }

    return <>{returnItem}</>
}