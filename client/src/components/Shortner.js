import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { API_PATH, getBaseUrl, postData } from '../api/utils';
import LinkContext from '../context/link-context';

export default function Shortner() {
  const { updateDateTimeUpdate } = React.useContext(LinkContext);
  const [longUrl, setLongUrl] = React.useState('');
  const [shortId, setShortId] = React.useState('');

  const generateShortUrl = () => 
    postData(API_PATH.ENCODE, { redirectToUrl: longUrl }).then((v) => {
      setShortId(v.shortId);
      updateDateTimeUpdate();
    });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={0}>
        <Grid item xs>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="http://www.my_long_url.com"
              inputProps={{ 'aria-label': 'http://www.my_long_url.com' }}
              onChange={(v) => setLongUrl(v.target.value) }
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={generateShortUrl}>
              <PublishedWithChangesIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs="auto">
          <ArrowForwardIosIcon />
        </Grid>
        <Grid item xs>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', direction: 'row', alignItems: 'center', width: '100%' }}
          >
            <Typography sx={{ display: 'flex', width: '100%' }}>
              {getBaseUrl()}/{shortId}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};