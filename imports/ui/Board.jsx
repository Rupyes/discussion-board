import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Comment } from './Comment';
import { useTracker } from 'meteor/react-meteor-data';
import { CommentCollection } from '../db/commentCollection';
import { Modal, Button } from 'react-bootstrap';

export const Board = () => {
  const [emailId, setEmailId] = useState('');
  const [show, setShow] = useState(false);
  const [toDeleteId, setToDeleteId] = useState('');

  const handleClose = () => {
    setShow(false);
    setToDeleteId('');
  };
  const handleShow = () => setShow(true);

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

  const deleteComment = () => {
    Meteor.call('comments.remove', toDeleteId, user.emails[0].address);
    handleClose();
    setToDeleteId();
  };
  const onDeleteComment = ({ _id }) => {
    handleShow();
    setToDeleteId(_id);
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
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete?</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              No
            </Button>
            <Button variant='primary' onClick={deleteComment}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {comments.length === 0 && <p>No comments yet.</p>}
    </>
  );
};
