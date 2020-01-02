import React from 'react';
import { useTheme } from '@material-ui/styles';

export default function Theme() {
  const theme = useTheme();

  return <div>{`spacing ${theme.spacing}`}</div>;
}