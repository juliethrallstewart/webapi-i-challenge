// implement your API here

const express = require('express');

const Db = require('./data/db.js');

const server = express();

server.use(express.json());

const port = 8000;

server.listen(port, () => console.log('api running'));

server.get('/', (req, res) => {
	res.send('hello julie'); //send back to the client, can be html
});

server.get('/api/users/', (req, res) => {
	Db.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(e => {
			res.status(500).json({ error: 'The users information could not be retrieved.' });
		});
});

server.get('/api/users/:id', (req, res) => {
	// const id = req.params.id;
	const { id } = req.params;
	console.log(id);
	Db.findById(id)
		.then(user => {
			if (user) {
				res.status(200).json(user);
			}
			else {
				res.status(404).json({ message: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(e => {
			res.status(500).json({ error: 'The user information could not be retrieved.' });
		});
});

server.post('/api/users/', (req, res) => {
	const newUser = req.body;
	console.log(newUser);
	Db.insert(newUser)
		.then(user => {
			if (newUser.name && newUser.bio) {
				res.status(201).json(newUser);
			}
			else {
				res.status(404).json({ errorMessage: 'Please provide name and bio for the user.' });
			}
		})
		.catch(e => {
			res.status(500).json({ error: 'There was an error while saving the user to the database' });
		});
});

server.put('/api/users/:id', (req, res) => {
	const { id } = req.params;
	console.log(id);
	const changes = req.body;
	console.log(changes);
	Db.update(id, changes)
		.then(updatedUser => {
			if (updatedUser) {
				res.status(200).json(updatedUser);
			}
			else {
				res.status(404).json({ message: 'The user with the specified ID does not exist.' });
			}
			res.status(200).json({ message: 'user updated successfully' });
		})
		.catch(e => {
			res.status(500).json({ error: 'The user information could not be modified.' });
		});
});

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	Db.remove(id)
		.then(result => {
			if (result) {
				res.status(200).json({ message: 'user deleted successfully' });
			}
			else {
				res.status(404).json({ message: 'The user with the specified ID does not exist.' });
			}
		})
		.catch(e => {
			res.status(500).json({ error: 'The user could not be removed' });
		});
});
