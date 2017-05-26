app.factory('MessageFactory', function($http){
	var factory = {};

	factory.create = function(newMessage, callback){
		$http.post('/messages', newMessage).then(callback);
	}
	factory.index = function(callback){
		$http.get('/messages').then(callback);
	}
	factory.destroy = function(id, callback){
		$http.delete('/messages/' + id).then(callback);
	}
	factory.updateLikes = function(message_id, user_id, callback){
		$http.put('/messages/' + message_id + '/likes', { user: user_id }).then(callback);
	}

	return factory;
})