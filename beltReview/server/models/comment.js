var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comment: {
		type: String,
		required: [true, 'Comment cannot be blank.']
	},
	message: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	},
	likes: {
		count: {
			type: Number,
			default: 0
		},
		users: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}]
	}
}, { timestamps: true });

mongoose.model('Comment', CommentSchema);