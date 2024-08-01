const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.get('/forms', formController.getForms);
router.post('/forms', formController.createForm);
router.get('/forms/:id', formController.getForm);
router.put('/forms/:id', formController.updateForm);
router.delete('/forms/:id', formController.deleteForm);

module.exports = router;
