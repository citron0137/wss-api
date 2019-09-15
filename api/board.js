const { User, Board, Sequelize } = require('../models');
const Env = require('../config/environments');
const Op = Sequelize.Op;

exports.createBoard = (req, res) =>{
	
	const { name, is_admin } = req.body;
	const parent_name  = req.body.parent_name || "etc";
	if(!req.decoded.is_admin ){
		throw new Error('Unauthorized');
	}
	
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Board.findOne({
		where:{name}
	}).then((board)=>{
		if(!board){
			Board.create({
				name,
				parent_name,
				is_admin
			})
			.then((board)=>{
				res.status(201).json(board);
			})
		}
	}).catch(onError)
}



exports.findBoardByName = (req, res) =>{	
	const name = req.query.name || req.body.name || "%"
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}
	Board.findAll({
		where:{
			name:{
				[Op.like]: "%"+name+"%"
			}
		}
	}).then((board)=>{
		res.status(201).json(board);
	}).catch(onError)


}

exports.findBoardByIx = (req, res) =>{	
	const board_ix = req.params.board_ix
	
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Board.findOne({
		where:{
			ix: board_ix
		}
	}).then((board)=>{
		res.status(201).json(board);
	}).catch(onError)
}


exports.updateBoard = (req, res) =>{	
	const board_ix = req.params.board_ix
	const name = req.query.name || req.body.name
	if(!req.decoded.is_admin ){
		throw new Error('Unauthorized');
	}
	
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Board.update({
		name
	},{
		where:{
			ix: board_ix
		}
	}).then((board)=>{
		Board.findOne({
			where:{
				ix: board_ix
			}
		}).then((board)=>{
			res.status(201).json(board);
		})
	}).catch(onError)
}

exports.deleteBoard = (req, res) =>{
	const board_ix = req.params.board_ix
	if(!req.decoded.is_admin ){
		throw new Error('Unauthorized');
	}
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}
	Board.destroy({
		where:{
			ix: board_ix
		}
	}).then((board)=>{
		res.status(201).json({
			success: true,
			message: "delete success"
		});
	}).catch(onError)
}
