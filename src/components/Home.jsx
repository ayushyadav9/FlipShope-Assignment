import React,{useState} from "react";
import styled from "styled-components"
import CursorTile from "./CursorTile";
import cursors from "./cursors";
/*global chrome*/

const Home = () => {
  const [active, setActive] = useState(0);
  const [selectedCursor, setSelectedCursor] = useState(null)

  const handeActive = (id)=>{
    setActive(id)
  }
  const handelReset = ()=>{
    chrome.tabs.query({}, function (tabs) {
      for(let i=0; i<tabs.length; i++){
          chrome.tabs.sendMessage(tabs[i].id, {msg: "reset"});
        }
    });
  }

  return (
    <Main style={{cursor:`url(img/cursors/arrows/${selectedCursor}.png), auto`}}>
    <Header>
        <nav>
            <ul>
                <li> <span className={active===0?"tooltip active":"tooltip"} data-tooltip="Featured" onClick={()=>handeActive(0)}><i class="fa fa-angellist"></i> </span> </li>
                <li> <span className={active===1?"tooltip active":"tooltip"} data-tooltip="Colors" onClick={()=>handeActive(1)}> <i class="fa fa-slideshare"></i> </span></li>
                <li> <span className={active===2?"tooltip active":"tooltip"} data-tooltip="Animals" onClick={()=>handeActive(2)}> <i class="fa fa-500px"></i></span></li>
                <li> <span className={active===3?"tooltip active":"tooltip"} data-tooltip="Overwatch" onClick={()=>handeActive(3)}> <i class="fa fa-connectdevelop"></i> </span> </li> 
                <li> <span className={active===4?"tooltip active":"tooltip"} data-tooltip="Emoji" onClick={()=>handeActive(4)}> <i class="fa fa-gitlab"></i> </span> </li> 
                <button className="learn-more" onClick={handelReset}>Reset</button>
            </ul>
        </nav>
    </Header>
    <Icons>
      {cursors[active].data.map((item,i)=>{
        return <CursorTile key={i} item={item} setSelectedCursor={setSelectedCursor} selectedCursor={selectedCursor}/>
      })}
    </Icons>
  </Main>
  );
};

const Main = styled.div`
  button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
  }
  button.learn-more {
    font-weight: 600;
    color: #382b22;
    text-transform: uppercase;
    top:-2px;
    padding: 1px 1em 6px 1em;
    background: #fff0f0;
    border: 2px solid #b18597;
    border-radius: 0.75em;
    transform-style: preserve-3d;
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  button.learn-more::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 90%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f9c4d2;
    border-radius: inherit;
    box-shadow: 0 0 0 2px #b18597, 0 0em 0 0 #ffe3e2;
    transform: translate3d(0, 0.6em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  button.learn-more:hover {
    background: #b18597;
    transform: translate(0, 0.1em);
  }
  button.learn-more:hover::before {
    box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
    transform: translate3d(0, 0.5em, -1em);
  }
  button.learn-more:active {
    background: #ffe9e9;
    transform: translate(0em, 0.75em);
  }
  button.learn-more:active::before {
    box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
    transform: translate3d(0, 0, -1em);
  }
`
const Header = styled.div`
  margin-bottom:35px;
  nav{
    display: flex;
    justify-content:center;
    margin: 0;
    padding: 0;
  }
  nav ul {
    width: 100%;
    justify-content: center;
    margin: 0;
    padding: 8px 15px;
    list-style: none;
    display: flex;
    box-shadow: 0 1px 8px rgba(0,0,0,0.3);
  }
  nav ul li {
    padding: 3px;
  }
  nav ul li span{
    display: inline-block;
    text-decoration: none;
  }

  nav ul li span{
    height: 40px;
    width: var(--btn-width-100);
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(158, 158, 158);
    transition: .5s;
  }
  nav ul li:hover{
    background: rgba(0, 0, 0, 0.138);
    color: #444;
    border-radius: 5px;
    cursor:pointer;
  } 
  .active{
    color: #0B84ED!important; 
  }
  .tooltip{
    position: relative;
    margin: 0px 18px;
  }
  .tooltip::after{
    content: attr(data-tooltip);
    height: 30px;
    background: rgba(0,0,0,0.7);
    color: #fff;
    font-size: 1rem;
    text-align: center;
    position: absolute;
    bottom: -150%;
    padding: 5px 12px;
    line-height: 30px;
    border-radius: 3px;
    opacity: 0;
    transition: .3s;
    pointer-events: none;
    user-select: none;
    z-index:10;
  }
  .tooltip:hover::after{
    opacity: 1;
  }

  @media  screen and (max-width: 700px){
    nav ul{
      min-width: 437px;
      padding: 11px 35px;
      justify-content: space-between;
    }
    :root{
        --btn-width-100: 60px;
    }
  }
`

const Icons = styled.div`
  // display: flex;
  // justify-content: center;
`
export default Home;
