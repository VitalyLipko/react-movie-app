import { Button, IconButton, Tooltip } from '@mui/material';
import { Favorite } from '@mui/icons-material';

export default function FavoriteAction(props) {
  const { isFavorite, isButton, onFavoriteStatusChange } = props;
  const actionColor = isFavorite ? 'error' : undefined;
  const FavoriteIcon = <Favorite fontSize={isButton ? 'inherit' : undefined} />;
  const label = isFavorite ? 'Remove from favorites' : 'Add to favorites';

  if (isButton) {
    return (
      <Button
        variant="outlined"
        size="small"
        startIcon={FavoriteIcon}
        color={actionColor}
        onClick={onFavoriteStatusChange}
      >
        {label}
      </Button>
    );
  }

  return (
    <IconButton
      aria-label={label}
      color={actionColor}
      onClick={onFavoriteStatusChange}
    >
      <Tooltip title={label}>{FavoriteIcon}</Tooltip>
    </IconButton>
  );
}
