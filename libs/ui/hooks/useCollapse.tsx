import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface CollapseContextType {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const CollapseContext = createContext<CollapseContextType | undefined>(undefined);

export function CollapseProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  const [collapsed, setCollapsed] = useState(isMobileDevice);

  useEffect(() => {
    setCollapsed(isMobileDevice);
  }, [isMobileDevice]);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <CollapseContext.Provider value={{ collapsed, toggleCollapse }}>
      {children}
    </CollapseContext.Provider>
  );
}

export const useCollapse = () => {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error('useCollapse must be used within a CollapseProvider');
  }
  return context;
};
