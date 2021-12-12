import { Text } from '@components/atoms';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React, { useCallback } from 'react';

interface LikeButtonProps {
  isLike: boolean;
  likeCount: number;
  onClick: (e: MouseEvent) => void;
}

const StyledLikeButton = styled.section`
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
`;

const marginBottomCSS = (width = '4') => css`
  margin-bottom: ${width}px;
`;

const LikeButton = ({ isLike, likeCount, onClick }: LikeButtonProps) => {
  const onLike = useCallback(
    (e) => {
      e.stopPropagation();
      onClick(e);
    },
    [onClick]
  );

  return (
    <StyledLikeButton>
      <Text
        block
        size="large"
        css={marginBottomCSS()}
        onClick={(e: MouseEvent) => onLike(e)}
      >
        {isLike ? '💗' : '🖤'}
      </Text>
      <Text block size="micro" color={styles.colors.background}>
        {`${likeCount || 0}`}
      </Text>
    </StyledLikeButton>
  );
};

export default LikeButton;
