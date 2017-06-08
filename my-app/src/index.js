import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import './client/index.css';
import ChatArea from './client/room.js';

var socket = io();

ReactDOM.render(
    <ChatArea />,
    document.getElementById('root')
 );