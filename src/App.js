import { useState } from 'react' 
import './App.css';



function App() {
  const [question, setQuestion] = useState(null)
  const [answer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)

  const getQuestion = async () => {
    try {
      const res = await fetch('https://jservice.io/api/random')
      const data = await res.json()
      console.log(data);
      setQuestion(data[0]) //sets the question data
      setScore(score + data[0].value) //Adding the score after each question answered
      setShowAnswer(false) //Hides the answer for the next get question
    } catch (error) {
      
    }
  }
  const resetGame = () => {
    setQuestion(null)
    setShowAnswer(false)
    setScore(0)
  }
  return (
    <div className="app">
      <div className='wrapper'>
      <div className='welcome'>
        <h1 style={{textAlign: 'center'}}>Welcome To Jeopardy!</h1>
      </div>
      <div className='score'>
       <h3>Score: {score}</h3>
      </div>
      <div className='button-container'>
        <button className='btn1' onClick={() => setScore(score - 1)}>Decrease</button>
        <button className='btn2' onClick={() => setScore(score + 1)}>Increase</button>
        <button className='btn3'onClick={resetGame}>Reset</button>
      </div>
        
     
      <div className='play'>
        <h3>Let's Play!</h3>
      </div>    
      <div className='question-container'>
        <button className='question' onClick={getQuestion}>Get Question</button>
      </div>
      {
        question === null ? null
        : 
      <>
        <div className='question1'>
          <h4>Question: {question?.question}</h4> 
        </div>
        <div className='category'>
          <h4>Category: {question?.category.title}</h4>
        </div>
        <div className='points'>
          <h4>Points: {question?.value}</h4>
        </div>
        <div className='answer'>
          <h3>Answer: {answer === false ? "" :question?.answer}</h3>
        </div>
        <div className='reveal-question'>
          <button className='question-btn' onClick={() => setShowAnswer(true)}>Click to Reveal Answer</button>
        </div>
      </>
      }
      </div>
    </div>

  );
}


export default App;
