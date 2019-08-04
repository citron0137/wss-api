const router = require('express').Router()

const auth = require('./auth')
const board = require('./board')
const post = require('./post')

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)
router.get('/auth/check', auth.check ,auth.info)
//router.post('/auth/logout',auth.check, auth.logout)

/*
router.get('/board/', auth.check ,board.findBoardByName)
router.get('/board/:ix', auth.check, board.findBoardByIx)
router.post('/board', auth.ckAdm ,board.createBoard)
router.put('/board/:ix', auth.ckAdm ,board.updateBoard)
//router.delete('/board/:ix', auth.check ,board.deleteBoard)
*/

router.get('/board/', board.findBoardByName)
router.get('/board/:board_ix',  board.findBoardByIx)
router.post('/board', board.createBoard)
router.put('/board/:board_ix', board.updateBoard)
router.delete('/board/:board_ix', board.deleteBoard)


router.post('/post/', post.createPost)
router.get('/post/', post.findPosts)
router.get('/post/:post_ix', post.findPostByIx)
router.put('/post/:post_ix', post.updatePost)
router.delete('/post/:post_ix', post.deletePost)

router.use('/file', require('./file'))

module.exports = router

