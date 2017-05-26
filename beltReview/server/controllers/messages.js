var mongoose = require("mongoose");

var Message = mongoose.model("Message");
var User = mongoose.model('User');

module.exports = {
	index: function(req, res){
		Message.find({}).populate({
			path: 'user',
			model: 'User'
		}).populate({
			path: 'comments',
			model: 'Comment',
			options: { sort: { createdAt: 1 }},
			populate: {
				path: 'user',
				model: 'User'
			}
		}).sort('-createdAt').exec(function(err, messages){
			if(err){
				return res.json(err);
			}
			return res.json(messages);
		})
	},
	create: function(req, res){
		Message.create(req.body, function(err, message){
			if(err){
				return res.json(err);
			}
			User.findByIdAndUpdate(req.body.user, { $push : { messages: message._id }}, function(err, user){
				if(err){
					return res.json(err);
				}
				return res.json(message);
			})
		})
	},
	show: function(req ,res){
		Message.findById(req.params.id, function(err, message){
			if(err){
				return res.json(err);
			}
			return res.json(message);
		})
	},
	destroy: function(req, res){
		Message.findById(req.params.id, function(err, message){
			if(err){
				return res.json(err);
			}
			message.remove(function(err, message){
				if(err){
					return res.json(err);
				}
				return res.json(message);
			})
		})
	},
	updateLikes: function(req, res){
		console.log(req.body);
		Message.findByIdAndUpdate(req.params.id, { $inc: { "likes.count": 1 }, $push: { "likes.users": req.body.user }}, { new: true }, function(err, message){
			if(err){
				return res.json(err);
			}
			return res.json(message);
		})
	}
};
