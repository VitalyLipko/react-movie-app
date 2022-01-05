import { Button, IconButton, Tooltip } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export default function FavoriteAction(props) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    setLabel(props.isFavorite ? 'Remove from favorites' : 'Add to favorites');
  }, [props.isFavorite]);

  if (props.isButton) {
    return (
      <Button
        variant="outlined"
        size="small"
        startIcon={<Favorite fontSize="inherit" />}
        color={props.isFavorite ? 'error' : undefined}
        onClick={props.onFavoriteStatusChange}
      >
        {label}
      </Button>
    );
  }

  return (
    <IconButton
      aria-label={label}
      color={props.isFavorite ? 'error' : undefined}
      onClick={props.onFavoriteStatusChange}
    >
      <Tooltip title={label}>
        <Favorite />
      </Tooltip>
    </IconButton>
  );
}
