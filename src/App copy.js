import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [randomValueOne, setRandomValueOne] = useState(Math.ceil(Math.random() * 50))
  const [randomValueTwo, setRandomValueTwo] = useState(Math.ceil(Math.random() * 10));
  const [quantity, setQuantity] = useState(10)
  const [examTime, setExamTime] = useState(2000);

  const handleLogin = event => {
    event.preventDefault();
    setError('')
    const name = event.target.name.value;
    if (!name) {
      return setError('please enter your name')
    }
    const singleUser = {
      id: `id_${users?.length + 1}`,
      name
    }
    const newUsers = [...users, singleUser]
    setUsers(newUsers)

    localStorage.setItem('gameUsers', JSON.stringify(newUsers))
    setIsLoggedIn(true)
  }

  useEffect(() => {
  
    if(quantity==0){
      clearInterval()
      return;
    }
    if (isLoggedIn && quantity > 0) {
      setInterval(() => {
        setRandomValueOne(Math.ceil(Math.random() * 50))
        setRandomValueTwo(Math.ceil(Math.random() * 10))
        setQuantity(quantity - 2)
      }, examTime)
    }
  }, [quantity, examTime, isLoggedIn])

  const handleQuestionAnswer = event => {
    event.preventDefault();
    setError('')
    const correctAnswer = randomValueOne + randomValueTwo
    const answer = event.target.answer.value;
    if (!answer) {
      return setError('please provide the answer')
    }
    if (correctAnswer != answer) {
      console.log('wrong', answer)
    } else {
      console.log('Right', answer)
    }
  }

  return (
    <div className="App">
      {
        !isLoggedIn ?
          // Login Form
          <form onSubmit={handleLogin}>
            <p>Login: <input name='name' type="text" placeholder='Enter Your Name' /></p>
            <button type="submit">Submit</button>
          </form>
          : !quantity == 0 ?
            // Answer Area
            <form onSubmit={handleQuestionAnswer}>
              {randomValueOne} + {randomValueTwo} = <input type="number" name='answer' placeholder='please put your answer' />
              <button type="submit" style={{ marginLeft: '8px' }}>Submit</button>
            </form>
            :
            <div>
              your result

            </div>
      }
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
}

export default App;
