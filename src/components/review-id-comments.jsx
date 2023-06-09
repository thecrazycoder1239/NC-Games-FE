import CommentTemplate from "./comment-template";


export default function ReviewIdComments({comments, users, setComments}) {

    let returnItem = null;
    if (comments.length !== 0){
        returnItem = (
            <ol className="comments-background">
                <h2 className="comments-title">Comments</h2>
               {comments.map(comment => {
                let avatarUrl = null
                users.map(user => {
                    if(user.username === comment.author) {
                        avatarUrl = user.avatar_url
                    }
                    return null;
                })

                return (
                    <CommentTemplate key={comment.comment_id} comment={comment} avatarUrl={avatarUrl} setComments={setComments}/>
                )
               })}
            </ol>
        )
    } else if (comments.length === 0) {
        returnItem = (
            <ol className="comments-background">
                <h2 className="comments-title">Comments</h2>
                <li className="no-comment" key="no-comments">There are currently no comments on this review</li>
                <p className="no-comment">Feel free to be the first!</p>
            </ol>
        )
    }
    
    return <>{returnItem}</>
}