const jwt = require('jsonwebtoken')
const { User } = require('../models');
const Env = require('../config/environments');

exports.register = (req, res) =>{
	const { id, pw, name } = req.body;
    User.findOne({
        where:{
            id
        }
    }).then((user)=>{
        if(!user){
            User.create({
                id,
                pw,
                name,
                is_admin:false
            }).then((user) => {
                user.pw = "hidden";
                res.status(201).json(user);
            }); 
        }
        else{
            res.status(401).json({
                success: false,
                message: "dup id"
            })
        }
    })
}

exports.login = (req, res) =>{
	const { id, pw } = req.body;
	const secret = Env.jwt.secret; 
	//TODO verify input
	const check =(user) =>{
		if(!user){
			throw new Error('login failed')
		}else{
			const p = new Promise((resolve, reject) => {
				jwt.sign(
					{
						ix: user.ix,
						id: user.id,
						name: user.name,
						is_admin: user.is_admin
					}, 
					secret, 
					{
						expiresIn: '7d', //TODO config
						subject: 'userInfo'
					}, (err, token) => {
						if (err) reject(err)
						resolve(token) 
					})
			})
			return p
		}

	}

	const respond = (token) => {
        res.json({
			success: true,
            message: 'logged in successfully',
            token
        })
	}
	// error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message,
			success: false
        })
    }
	
	User.findOne({
		where:{
			id,pw
		}
	}).then(check)
	.then(respond)
	.catch(onError)
}


exports.info = (req, res) => {
    // read the token from header or url 
    const token = req.headers['x-access-token'] || req.query.token

    console.log(req.decoded);
    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, Env.jwt.secret, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if token is valid, it will respond with its info
    const respond = (token) => {
        res.json({
            success: true,
            info: token
        })
    }

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then(respond).catch(onError)
}

exports.getUserInfo = (req, res)=>{
	const user_ix = req.query.user_ix || req.params.user_ix
	console.log(user_ix)
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }
	User.findOne({
		where:{
			ix:user_ix
		}
	}).then((user) => {
		user.pw = "Secret"
		res.json({
			success: true,
            user
        })
	}).catch(onError)
}

exports.check  = (req, res, next) => {
    // read the token from header or url 
    const token = req.headers['x-access-token'] || req.query.token

    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, Env.jwt.secret , (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then((decoded)=>{
        req.decoded = decoded
        next()
    }).catch(onError)
}


exports.ckusr  = (req, res, next) => {
    // read the token from header or url 
    const token = req.headers['x-access-token'] || req.query.token

    // token does not exist
    if(!token) {
		req.decoded = {}
		console.log("NO TOKEN!!!!!!!!!!!!!!!!!!!!!!!!!")
		next()
	}
	else{

		// create a promise that decodes the token
		const p = new Promise(
			(resolve, reject) => {
				jwt.verify(token, Env.jwt.secret , (err, decoded) => {
					if(err) reject(err)
					resolve(decoded)
				})
			}
		)

		// if it has failed to verify, it will return an error message
		const onError = (error) => {
			res.status(403).json({
				success: false,
				message: error.message
			})
		}

		// process the promise
		p.then((decoded)=>{
			req.decoded = decoded
			next()
		}).catch(onError) 
	}
}
