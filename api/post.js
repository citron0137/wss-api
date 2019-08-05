const {Post,Board, Sequelize } = require('../models');
const Env = require('../config/environments');
const Op = Sequelize.Op;

exports.createPost = (req, res) =>{	

	const { board_ix, title, contents, is_private, is_comment, is_anon } = req.body;
	const user_ix = req.decoded.ix;
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}

	Board.findOne({
		where:{
		ix:board_ix
		}
	}).then(board=>{
		if(board.is_admin && !req.decoded.is_admin){
			throw new Error("unAuthorize");
		}else{
		Post.create({
			user_ix,
			board_ix,
			title,
			contents,
			is_private,
			is_anon,
			is_comment
		})
		.then((post)=>{
			res.status(200).json(post);
			})
		}
	}).catch(onError)
}


exports.findPosts = (req, res) =>{	
	const title = req.query.title || req.body.title || "%"
	const board_ix = req.query.board_ix || req.body.board_ix || "%"
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	Post.findAll({
		attributes:[
		'ix','user_ix', 'board_ix', 'title', 'is_private', 'is_anon', 'is_comment'
		],
		where:{
			title:{[Op.like]:"%"+title+"%"},
			board_ix:{[Op.like]:board_ix}
		}
	}).then((post)=>{
		res.status(200).json(post);
	}).catch(onError)

	

}

exports.findPostByIx = (req, res) =>{	
	const post_ix = req.params.post_ix

	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Post.findOne({
		where:{
			ix: post_ix
		}
	}).then((post)=>{
		res.status(201).json(post);
	}).catch(onError)
}


exports.updatePost = (req, res) =>{	
	const post_ix = req.params.post_ix
	const { board_ix, title, contents, is_private, is_comment, is_anon } = req.body;
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Board.update({
		board_ix, 
		title, 
		contents, 
		is_private, 
		is_comment, 
		is_anon 
	},{
		where:{
			ix: post_ix
		}
	}).then((board)=>{
		Post.findOne({
			where:{
				ix: post_ix
			}
		}).then((post)=>{
			res.status(201).json(post);
		})
	}).catch(onError)
}

exports.deletePost = (req, res) =>{
	const post_ix = req.params.post_ix
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}
	Post.destroy({
		where:{
			ix: post_ix
		}
	}).then((post)=>{
		res.status(201).json({
			success: true,
			message: "delete success"
		});
	}).catch(onError)
}
