const express = require('express');
const app = express();

app.use(express.json());

const words = ['axa'];

const playersMatchInfo = [
];

app.post('/api/players', (req, res) => {
    if(req.body.name.length < 3) {
        res.status(400).send('Player name must be at least 3 characters long');
        return;
    }

    const player = {
        id: playersMatchInfo.length + 1,
        name: req.body.name,
        hp: 10
    };

    const word = words[Math.floor(Math.random() * words.length)];

    const playerInfo = {
        id: playersMatchInfo.length + 1,
        player: player,
        word: word,
        guessed: '_'.repeat(word.length)
    }

    playersMatchInfo.push(playerInfo);
    res.send(playerInfo);
})

app.listen(3000, () => console.log('Server started on port 3000'));