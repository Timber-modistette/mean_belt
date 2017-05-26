app.controller('MessagesController', function(UserFactory, MessageFactory, CommentFactory){
	console.log('initializing MessagesController...');
	
	var self = this;
	self.messages = [];
	self.new_message_errors = [];
	self.newMessage = {};
	self.newComment = {};
	self.new_comment_errors = {};

	self.index = function(){
		MessageFactory.index(function(res){
			self.messages = res.data;
		})
	}

	self.updateCommentLikes = function(comment_id, user_id){
		console.log('here');
		CommentFactory.updateLikes(comment_id, user_id, self.index);
	}

	self.updateLikes = function(message_id, user_id){
		MessageFactory.updateLikes(message_id, user_id, self.index);
	}

	self.destroy = function(message_id){
		MessageFactory.destroy(message_id, self.index);
	}

	self.destroyComment = function(comment_id){
		CommentFactory.destroy(comment_id, self.index);
	}

	self.createComment = function(newComment, index, message_id){
		self.new_comment_errors = {};
		if(!newComment[index]){
			newComment[index] = {};
		}
		newComment = newComment[index];
		newComment.message = message_id
		UserFactory.session(function(user){
			newComment.user = user;
			CommentFactory.create(newComment, function(res){
				self.newComment = {};
				if(res.data.errors){
					self.new_comment_errors[index]= [];
					for(key in res.data.errors){
						var error = res.data.errors[key];
						self.new_comment_errors[index].push(error.message);
					}
				} else {
					self.index();
				}
			})
		})
	}

	self.create = function(newMessage){
		self.new_message_errors = [];
		UserFactory.session(function(user){
			newMessage.user = user._id;
			MessageFactory.create(newMessage, function(res){
				if(res.data.errors){
					for(key in res.data.errors){
						var error = res.data.errors[key];
						self.new_message_errors.push(error.message)
					}
				} else {
					self.index();
				}
			})
		})
	}
})