var mongoose = require("mongoose");

var Message = mongoose.model("Message");
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');

module.exports = {
	index: function(req, res){
		Comment.find({}, function(err, comments){
			if(err){
				return res.json(err);
			}
			return res.json(comments);
		})
	},
	create: function(req, res){
		Comment.create(req.body, function(err, comment){
			if(err){
				return res.json(err);
			}
			Message.findByIdAndUpdate(req.body.message, { $push: { comments: comment._id }}, function(err, message){
				if(err){
					return res.json(err);
				}
				User.findByIdAndUpdate(req.body.user, { $push : { comments: comment._id }}, function(err, user){
					if(err){
						return res.json(err);
					}
					return res.json(comment);
				})
			})
		})
	},
	show: function(req, res){
		Comment.findById(req.params.id, function(err, comment){
			if(err){
				return res.json(err)
			}
			return res.json(comment);
		})
	},
	destroy: function(req, res){
		Comment.findById(req.params.id, function(err, comment){
			if(err){
				return res.json(err);
			}
			comment.remove(function(err, comment){
				if(err){
					return res.json(err);
				}
				return res.json(comment);
			})
		})
	},
	updateLikes: function(req, res){
		console.log(req.body)
		Comment.findByIdAndUpdate(req.params.id, { $inc : { "likes.count" : 1 }, $push: { "likes.users": req.body.user }}, { new: true }, function(err, comment){
			if(err){
				return res.json(err);
			}
			return res.json(comment);
		})
	}
};


