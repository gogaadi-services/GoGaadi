import { Theme } from '@mui/material/styles';
import { createAppStyles } from '@gogaadi/theme';
import { getBaseStyles } from './PeopleDetail.styles.shared';

export const useStyles = createAppStyles((theme: Theme) => getBaseStyles(theme), {
  admin: { container: {}, card: {}, cardHeader: {} },
  user: {},
  captain: {},
});
