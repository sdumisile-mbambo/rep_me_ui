import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function LoadSkeletonGrid() {
  return (
    <Grid container wrap="nowrap">
      <Box key={1} sx={{ width: 260, marginRight: 0.5, my: 5 }}>
        <Skeleton variant="rectangular" width={260} height={158} />

        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Box>
      <Box key={2} sx={{ width: 260, marginRight: 0.5, my: 5 }}>
        <Skeleton variant="rectangular" width={260} height={158} />

        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Box>
      <Box key={3} sx={{ width: 260, marginRight: 0.5, my: 5 }}>
        <Skeleton variant="rectangular" width={260} height={158} />

        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Box>
    </Grid>
  );
}
