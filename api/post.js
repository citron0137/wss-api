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
		if(!board || (board.is_admin && !req.decoded.is_admin)){
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
	const page_num = req.query.page || req.body.page || 0


	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}

	Post.findAll({
		attributes:[
		'ix','user_ix', 'board_ix', 'title', 'is_private', 'is_anon', 'view_count'
		],
		where:{
			title:{[Op.like]:"%"+title+"%"},
			board_ix:{[Op.like]:board_ix}
		},
		limit: 10,
		offset: 10*page_num
	}).then((post)=>{
		const is_admin = req.decoded.is_admin || false;
		const user_ix = req.decoded.ixi || 0;
		post.forEach(element => {
			if(element.is_anon && !(is_admin) && element.user_ix != user_ix){
				element.user_ix = -1;
			}
			if(element.is_private&& !(is_admin) && element.user_ix != (user_ix)){
				element.title = "private post";
			}
		});
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
		const is_admin = req.decoded.is_admin || false;
		const user_ix = req.decoded.ixi || 0;
		
		if(!post){
			throw new Error("doesn't exist");
		}
		if(post.is_private && !is_admin &&post.user_ix != user_ix){
			throw new Error('Unauthorized');
		}
		if(post.is_anon && !is_admin &&post.user_ix !=user_ix){
			post.user_ix = -1;
		}
		Post.update({
			view_count: post.view_count+1
		},{
			where:{
				ix: post_ix
			}
		})
		res.status(201).json(post);
	}).catch(onError)
}


exports.updatePost = (req, res) =>{	
	const post_ix = req.params.post_ix
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}
	Post.findOne({ //authCheck
		where:{
			ix: post_ix
		}
	}).then(post=>{
		if(!post){
			throw new Error("doesn't exist");
		}
		if(post.user_ix != req.decoded.ix && !req.decoded.is_admin){
			throw new Error("Unauthorized")
		}else{
			const board_ix= req.body.board_ix || post.bord_ix;
			const title= req.body.title|| post.bord_ix;
			const contents= req.body.contents|| post.contents;
			const is_private= req.body.is_private|| post.is_private;
			const is_comment= req.body.is_comment|| post.is_comment;
			const is_anon = req.body.is_anon|| post.is_anon;
			console.log(req.body);
			console.log(post);
			Post.update({board_ix, title, contents, is_private, is_comment, is_anon},{where:{ix:post_ix}})//update
			.then(()=>{
				Post.findOne({
					where:{
						ix: post_ix
					}
				}).then((post)=>{
					res.status(201).json(post);
				})
			})
		}
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
	Post.findOne({ //authCheck
		where:{
			ix: post_ix
		}
	}).then(post=>{
		if(!post){
			throw new Error("doesn't exist");
		}
		if(post.user_ix != req.decoded.ix && !req.decoded.is_admin){
			throw new Error("Unauthorized")
		}else{
			Post.destroy({
				where:{
					ix: post_ix
				}
			}).then((post)=>{
				res.status(201).json({
					success: true,
					message: "delete success"
				});
			})
		}
	}).catch(onError)
}
