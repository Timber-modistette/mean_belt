var Users = require('../controllers/users');
var Messages = require('../controllers/messages');
var Comments = require('../controllers/comments');

module.exports = function(app){
	app.get('/users', Users.index);
	app.post('/users', Users.create);
	app.post('/sessions', Users.login);
	app.get('/messages', Messages.index);
	app.post('/messages', Messages.create);
	app.get('/comments', Comments.index);
	app.post('/comments', Comments.create);

	app.get('/comments/:id', Comments.show);
	app.get('/messages/:id', Messages.show);
	app.delete('/users/:id', Users.destroy);
	app.delete('/messages/:id', Messages.destroy);
	app.delete('/comments/:id', Comments.destroy);
	app.get('/users/:id', Users.show);
	app.put('/messages/:id/likes', Messages.updateLikes);
	app.put('/comments/:id/likes', Comments.updateLikes);
}