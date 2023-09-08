const { Router } = require('express');
const router = Router();
const {
    getById,
    addCommint
} = require('../controllers/commint.controller');

router.get('/:id', getById);
router.post('/add', addCommint);
// router.post('/update', updateDairy);
// router.delete('/delete', deleteDairy);

module.exports = router;
