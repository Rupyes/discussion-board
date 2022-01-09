import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { CommentCollection } from '../imports/api/commentCollection';

const insertComment = (text, user) => {
  CommentCollection.insert({ text, userId: user._id, createdAt: new Date() });
};

Meteor.startup(() => {
  // TODO: add
});
