const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/upload');
	},

	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname); //
		cb(null, file.fieldname + '-' + uniqueSuffix);
	},
});

const upload = multer({
	storage: storage,
	limites: { fileSize: 1000000 },
	filFilter: function (req, file, cb) {
		checkfile(file, cb);
	},
});

function checkfile(file, cb) {
	const filetypes = /jpeg|jpg|png|gif|/;
	const exnames = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetypes = filetypes.test(file.mimetype);

	if (exnames && mimetypes) {
		return cb(null, true);
	} else {
		cb('Enter: You can only upload image files');
	}
}
module.exports = {
	upload,
};
