import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import {styled } from '@mui/material/styles';
import { Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import SvgIconStyle from '../../../components/SvgIconStyle';
import ActiveChip from '../../../components/ActiveChip';
import InactiveChip from '../../../components/InactiveChip';
// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

PackageCard.propTypes = {
  cuisine: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function PackageCard({ cuisine }) {
  const { coverImage, name, price, active, share, description, id } = cuisine;
  return (
    <Grid item xs={12} sm={12} md={3}>
      <Card sx={{ position: 'relative', minHeight: 400 }}>
        <CardMediaStyle>
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
            }}
          />
          <AvatarStyle alt="Admin" src={'/static/mock-images/avatars/avatar_default.jpg'} />

          <CoverImgStyle
            alt={name}
            src={coverImage !== null ? coverImage : '/static/mock-images/covers/undraw_Eating_together_re_ux62.png'}
          />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: 180,
          }}
        >
          <TitleStyle
            to={`/dashboard/cuisine/${id}`}
            state={{ cuisine }}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {description} {active ? <ActiveChip /> : <InactiveChip />}
          </TitleStyle>
          
          <Typography gutterBottom sx={{ color: 'text.disabled', display: 'block' }}>
            {`ZAR ${price} p.p`}
          </Typography>

          {/* <InfoStyle>
            {cuisineList.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle> */}
        </CardContent>
      </Card>
    </Grid>
  );
}
