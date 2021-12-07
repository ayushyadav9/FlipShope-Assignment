import React from 'react'
import styled from 'styled-components'
/*global chrome*/
const CursorTile = ({item , setSelectedCursor,selectedCursor}) => {

    const handelCurser = (id)=>{
        setSelectedCursor(id)
        chrome.tabs.query({}, function (tabs) {
            for(let i=0; i<tabs.length; i++){
                chrome.tabs.sendMessage(tabs[i].id, {msg: "update",id:id});
            }
        });
    }

    return (
        <Tile onClick={()=>handelCurser(item.id)} >
            <div className={selectedCursor===item.id?"tile is-selected":"tile"} tabIndex={1}>
                <img src={`img/cursors/arrows/${item.image}`} className="tile__image" alt=""/>
                <div className="tile__button"></div>
                <div className="tile__title">
                    {item.name}
                </div>
            </div>
        </Tile>
    )
}

const Tile = styled.div`    
.tile {
    transition: all 200ms;
    box-shadow: 0 0 2px -2px rgba(0, 0, 0, 0.5);
    width: 9rem;
    max-width: calc(25% - 1em);
    float: left;
    position: relative;
    margin: 1em 0.5em;
    cursor: pointer;
}
.tile::before {
    content: "";
    background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.1));
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 28px;
    transition: all 200ms;
    opacity: 0;
}
.tile.is-selected {
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
    transform: translateY(-2px);
}
.tile.is-selected::before {
    opacity: 1;
}
.tile__image {
    display: block;
    width: 40px;
    height: 45px;
    margin-left: 50px;
    margin-top: 6px;
}
.tile__button {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
    transition: all 200ms;
}
.tile:not(.is-selected):hover .tile__button, .tile.is-selected .tile__button {
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 12px 1px rgba(0, 0, 0, 0.5);
    transform: translateY(-1px);
}
.tile.is-selected .tile__button {
    background-color: rgba(0, 255, 255, 0.8);
}
.tile__title {
    position: inherit;
    bottom: 0;
    left: 0;
    margin-top: 0.7rem;
    right: 34px;
    color: white;
    text-size: 14px;
    padding: 0.4em 0.8em;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-font-smoothing: antialiased;
    font-weight: 600;
    transition: all 200ms;
}
.tile:hover .tile__title, .is-selected .tile__title {
    background-color: rgba(0, 0, 0, 0.65);
}

`

export default CursorTile
