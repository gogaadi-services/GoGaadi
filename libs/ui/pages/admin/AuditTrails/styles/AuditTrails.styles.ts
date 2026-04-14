import { Theme } from '@mui/material/styles';
import { createAppStyles } from '@gogaadi/theme';
import { getBaseStyles } from './AuditTrails.styles.shared';

export const useStyles = createAppStyles((theme: Theme) => getBaseStyles(theme), {
  admin: {
    container: {},
    title: {},
  },
  user: {},
  consultant: {},
});
