const { User, Board } = require('../models');
const Env = require('../config/environments');


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
	const name = req.query.name || req.body.name
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}
	if(!name){
		Board.findAll()
		.then((board)=>{
			res.status(201).json(board);
		})
		.catch(onError)
	}
	else{
		Board.findOne({
			where:{
					name
			}
		}).then((board)=>{
			res.status(201).json(board);
		}).catch(onError)
	}

}

exports.findBoardByIx = (req, res) =>{	
	const board_idx = req.params.ix
	
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}

	Board.findOne({
		where:{
			ix: board_idx
		}
	}).then((board)=>{
		res.status(201).json(board);
	}).catch(onError)
}


exports.updateBoard = (req, res) =>{	
	const board_idx = req.params.ix
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
			ix: board_idx
		}
	}).then((board)=>{
		Board.findOne({
			where:{
				ix: board_idx
			}
		}).then((board)=>{
			res.status(201).json(board);
		})
	}).catch(onError)
}


