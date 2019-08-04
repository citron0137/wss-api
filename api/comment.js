const {Comment, Sequelize } = require('../models');
const Env = require('../config/environments');
const Op = Sequelize.Op;

exports.createComment = (req, res) =>{	

	const { parent_ix, is_comment_parent, contents, is_private, is_anon } = req.body;
	
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	Comment.create({
		parent_ix, is_comment_parent, contents, is_private, is_anon
	})
	.then((comment)=>{
		res.status(200).json(comment);
	}).catch(onError)
}


exports.findComments = (req, res) =>{	
	const parent_ix = req.query.parent_ix || req.body.parent_ix || "%"
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	Comment.findAll({
		where:{
			parent_ix:{[Op.like]:parent_ix}
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
