// ChatScreen.js
import React from 'react';
import {
    GiftedChat
} from 'react-native-gifted-chat';

export default class ChatScreen extends React.Component {
    state = {
        messages: [],
    };

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {
        return ( <
            GiftedChat messages = {
                this.state.messages
            }
            onSend = {
                (messages) => this.onSend(messages)
            }
            user = {
                {
                    _id: 1,
                }
            }
            />
        );
    }
}