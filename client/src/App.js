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

function displayKeyboardKey(letter, userInfo, setUserInfo, setLetter) {
  const handleKeyboardKeyClick = async e => {
    const data = await makeAPIRequest('guess/' + userInfo.player.id, 'PUT', {
      letter
    });
    setUserInfo(data);
    setLetter('');
  }

  if(userInfo.wrongLetters.indexOf(letter) !== -1) {
    return <button onClick={handleKeyboardKeyClick} class="p-0 mb-2 mx-1 bg-danger text-white text-center rounded" style={{width: '30px', height: '30px', display: 'inline-block'}}>{letter}</button>
  }
  else if(userInfo.guessed.indexOf(letter) !== -1) {
    return <button onClick={handleKeyboardKeyClick} class="p-0 mb-2 mx-1 bg-success text-white text-center rounded" style={{width: '30px', height: '30px', display: 'inline-block'}}>{letter}</button>
  }

  return <button onClick={handleKeyboardKeyClick} class="p-0 mb-2 mx-1 bg-light text-dark text-center rounded" style={{width: '30px', height: '30px', display: 'inline-block'}}>{letter}</button>
}

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState('');
  const [letter, setLetter] = useState('');
  const [nameSubmited, setNameSubmited] = useState(false);
  const firstKeyboardRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const secondKeyboardRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const thirdKeyboardRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

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
      <div className="container-sm mt-1 border rounded" style={{padding: '7px', marginBottom: "50px", background: 'white', maxWidth: '400px'}}>
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
          <form class="form-inline">
            <div class="form-group mb-2">
                <input type="text" value={letter} onChange={e => setLetter(e.target.value)} maxLength="1" className="form-control" placeholder="Letter" />
            </div>
            <div class="form-group mb-2">
                <Button onClick={handleGuess}>Guess</Button>
            </div>
          </form>
          <div className="d-flex justify-content-center">{firstKeyboardRow.map(l => displayKeyboardKey(l, userInfo, setUserInfo, setLetter))}</div>
          <div className="d-flex justify-content-center">{secondKeyboardRow.map(l => displayKeyboardKey(l, userInfo, setUserInfo, setLetter))}</div>
          <div className="d-flex justify-content-center">{thirdKeyboardRow.map(l => displayKeyboardKey(l, userInfo, setUserInfo, setLetter))}</div>
         </div>
        }
      </div>
    </div>
  )
}

export default App;
