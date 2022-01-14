import {Button} from "react-bootstrap";
import {useState} from "react"
import React from "react"
import Heading from './components/heading'

async function makeAPIRequest(endpoint, method, body) {
  return fetch('http://localhost:9000/api/' + endpoint, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  })
      .then(data => data.json())
}

function showWordToBeGuessed(word) {
  let wordToDisplay = '';
  for(var i = 0; i < word.length; i++) {
    wordToDisplay += word[i];
    wordToDisplay += ' ';
  }
  return (<div>{wordToDisplay}</div>)
}

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState('');
  const [letter, setLetter] = useState('');
  const [nameSubmited, setNameSubmited] = useState(false);

  const handleStartGame = async e => {
    setNameSubmited(true);
    const data = await makeAPIRequest('players', 'POST', {
      name
    });
    setUserInfo(data);
  }

  const handleGuess = async e => {
    const data = await makeAPIRequest('guess/' + userInfo.player.id, 'PUT', {
      letter
    });
    setUserInfo(data);
    setLetter('');
  }

  const handleStartOver = async e => {
    const data = await makeAPIRequest('restart/' + userInfo.player.id, 'PUT', {});
    setUserInfo(data);
    setLetter('');
  }

  return(
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh", background: '#E8E8E8'}}>
      <div className="container-sm mt-1 border rounded" style={{padding: '7px', marginBottom: "50px", background: 'white', maxWidth: '300px'}}>
        <Heading text='Hangman' />
        {userInfo == null ? 
        <div>
          {nameSubmited && name.length < 3 && <p class="text-danger">Username must be at least of 3 symbols</p>}
          <input type="text" onChange={e => setName(e.target.value)} className="form-control" placeholder="Username" /><br/>
          <Button onClick={handleStartGame}>Start</Button>
        </div> : userInfo.word === userInfo.guessed ?
         <div>You did this!<br/>
         Word: {userInfo.word}<br/>
         <Button onClick={handleStartOver}>Play again</Button>
         </div> : userInfo.player.hp == 0 ?
         <div>
           You lost!<br/>
           Word: {userInfo.word}<br/>
           <Button onClick={handleStartOver}>Play again</Button>
         </div> :
        <div>
          Guesses left: <b>{userInfo.player.hp}</b><br/>
          Word: {showWordToBeGuessed(userInfo.guessed)}<br/>
          <input type="text" value={letter} onChange={e => setLetter(e.target.value)} maxLength="1" className="form-control" placeholder="Letter" /><br/>
          <Button onClick={handleGuess}>Guess</Button>
         </div>
        }
      </div>
    </div>
  )
}

export default App;
