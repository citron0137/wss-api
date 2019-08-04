const router = require('express').Router()

const auth = require('./auth')
const board = require('./board')

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)
router.get('/auth/check', auth.check ,auth.info)
//router.post('/auth/logout',auth.check, auth.logout)

router.get('/board/', auth.check ,board.findBoardByName)
router.get('/board/:ix', auth.check, board.findBoardByIx)
router.post('/board', auth.ckAdm ,board.createBoard)
router.put('/board/:ix', auth.ckAdm ,board.updateBoard)
//router.delete('/board/:ix', auth.check ,board.deleteBoard)

module.exports = router

