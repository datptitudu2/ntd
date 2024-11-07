
import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './components/ToDoList'
/*const App =()=>{
  const randomAge=Math.floor(Math.random()*10);
  const imgSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Logo_PTIT_University.png/600px-Logo_PTIT_University.png'
  return (
    <div className='edit'>
    Hello,my name is Nguyen Tien Dat PTIT.I'm {randomAge} years old.
    <img src={imgSrc} style={{width:'200px',heigh:'100px'}}/>
    </div>

  );

};*/

/* class Counter extends React.Component {
  constructor(props){
    super(props);
    this.state={count:0};
  }
  incrementCount=()=> {
    this.setState({count:this.state.count+1});
  }
  render(){
    return (
      <div>
        Count:{this.state.count}
      <button onClick={this.incrementCount}>
        Increment
      </button>

      </div>
    );
  }
}

const App=()=> {
  return <Counter/>
} */


/* function Greeting(props) {
  return <div>Hello,{props.name}!</div>;
}
const App=()=> {
  return <Greeting name='PTIT'/>;
}
 */

function App(){
  return (
    <div className='App'>
      <ToDoList></ToDoList>
    </div>

  );
}

export default App;
