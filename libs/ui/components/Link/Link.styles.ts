import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((_theme) => ({
  root: {
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    textDecoration: 'none',

    '&:hover': {
      opacity: 0.8,
    },
  },
}));