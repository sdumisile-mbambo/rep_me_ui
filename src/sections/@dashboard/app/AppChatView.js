// @mui
import PropTypes from 'prop-types';
import React, { createRef, useRef, useEffect, useState, useCallback } from 'react';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { GiftedChat } from 'react-web-gifted-chat';
// import { Input, MessageList } from 'react-chat-elements';
import { fToNow } from '../../../utils/formatTime';
// components
import Scrollbar from '../../../components/Scrollbar';

AppChatView.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppChatView({ title, subheader, list, ...other }) {
  const [messages, setMessages] = useState([]);

  const onMessageSend = (message) => {
    console.log('Here is a message', message);
  };

  return <Card {...other} sx={{ height: 500, backgroundColor: '#e2dfdf66', padding: 2 }} />;
}
