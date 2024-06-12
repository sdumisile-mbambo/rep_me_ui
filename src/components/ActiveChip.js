import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ActiveChip() {
  return (
    <Chip
      label="Active"
      color="success"
      variant="outlined"
      sx={{
        ml: 2,
        maxHeight: 15,
      }}
    />
  );
}
