import { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
} from '@mui/material';
import './SearchResultItem.css';

export default function SearchResultItem(props) {
  const CustomLinkItem = useMemo(
    () =>
      forwardRef((listItemProps, ref) => (
        <li>
          <Link
            ref={ref}
            {...listItemProps}
            to={`/movies/${props.movie.id}`}
            role={undefined}
          />
        </li>
      )),
    [props.movie.id],
  );

  return (
    <ListItemButton className="SearchResultItem" component={CustomLinkItem}>
      <ListItemAvatar>
        {props.movie.poster_path && (
          <img
            height="40px"
            width="40px"
            src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
            alt={props.movie.original_title}
          />
        )}
      </ListItemAvatar>
      <Tooltip title={props.movie.title}>
        <ListItemText
          primary={props.movie.title}
          primaryTypographyProps={{ noWrap: true }}
        />
      </Tooltip>
    </ListItemButton>
  );
}
