import { useEffect, useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Paper,
  CircularProgress,
  Grid,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { faker } from '@faker-js/faker';
// import { ChatList } from 'react-chat-elements';
// import AppChatView from '../../sections/@dashboard/app/AppChatView';
import { AppNewsUpdate } from '../../sections/@dashboard/app';
import Page from '../../components/Page';

export default function ChatListComponent() {
  return (
    <Page title="Messages">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Messages
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}
