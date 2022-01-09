import { check } from 'meteor/check';
import { CommentCollection } from '../db/commentCollection';

Meteor.methods({
  'comments.insert'(text, emailId) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    CommentCollection.insert({
      text,
      createdAt: new Date(),
      emailId,
    });
  },

  'comments.remove'(commentId, emailId) {
    check(commentId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const comment = CommentCollection.findOne({ _id: commentId, emailId });
    if (!comment) {
      throw new Meteor.Error('Access denied');
    }

    CommentCollection.remove(commentId);
  },
});
