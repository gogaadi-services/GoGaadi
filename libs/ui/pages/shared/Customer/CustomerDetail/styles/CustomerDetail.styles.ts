import { Theme } from '@mui/material/styles';
import { createAppStyles } from '@gogaadi/theme';
import { getBaseStyles } from './CustomerDetail.styles.shared';

export const useStyles = createAppStyles((theme: Theme) => getBaseStyles(theme), {});
