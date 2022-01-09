import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Comment } from './Comment';
import { useTracker } from 'meteor/react-meteor-data';
import { CommentCollection } from '../api/commentCollection';

export const Board = () => {
  const user = useTracker(() => Meteor.user());
  const [emailId, setEmailId] = useState('');

  useEffect(() => {
    if (user && user.emails) {
      const user_email = user.emails[0].address;
      if (user_email !== emailId) {
        setEmailId(user_email);
      }
    }
  }, [user]);

  const comments = useTracker(() =>
    CommentCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  const onDeleteComment = ({ _id }) => {
    if (window.confirm(`Are you sure want to delete?`)) {
      CommentCollection.remove(_id);
    }
  };
  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onDeleteComment={onDeleteComment}
          emailId={emailId}
        />
      ))}
    </>
  );
};
