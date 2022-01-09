import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Form } from 'react-bootstrap';

export const CommentForm = () => {
  const user = useTracker(() => Meteor.user());
  const [comment, setComment] = useState('');
  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    Meteor.call('comments.insert', comment, user.emails[0].address);

    setComment('');
  };
  return (
    <div className='w-100'>
      <Form
        onSubmit={submitHandler}
        className='d-flex flex-column justify-content-center  align-items-end'
      >
        <Form.Control
          as='textarea'
          className='shadow-none border-0 bg-light my-3'
          placeholder='Type something.....'
          rows={4}
          value={comment}
          onChange={onChangeHandler}
        />
        <Button variant='dark' type='submit'>
          Post Comment
        </Button>
      </Form>
      <hr />
    </div>
  );
};
