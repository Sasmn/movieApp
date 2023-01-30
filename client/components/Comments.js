import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_COMMENT, GET_COMMENTS_MOVIE } from "../queries";
import CardCSS from "../assets/Card.module.scss";
import { useForm } from "../util/hooks";

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
    <div>
      <h1>Comments</h1>
      {user ? (
        <form onSubmit={onSubmit}>
          <label htmlFor="body">Search by movie ID: </label>
          <textarea
            type="textarea"
            name="body"
            id="body"
            value={values.body}
            onChange={onChange}
          />
          <button type="submit">Add comment</button>
        </form>
      ) : (
        <div>Log in, to write a comment!</div>
      )}
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.username}</p>
            <p>{comment.body}</p>
            {user &&
              (user.username === comment.username ? (
                <>
                  <button>Edit</button>
                  <button>Delete</button>
                </>
              ) : (
                <></>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
