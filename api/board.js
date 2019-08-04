const { User, Board, Sequelize } = require('../models');
const Env = require('../config/environments');
const Op = Sequelize.Op;

exports.createBoard = (req, res) =>{
	
	//TODO name check ( if already exist)
	
	const { name } = req.body;
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Board.create({
		name
	})
	.then((board)=>{
		res.status(201).json(board);
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
