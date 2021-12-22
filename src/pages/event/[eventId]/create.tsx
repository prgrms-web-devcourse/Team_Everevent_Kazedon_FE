import {
  Button,
  HeaderText,
  MainContainer,
  Modal,
  Text,
  Textarea,
  Upload,
} from '@components/atoms';
import { useReview } from '@contexts/review';
import { css } from '@emotion/react';
import { marginTop } from '@utils/computed';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

const TextAreaCSS = css`
  margin-bottom: 96px;
  resize: none;
`;

const SubmitButtonCSS = css`
  display: block;
  width: 312px;
  margin: 0 auto;
  margin-top: 24px;
`;
const modalButtonCSS = css`
  position: absolute;
  bottom: 24px;
`;
const ReviewCreatePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { eventId } = router.query;
  const {
    review,
    dispatchChangeReviewContent,
    dispatchCreateReview,
    reviewError,
  } = useReview();

  const onChangeContent = useCallback(
    (e, value = undefined) => {
      const { name } = e.target;
      dispatchChangeReviewContent({ name, value: value ?? e.target.value });
    },
    [dispatchChangeReviewContent]
  );

  const handleSubmit = useCallback(
    ({ description, picture }) => {
      if (!description || !eventId) return;
      dispatchCreateReview({ eventId, description, picture });
      if (!reviewError.code) {
        setModalVisible(() => true);
      }
    },
    [dispatchCreateReview, eventId, reviewError]
  );
  const handleModalClose = useCallback(() => {
    setModalVisible(() => false);
    router.push(`/event/${eventId}`);
  }, [router, eventId]);

  return (
    <MainContainer paddingWidth={24} paddingHeight={96}>
      <HeaderText level={1} marginBottom={48}>
        리뷰 작성하기
      </HeaderText>
      <HeaderText level={2} marginBottom={16}>
        내용
      </HeaderText>
      <Textarea
        name="description"
        width={312}
        height={128}
        css={TextAreaCSS}
        onChange={onChangeContent}
      />
      <HeaderText level={2} marginBottom={16}>
        사진
      </HeaderText>
      <Upload uploadType="single" dispatchEvent={dispatchChangeReviewContent} />
      <Button
        onClick={() =>
          handleSubmit({
            description: review.description,
            picture: review.picture,
          })
        }
        css={SubmitButtonCSS}
      >
        리뷰 남기기
      </Button>
      <Modal
        width={300}
        height={184}
        modalType="default"
        padding={24}
        visible={modalVisible}
        onClose={handleModalClose}
      >
        <HeaderText level={2}>리뷰 작성 완료!</HeaderText>
        <Text size={14} css={marginTop(16)}>
          리뷰 작성을 완료하셨어요!
        </Text>
        <Text size={14}>원래 보았던 페이지로 돌아가볼까요?</Text>
        <Button onClick={handleModalClose} css={modalButtonCSS}>
          이벤트 페이지로 가기
        </Button>
      </Modal>
    </MainContainer>
  );
};

export default ReviewCreatePage;
