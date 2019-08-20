const router = require('express').Router()

const auth = require('./auth')
const board = require('./board')
const post = require('./post')
const comment = require('./comment')
const vote = require('./vote')

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)
router.get('/auth/check', auth.check ,auth.info)
router.get('/user/:user_ix',auth.getUserInfo)

//router.post('/auth/logout',auth.check, auth.logout)

/*
router.get('/board/', auth.check ,board.findBoardByName)
router.get('/board/:ix', auth.check, board.findBoardByIx)
router.post('/board', auth.ckAdm ,board.createBoard)
router.put('/board/:ix', auth.ckAdm ,board.updateBoard)
//router.delete('/board/:ix', auth.check ,board.deleteBoard)
*/

router.get('/board/',auth.ckusr, board.findBoardByName)
router.get('/board/:board_ix',auth.ckusr,  board.findBoardByIx)
router.post('/board',auth.check, board.createBoard)
router.put('/board/:board_ix',auth.check, board.updateBoard)
router.delete('/board/:board_ix',auth.check, board.deleteBoard)


router.post('/post/',auth.check, post.createPost)
router.get('/post/', auth.ckusr, post.findPosts)
router.get('/post/:post_ix',auth.ckusr, post.findPostByIx)
router.put('/post/:post_ix',auth.check, post.updatePost)
router.delete('/post/:post_ix',auth.check, post.deletePost)

router.post('/comment/',auth.check, comment.createComment)
router.get('/comment/', auth.ckusr,comment.findComments)
router.get('/comment/:comment_ix',auth.ckusr, comment.findCommentByIx)
router.put('/comment/:comment_ix',auth.check, comment.updateComment)
router.delete('/comment/:comment_ix',auth.check, comment.deleteComment)

router.use('/file', require('./file'))

router.post('/vote/',auth.check, vote.createVote)
router.get('/vote/',auth.ckusr, vote.findVotes)
router.get('/vote/:vote_ix', auth.ckusr,vote.findVoteByIx)
router.put('/vote/:vote_ix',auth.check, vote.updateVote)
router.delete('/vote/:vote_ix', auth.check,vote.deleteVote)

router.post('/vote_item/',auth.check, vote.createVoteItem)
router.get('/vote_item/', auth.ckusr,vote.findVoteItems)

router.post('/vote_to_item/',auth.check, vote.voteToItem)

module.exports = router

