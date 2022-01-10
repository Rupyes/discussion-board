import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert } from 'react-bootstrap';

export const RegisterForm = () => {
  //   const user = useTracker(() => Meteor.user());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      setErrorMsg("Passwords don't match");
      return;
    }
    if (email && password && cPassword) {
      Accounts.createUser({ email, password }, (err) => {
        if (err) {
          setErrorMsg(`Error while registering : ${err.reason}`);
        } else {
          navigate('/login');
        }
      });
    }
  };

  return (
    <div className='d-flex justify-content-center flex-column align-items-center py-5'>
      <h3 className='text-align-center'>Register</h3>
      <form onSubmit={submit} className='login-form col-sm-6  p-4'>
        <div className='form-group mb-3'>
          <label htmlFor='emailAddress'>Email</label>

          <input
            type='email'
            placeholder='Email'
            name='emailAddress'
            className='form-control'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group mb-3'>
          <label htmlFor='password'>Password</label>

          <input
            type='password'
            placeholder='Password'
            name='password'
            className='form-control'
            onFocus={() => setErrorMsg('')}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='form-group mb-3'>
          <label htmlFor='cpassword'>Confirm Password</label>

          <input
            type='password'
            placeholder='Password'
            name='cpassword'
            className='form-control'
            onFocus={() => setErrorMsg('')}
            required
            onChange={(e) => setCPassword(e.target.value)}
          />
        </div>

        <div>
          <button type='submit' className='btn btn-primary'>
            Register
          </button>
        </div>
        <p className='mt-3'>
          Already have an account? <Link to='/login'>Log In</Link>
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
