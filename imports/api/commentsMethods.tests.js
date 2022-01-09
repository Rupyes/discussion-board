import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { mockMethodCall } from 'meteor/quave:testing';
import { CommentCollection } from '../db/commentCollection';
import '../api/commentsMethods';

if (Meteor.isServer) {
  describe('Comments', () => {
    describe('methods', () => {
      const userId = Random.id();
      const emailId = 'demo@gmail.com';
      let commentId;

      beforeEach(() => {
        CommentCollection.remove({});
        commentId = CommentCollection.insert({
          text: 'Test comment',
          createdAt: new Date(),
          emailId,
        });
      });

      it('can delete owned comment', () => {
        mockMethodCall('comments.remove', commentId, emailId, {
          context: { userId },
        });
        assert.equal(CommentCollection.find().count(), 0);
      });

      it(`can't delete comment without an user authenticated`, () => {
        const fn = () => mockMethodCall('comments.remove', commentId);
        assert.throw(fn, /Not authorized/);
        assert.equal(CommentCollection.find().count(), 1);
      });

      it(`can't delete comment from another owner`, () => {
        const fn = () =>
          mockMethodCall('comments.remove', commentId, 'other@gmail.com', {
            context: { userId },
          });
        assert.throw(fn, /Access denied/);
        assert.equal(CommentCollection.find().count(), 1);
      });

      it('can insert new comment', () => {
        const text = 'New Comment';
        mockMethodCall('comments.insert', text, emailId, {
          context: { userId },
        });

        const comments = CommentCollection.find({}).fetch();
        assert.equal(comments.length, 2);
        assert.isTrue(comments.some((c) => c.text === text));
      });
    });
  });
}
