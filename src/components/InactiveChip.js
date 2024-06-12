import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function InactiveChip() {
  return <Chip label="Inactive"  variant="outlined" sx={{
    ml: 2,
    maxHeight: 15,
  }}/>;
}
