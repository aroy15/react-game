import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [randomValueOne, setRandomValueOne] = useState(Math.ceil(Math.random() * 50))
  const [randomValueTwo, setRandomValueTwo] = useState(Math.ceil(Math.random() * 10));
  const [correctResult, setCorrectResult] = useState(randomValueOne + randomValueTwo);
  const [quantity, setQuantity] = useState(10)
  const [examTime, setExamTime] = useState(5000);
  const [examNumber, setExamNumber] = useState(10)
  const [userResult, setUserResult] = useState(0);
  const [remainingTime, setRemainingTime] = useState(examTime);

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

  const timerFunc = () => {
    const newOne = Math.ceil(Math.random() * 50);
    const newTwo = Math.ceil(Math.random() * 10)

    setRandomValueOne(newOne)
    setRandomValueTwo(newTwo)
    setQuantity(quantity - 1)
    setCorrectResult(newOne + newTwo);
    if(quantity <=3){
      setExamNumber(50);
      setExamTime(1000)
      setRemainingTime(1000)
    }else if(quantity <=5){
      setExamNumber(40);
      setExamTime(2000)
      setRemainingTime(2000)
    }else if(quantity <=7){
      setExamNumber(30);
      setExamTime(3000)
      setRemainingTime(3000)
    }else if(quantity <=9){
      setExamNumber(20);
      setExamTime(4000)
      setRemainingTime(4000)
    }
    // console.log('quantity inside = ', quantity, examTime, examNumber)
  }

  useEffect(() => {
      const interval = setInterval(() => {
        if (isLoggedIn && !quantity == 0) {
          timerFunc()
          setRemainingTime(remainingTime-100)        
        }
      }, examTime)
      return () => clearInterval(interval);
  }, [quantity, examTime, isLoggedIn])

  useEffect(()=>{
    const remainingInterval = setInterval(()=>{
      if(isLoggedIn && remainingTime!=0){
        setRemainingTime(remainingTime-100)
      }
    },100)
   return ()=> clearInterval(remainingInterval);
  },[remainingTime, isLoggedIn])

  console.log(`${randomValueOne} + ${randomValueTwo} =  ${correctResult}`)

  const handleQuestionAnswer = event => {
    event.preventDefault();
    setError('')
    const answer = event.target.answer.value;
    if (!answer) {
      return setError('please provide the answer')
    }
    if (correctResult == answer) {
      setUserResult(userResult + examNumber)
    } else {
      setUserResult(userResult - 5)
    }
    event.target.reset();
    timerFunc()
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

              <div style={{marginTop:'20px'}}>Remaining Time: {parseFloat(remainingTime/1000).toFixed(2)} second</div>
            </form>
            :
            <div>
              You have got: {userResult}
            </div>
      }
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
}

export default App;