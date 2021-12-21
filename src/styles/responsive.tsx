/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Commom from '@styles/index';

export const Desktop: React.FC = ({ children }) => {
  const isDesktop = useMediaQuery({ query: Commom.media.screenDesktop });
  return <>{isDesktop && children}</>;
};

export const Mobile: React.FC = ({ children }) => {
  const isMobile = useMediaQuery({ query: Commom.media.screenMobile });
  return <>{isMobile && children}</>;
};
