import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_COMMENT, DELETE_COMMENT, GET_COMMENTS_MOVIE } from "../queries";
import { useForm } from "../util/hooks";
import CommentsCSS from "../assets/styles/components/Comments.module.scss";
import Button from "./Button";

const Comments = ({ movieID }) => {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const [comments, setComments] = useState([]);

  const createCommentCallback = () => {
    createComment();
  };

  const { onChange, onSubmit, values } = useForm(createCommentCallback, {
    body: "",
  });

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      commentInput: {
        username: user ? user.username : "",
        movieID: movieID,
        body: values.body,
      },
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    onCompleted({ createComment }) {
      setComments([...comments, createComment]);
    },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    onCompleted({ deleteComment }) {
      setComments(
        comments.filter((comment) => comment._id !== deleteComment._id)
      );
    },
  });

  const handleCommentDelete = (id) => {
    deleteComment({
      variables: {
        id: id,
        username: user ? user.username : "",
      },
    });
  };

  const { data, error } = useQuery(GET_COMMENTS_MOVIE, {
    variables: {
      movieID,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setComments(data.getAllCommentsByMovieID);
    }
  }, [data]);

  if (error) return <p>Error message: {error.message}</p>;
  return (
    <div className={CommentsCSS.container}>
      <div className={CommentsCSS.test}>
        <h1 className={CommentsCSS.title}>Comments</h1>
        {user ? (
          <form className={CommentsCSS.addComment} onSubmit={onSubmit} autocomplete="off">
            <textarea
              className={CommentsCSS.newComment}
              type="textarea"
              name="body"
              id="body"
              value={values.body}
              onChange={onChange}
            />
            <Button
              className={CommentsCSS.addButton}
              name={"Add comment"}
              handleClick={onSubmit}
              direction={"buttonRight"}
            />
          </form>
        ) : (
          <div className={CommentsCSS.reminder}>
            Log in, to write a comment!
          </div>
        )}
        <ul className={CommentsCSS.commentsContainer}>
          {comments
            .slice()
            .reverse()
            .map((comment) => (
              <li className={CommentsCSS.comment} key={comment._id}>
                <div className={CommentsCSS.data}>
                  <p className={CommentsCSS.author}>
                    Author: {comment.username}
                  </p>
                  <p className={CommentsCSS.body}>{comment.body}</p>
                </div>
                {user &&
                  (user.username === comment.username ? (
                    <button
                      className={CommentsCSS.button}
                      onClick={() => handleCommentDelete(comment._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <></>
                  ))}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Comments;
