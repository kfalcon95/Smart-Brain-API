const Clarifai = require('clarifai'); //https://clarifai.com/developer/guide/#getting-started

const app = new Clarifai.App({
 apiKey: 'd75d6df393b34d99966d5e24845a08ce'
});

const handleAPICall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)     //using this.state.input instead of imageUrl because React is not done updating the state at this point
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json("Unable to work with API"))
};
const handleImage = (req, res, db) => {
	const { id } = req.body;
	return db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json("Unable to get entries"))
};

module.exports = {
	handleImage, //: handleImage
	handleAPICall
};