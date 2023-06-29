import { THEME_OPTIONS } from '@utils/enums';
import { ConfigProvider, theme } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const ThemeProvider = ({ children }) => {
  const selectedTheme = useSelector((state) => state.app.theme);
  return (
    <ConfigProvider
      getPopupContainer={(trigger) => trigger?.parentNode}
      theme={{
        token: { colorPrimary: '#4c52bc', fontFamily: 'Primary' },
        algorithm:
          selectedTheme === THEME_OPTIONS.DARK
            ? [theme.darkAlgorithm, theme.compactAlgorithm]
            : theme.compactAlgorithm
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
