// @mui
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
// components

export default function MerchantCard() {
  return (
    <Box
      sx={{
        minHeight: 160,
        height: 190,
        minWidth:300
      }}
    >

      <Avatar alt="payfaast" src="/static/illustrations/full_colour on_white.png" variant="square" sx={{ width: 200, height: 90 }} />
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item kxs={12} sm={6} md={6}>
          <Avatar alt="Master Card" src="/static/illustrations/master_card.png" variant="square" sx={{ width: 115, height: 70 }} />
        </Grid>
        <Grid item kxs={12} sm={6} md={6}>
          <Avatar alt="Visa" src="/static/illustrations/visa.png" variant="square" sx={{ width: 155, height: 50 }} />
        </Grid>
      </Grid>
    </Box>
  );
}
