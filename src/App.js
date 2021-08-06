import logo from './logo.svg';
import './App.css';
import {responseFromApi} from './data'
import {  useState } from 'react';

function App() {
  const data=responseFromApi;
  const [loc,setLoc]=useState("");
  var objs=[{}];

 
  
  return (
    <div className="App container">
      <input type="text" data-testid="input" placeholder="Type First two letters of the Location." onChange={event=>{setLoc(event.target.value)}}  />
      <ul className="collection">
      
      {
        data.data.dashboard.components.filter((val,key)=>{
          if(loc==""){
            objs=[{}]
            return val
          }else if((val.location.toLowerCase().substr(0,2))==loc.toLowerCase()){
            objs.push({location:val.location,obj:data.data.dashboard.components[key]} )
            console.log(objs)
            return val
          }
        }).map((val,key)=>{

          return <li className="collection-item" key={key} style={{padding:10,backgroundColor:"#bfe6ff",margin:10}}>{val.location} </li>

        })
      }
    </ul>

    </div>
  );
}

export default App;
