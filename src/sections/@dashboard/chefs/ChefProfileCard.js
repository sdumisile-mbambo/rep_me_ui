import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import AvatarEditor from 'react-avatar-editor';
import { Card, Grid, Avatar, CardContent, IconButton } from '@mui/material';
import React, { createRef, useRef, useEffect, useState } from 'react';
// ----------------------------------------------------------------------

const TitleStyle = styled('div')({
  minHeight: 50,
  fontsize: 23,
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  width: 182,
  height: 182,
  margin: 20,
}));

// ----------------------------------------------------------------------

ChefProfileCard.propTypes = {
  chef: PropTypes.object.isRequired,
};

export default function ChefProfileCard({ chef, updateChefPicture }) {
  const { name, surname, chefSummary, profilePicture } = chef;
  const [avatar, setAvatar] = useState(profilePicture);
  const fileRef = createRef();
  const editor = useRef(null);

  const onFileInputChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    updateChefPicture(e.target.files[0]);
  };

  return (
    <Grid item xs={12} sm={6} md={8}>
      <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
        <IconButton aria-label="delete" onClick={() => fileRef.current?.click()}>
          <AvatarStyle alt={`${name} ${surname}`} src={avatar} />
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileRef}
            onChange={onFileInputChange}
            accept="image/png,image/jpeg,image/gif"
          />
        </IconButton>

        <CardContent>
          <TitleStyle color="inherit" variant="subtitle2">
            {chefSummary}
          </TitleStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
