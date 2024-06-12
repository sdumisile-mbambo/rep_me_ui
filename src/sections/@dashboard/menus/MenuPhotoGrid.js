import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Card, Grid, Avatar, CardContent, IconButton } from '@mui/material';
import React, { createRef, useRef, useEffect, useState,  useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

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

MenuPhotoGrid.propTypes = {
  chef: PropTypes.object.isRequired,
};

export default function MenuPhotoGrid({ menu, updateMenuPictures }) {
  const [photos, setPhotos] = useState(menu?.imageGallery);
  const fileRef = createRef();
  const editor = useRef(null);

  const onFileInputChange = (e) => {
    // setAvatar(URL.createObjectURL(e.target.files[0]));
    updateMenuPictures(e.target.files);
  };

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log('acceptedFiles', acceptedFiles);
    updateMenuPictures(acceptedFiles);
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Grid item xs={12} sm={6} md={8}>
      <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>

        <CardContent>
          <TitleStyle color="inherit" variant="subtitle2">
            {`${menu?.name} Image Gallery`}
          </TitleStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
