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
        player: player,
        word: word,
        guessed: '_'.repeat(word.length)
    }

    playersMatchInfo.push(playerInfo);
    res.send(playerInfo);
})

app.put('/api/guess/:id', (req, res) => {
    const playerInfo = playersMatchInfo.find(p => p.player.id === parseInt(req.params.id));
    const index = playersMatchInfo.findIndex(p => p.player.id === parseInt(req.params.id));
    const letter = req.body.letter;

    if(playerInfo.player.hp <= 0) {
        res.send(playerInfo);
        return;
    }

    if(playerInfo.word.indexOf(letter) !== -1) {
        for(var i=0; i < playerInfo.word.length; i++) {
            if(playerInfo.word[i] === letter) {
                playerInfo.guessed = setCharAt(playerInfo.guessed, i, letter)
            }
        }
    }
    else {
        playerInfo.player.hp -= 1;
    }

    playersMatchInfo[index] = playerInfo;
    res.send(playerInfo);
})

app.put('/api/restart/:id', (req, res) => {
    const playerInfo = playersMatchInfo.find(p => p.player.id === parseInt(req.params.id));
    const index = playersMatchInfo.findIndex(p => p.player.id === parseInt(req.params.id));

    playerInfo.player.hp = 10;
    playerInfo.word = words[Math.floor(Math.random() * words.length)];
    playerInfo.guessed = '_'.repeat(playerInfo.word.length);
    
    playersMatchInfo[index] = playerInfo;
    res.send(playerInfo);
})

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

app.listen(9000, () => console.log('Server started on port 3000'));