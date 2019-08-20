const {Comment, Post, Sequelize } = require('../models');
const Env = require('../config/environments');
const Op = Sequelize.Op;

exports.createComment = (req, res) =>{	

	const { post_ix ,parent_ix, is_comment_parent, contents, is_private, is_anon } = req.body;
	const user_ix = req.decoded.ix;

	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
		Post.findOne({where:{ix:post_ix}})
		.then((parent_post)=>{
			if(!parent_post){
				throw new Error("post doesn't exist");
			}
			if(!parent_post.is_comment || parent_post.is_private){
				throw new Error('unable to comment on this post');
			}
			Comment.create({
				post_ix,user_ix,parent_ix, is_comment_parent, contents, is_private, is_anon
			})
			.then((comment)=>{
				res.status(200).json(comment);
			})
		}).catch(onError)
}


exports.findComments = (req, res) =>{	
	const post_ix = req.query.post_ix || req.body.post_ix || "%"
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	let post_user_ix = 0;
	Comment.findAll({
		where:{
			post_ix:{[Op.like]:post_ix}
		}
	}).then((comment)=>{
			res.status(200).json(comment);
	}).catch(onError)

	

}

exports.findCommentByIx = (req, res) =>{	
	const comment_ix = req.params.comment_ix

	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Comment.findOne({
		where:{
			ix: comment_ix
		}
	}).then((comment)=>{
		res.status(201).json(comment);
	}).catch(onError)
}


exports.updateComment = (req, res) =>{	
	const comment_ix = req.params.comment_ix
	const { parent_ix, is_comment_parent, contents, is_private, is_anon } = req.body;
	
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Comment.update({
		parent_ix, is_comment_parent, contents, is_private, is_anon
	},{
		where:{
			ix: comment_ix
		}
	}).then((comment)=>{
		Comment.findOne({
			where:{
				ix: comment_ix
			}
		}).then((comment)=>{
			res.status(201).json(comment);
		})
	}).catch(onError)
}

exports.deleteComment = (req, res) =>{
	const comment_ix = req.params.comment_ix
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}
	Comment.destroy({
		where:{
			ix: comment_ix
		}
	}).then((comment)=>{
		res.status(201).json({
			success: true,
			message: "delete success"
		});
	}).catch(onError)
}
