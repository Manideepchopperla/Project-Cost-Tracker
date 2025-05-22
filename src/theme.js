import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#EBF5FF',
      100: '#D6E8FF',
      200: '#ADCEFF',
      300: '#85B4FF',
      400: '#5C9AFF',
      500: '#3B82F6', // primary blue
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    secondary: {
      50: '#F5F3FF',
      100: '#EDE9FE',
      200: '#DDD6FE',
      300: '#C4B5FD',
      400: '#A78BFA',
      500: '#8B5CF6', // secondary purple
      600: '#7C3AED',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
    },
    accent: {
      50: '#EFFCF6',
      100: '#DAFAEC',
      200: '#B8F1D8',
      300: '#83E4BE',
      400: '#34D399',
      500: '#0D9488', // accent teal
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
    },
    success: {
      500: '#10B981',
    },
    warning: {
      500: '#F59E0B',
    },
    error: {
      500: '#EF4444',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
    },
    Card: {
      baseStyle: {
        p: '6',
        borderRadius: 'lg',
        boxShadow: 'md',
        bg: 'white',
      },
    },
  },
});

export default theme;