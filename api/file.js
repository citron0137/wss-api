const router = require('express').Router()
const { File } = require('../models');
const Env = require('../config/environments');

var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
	},
	filename: function (req, file, cb) {
	  cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
	}
  })
  var upload = multer({ storage: storage })


router.post('/', upload.single('file'), function(req, res, next){
	console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
	
	const user_ix = 1;
	const type = req.file.mimetype;
	const url = ""+req.file.path;
	
	const onError = (error) => {
		res.status(400).json({
			success: false,
			message: error.message
		})
	}
	File.create({
		user_ix,type,url
	})
	.then((file)=>{
		res.status(200).json(file);
	}).catch(onError)

});


module.exports = router