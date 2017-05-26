var mongoose = require('mongoose');

var Comment = mongoose.model('Comment');

var MessageSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	message: {
		type: String,
		required: [true, 'Message cannot be blank'],
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}],
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
}, { timestamps: true })

MessageSchema.pre('remove', function(callback){
	Comment.remove({ message: this._id }, callback)
})

mongoose.model('Message', MessageSchema);