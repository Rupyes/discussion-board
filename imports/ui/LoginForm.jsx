import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Alert } from 'react-bootstrap';

export const LoginForm = () => {
  const user = useTracker(() => Meteor.user());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword({ email }, password, (err) => {
      setErrorMsg(err.reason);
    });
  };

  return (
    <div className='d-flex justify-content-center flex-column align-items-center py-5'>
      <h3 className='text-align-center'>Log in</h3>
      <form onSubmit={submit} className='login-form col-sm-6  p-5'>
        <div className='form-group mb-3'>
          <label htmlFor='email'>Email</label>

          <input
            type='email'
            placeholder='Email'
            name='email'
            className='form-control'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group  mb-3'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Password'
            name='password'
            className='form-control'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type='submit' className='btn btn-primary'>
            Log In
          </button>
        </div>
        <p className='mt-2'>
          New User? <Link to='/register'>Register</Link>
        </p>
        {errorMsg && (
          <Alert
            variant='warning'
            onClose={() => {
              setErrorMsg('');
            }}
            dismissible
          >
            {errorMsg}
          </Alert>
        )}
      </form>
    </div>
  );
};
