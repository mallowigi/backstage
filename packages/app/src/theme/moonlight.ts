import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';
import { palette } from './moonlight/palette';
import { mulishFont } from './moonlight/fonts.ts';

export const moonlight = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.dark,
      background: {
        default: palette.bg,
        paper: palette.second,
      },
      primary: {
        main: palette.accent,
      },
      banner: {
        closeButtonColor: palette.fg,
        info: palette.notif,
        error: palette.error,
        text: palette.fg,
        link: palette.link,
        warning: palette.yellow,
      },
      border: palette.border,
      textContrast: palette.selFg,
      textVerySubtle: palette.disabled,
      textSubtle: palette.text,
      highlight: palette.hl,
      errorBackground: palette.error,
      warningBackground: palette.yellow,
      infoBackground: palette.notif,
      errorText: palette.fg,
      infoText: palette.fg,
      warningText: palette.fg,
      linkHover: palette.accent,
      link: palette.link,
      gold: palette.accent2,
      navigation: {
        background: palette.contrast,
        indicator: palette.accent,
        color: palette.fg,
        selectedColor: palette.accent,
        navItem: {
          hoverBackground: palette.tree,
        },
        submenu: {
          background: palette.second,
        },
      },
      pinSidebarButton: {
        icon: palette.fg,
        background: palette.button,
      },
      tabbar: {
        indicator: palette.accent,
      },
    },
  }),
  fontFamily: 'Mulish',
  defaultPageTheme: 'home',
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': [mulishFont],
      },
    },
    BackstageSidebarItem: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&.Mui-selected': {
            backgroundColor: palette.tree,
          },
        },
      },
    },
  },
});
