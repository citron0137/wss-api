const {Vote,VoteItem,VoteUser, Sequelize } = require('../models');
const Env = require('../config/environments');
const Op = Sequelize.Op;

exports.createVote = (req, res) =>{	

	const { user_ix, title, is_private, is_comment, is_anon,is_anon_vote,start_at,close_at} = req.body;
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	Vote.create({
		user_ix, title, is_private, is_comment, is_anon,is_anon_vote,start_at,close_at
	})
	.then((vote)=>{
		res.status(200).json(vote);
	}).catch(onError)
}

exports.createVoteItem = (req, res) =>{	
	const { vote_ix, contents} = req.body;
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	VoteItem.create({
		vote_ix, contents
	})
	.then((vote)=>{
		res.status(200).json(vote);
	}).catch(onError)
}


exports.findVotes = (req, res) =>{	
	const title = req.query.title || req.body.title || "%"
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	Vote.findAll({
		where:{
				title:{[Op.like]:"%"+title+"%"}
		}
	}).then((vote)=>{
		res.status(200).json(vote);
	}).catch(onError)
}

exports.findVoteItems = (req, res) =>{	
	const vote_ix = req.query.vote_ix || req.body.vote_ix || "%"
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	VoteItem.findAll({
		where:{
			vote_ix
		}
	}).then((vote)=>{
		Promise.all(vote.map((value) => {
			return VoteUser.count({where:{vote_item_ix:value.dataValues.ix}})
		})).then((res)=>{
			vote.map((value, index, array)=>{
				value.dataValues.count = res[index];
			})
			console.log("--------------------------------------------------");
			console.log(vote);
		}).then(()=>{
			res.status(200).json(vote);
		})
		
	}).catch(onError)
}

exports.findVoteByIx = (req, res) =>{	
	const ix = req.params.vote_ix

	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Vote.findOne({
		where:{
			ix
		}
	}).then((vote)=>{
		res.status(201).json(vote);
	}).catch(onError)
}


exports.updateVote = (req, res) =>{	
	const ix = req.params.vote_ix
	const { user_ix, title, is_private, is_comment, is_anon,is_anon_vote,start_at,close_at} = req.body;
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Vote.update({
		user_ix, title, is_private, is_comment, is_anon,is_anon_vote,start_at,close_at
	},{
		where:{
			ix
		}
	}).then((board)=>{
		Vote.findOne({
			where:{
				ix
			}
		}).then((vote)=>{
			res.status(201).json(vote);
		})
	}).catch(onError)
}

exports.deleteVote = (req, res) =>{
	const ix = req.params.vote_ix
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}
	Vote.destroy({
		where:{
			ix
		}
	}).then((vote)=>{
		res.status(201).json({
			success: true,
			message: "delete success"
		});
	}).catch(onError)
}



exports.voteToItem = (req, res) =>{	
	const { user_ix, vote_item_ix } = req.body;
	
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	VoteUser.create({
		user_ix, vote_item_ix
	}).then((vote)=>{
		res.status(201).json(vote);
	}).catch(onError)
}