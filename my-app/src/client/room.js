import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

let socket = io();
let room = "Chatting";
let username = "Candy";

class Log extends React.Component {
    render() {
        return(
            <li className="log">{this.props.log}</li>
        );
    }
}

class MessageItem extends React.Component {
    render() {
        return(
            <li className="message-item">{this.props.message}</li>
        );
    }
}

class MessageArea extends React.Component {
    render() {
        let message = this.props.data.map((item, index) => {
            let itemMessage = item.userName + " " + item.message;
            return(
                <MessageItem key={itemMessage + index} message={itemMessage} />
            );
            
        });

        return(
            <ul className="message-area">
                {message}
            </ul>
        );
    }
}

class InputArea extends React.Component {
    render() {
        return(
            <input 
                className="input-area" 
                type="text" 
                placeholder="Type here..." 
                onChange={this.props.inputChange}
            /> 
        );
    }
}

class ChatArea extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            currentInput: '',
        };
        this.inputChange = this.inputChange.bind(this)
        this.addMessage = this.addMessage.bind(this);
    }

    addMessage(newData) {
        let data = this.state.data;
        data.push({
            userName: newData.username,
            type: newData.type,
            message: newData.message
        });
       
        this.setState({
            data: data
        });
    }

    componentDidMount() {
        document.addEventListener('keydown', (event) => {
            if(event.keyCode == 13) {
                console.log("down");
                let newData = {
                    username: username,
                    type: "message",
                    message: this.state.currentInput
                };
                this.addMessage(newData);
                socket.emit('add message', {userName: username, message: this.state.currentInput});
            }
        })
    }

    componentWillMount() {
        socket.on('add message', (data) => {
            console.log("bb");
            this.addMessage(data);
        });
    }

    inputChange(event) {
        this.setState({
            currentInput: event.target.value
        });
    }

    render() {
        return(
            <div>
                <MessageArea data={this.state.data} />
                <InputArea inputChange={this.inputChange} />
            </div>
        );
    }
}

export default ChatArea;