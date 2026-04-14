import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: 70,
  },

  code: {
    fontSize: '4rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },

  message: {
    fontSize: '1.2rem',
    color: theme.palette.text.secondary,
  },
}));