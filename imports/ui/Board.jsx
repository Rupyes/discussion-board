import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Comment } from './Comment';
import { useTracker } from 'meteor/react-meteor-data';
import { CommentCollection } from '../db/commentCollection';

export const Board = () => {
  const [emailId, setEmailId] = useState('');

  const { comments, user, isLoading } = useTracker(() => {
    const noDataAvailable = { comments: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('comments');
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const comments = CommentCollection.find(
      {},
      { sort: { createdAt: -1 } }
    ).fetch();
    return { comments, user: Meteor.user() };
  });

  useEffect(() => {
    if (user && user.emails) {
      const user_email = user.emails[0].address;
      if (user_email !== emailId) {
        setEmailId(user_email);
      }
    }
  }, [user]);

  const onDeleteComment = ({ _id }) => {
    if (window.confirm(`Are you sure want to delete?`)) {
      Meteor.call('comments.remove', _id, user.emails[0].address);
    }
  };
  return (
    <>
      {isLoading && <span>Loading...</span>}
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onDeleteComment={onDeleteComment}
          emailId={emailId}
        />
      ))}
      {comments.length === 0 && <p>No comments yet.</p>}
    </>
  );
};
