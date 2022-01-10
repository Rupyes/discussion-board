import React, { useEffect } from 'react';
import { Board } from './Board.jsx';
import { CommentForm } from './CommentForm.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className='col-9'>
        <div className='d-flex align-items-right'>
          <CommentForm />
        </div>
        <Board />
      </div>
    </div>
  );
};
