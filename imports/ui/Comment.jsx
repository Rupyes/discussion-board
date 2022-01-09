import React from 'react';
import { Card } from 'react-bootstrap';

export const Comment = ({ comment, onDeleteComment, emailId }) => {
  return (
    <Card className='mb-4'>
      <Card.Header className='text-muted d-flex align-items-center justify-content-end'>
        <i className='fa fa-clock-o' aria-hidden='true'></i>

        <span style={{ fontSize: '12px' }} className='px-2'>
          {comment.createdAt.toLocaleString()}
        </span>
      </Card.Header>
      <Card.Body>
        {comment.text.split('\n').map((line, i) => (
          <Card.Text key={i}>{line}</Card.Text>
        ))}
      </Card.Body>
      <Card.Footer className='text-muted d-flex justify-content-between align-items-center space'>
        <span className='small'>
          Posted by:{' '}
          <span className='bold'>
            {emailId === comment.emailId ? 'You' : comment.emailId}{' '}
          </span>
        </span>

        {emailId === comment.emailId && (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              onDeleteComment(comment);
            }}
          >
            <i className='fa fa-trash-o' aria-hidden='true'></i>
          </div>
        )}
      </Card.Footer>
    </Card>
  );
};
