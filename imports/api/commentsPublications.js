import { Meteor } from 'meteor/meteor';
import { CommentCollection } from '../db/commentCollection';

Meteor.publish('comments', function publishComments() {
  return CommentCollection.find({}, { sort: { createdAt: -1 } });
});
