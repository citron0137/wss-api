const router = require('express').Router()
const { File, Sequelize } = require('../models');
const Env = require('../config/environments');
const Op = Sequelize.Op;

var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now()+"_"+file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
	}
  })
  var upload = multer({ storage: storage })


router.post('/', upload.single('file'), function(req, res, next){
	console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
	
	const user_ix = req.decode.ix;
	const type = req.file.mimetype;
	const name = req.file.filename;
	
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	File.create({
		user_ix,type,name
	})
	.then((file)=>{
		res.status(200).json(file);
	}).catch(onError)

});


router.get('/',(req, res) =>{	
	const name = req.query.name || req.body.name || "%"
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	File.findAll({
		where:{
			name:{[Op.like]:"%"+name+"%"}
		}
	}).then((post)=>{
		res.status(200).json(post);
	}).catch(onError)
}) 

router.get('/:name',(req, res) =>{	
	const name = req.params.name

	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}
	File.findOne({
		where:{
			name
		}
	}).then((post)=>{
		res.status(201).json(post);
	}).catch(onError)
})



router.delete('/:name',(req, res) =>{	
	const name = req.params.name
	const onError = (error) => {
		res.status(403).json({
			success: false,
			message: error.message
		})
	}
	File.destroy({
		where:{
			name
		}
	}).then((post)=>{
		res.status(201).json({
			success: true,
			message: "delete success"
		});
	}).catch(onError)
})



module.exports = router