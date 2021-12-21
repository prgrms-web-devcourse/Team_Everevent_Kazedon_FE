import { Icon, Text } from '@components/atoms';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React, { useCallback } from 'react';
import { MdOutlineFavorite } from 'react-icons/md';

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
      <Text block size="large" onClick={(e: MouseEvent) => onLike(e)}>
        <Icon size={24} color={isLike ? '#f85b56' : styles.colors.background}>
          <MdOutlineFavorite />
        </Icon>
      </Text>
      <Text block size="micro" color={styles.colors.background}>
        {`${likeCount || 0}`}
      </Text>
    </StyledLikeButton>
  );
};

export default LikeButton;
