import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, ImageContainer } from '.';

interface UploadProps {
  uploadType: 'single' | 'multiple';
  children?: React.ReactNode;
  [prop: string]: any;
}

interface InitialStateStateType {
  files: File[];
  urls: (string | ArrayBuffer | null)[];
}
const UploadContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const ImagesBox = styled.section`
  display: flex;
  margin-top: 20px;
`;
const ImageContainerCSS = css`
  margin-right: 20px;

  &:last-of-type {
    margin-right: 0;
  }
`;

const IMAGE_FILE_EXTENSION_ERROR =
  '이미지 파일만 등록이 가능합니다. (jpg|jpeg|png|gif|bmp)';
const IMAGE_FILE_SIZE_ERROR =
  '이미지파일 사이즈는 5MB 이내로 등록이 가능합니다.';
const IMAGE_FILES_LENGTH_ERROR = '이미지 파일 첨부 가능 갯수는 최대 3개입니다.';
const IMAGE_FILE_LENGTH_ERROR = '이미지 파일 첨부 가능 갯수는 최대 1개입니다.';
const FILE_EXTENSION_REGEX = /(.*?)\.(jpg|jpeg|png|PNG|gif|bmp)$/;
const IMAGE_MAX_SIZE = 5 * 1024 * 1024;

const Upload = ({ children, uploadType, ...props }: UploadProps) => {
  const initialState: InitialStateStateType = {
    files: [],
    urls: [],
  };

  const [file, setFile] = useState<InitialStateStateType>(initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = useCallback(() => {
    if (
      (uploadType === 'single' && file.files.length === 1) ||
      (uploadType === 'multiple' && file.files.length === 3)
    ) {
      /* eslint-disable no-alert */
      alert(
        uploadType === 'single'
          ? IMAGE_FILE_LENGTH_ERROR
          : IMAGE_FILES_LENGTH_ERROR
      );
    }
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [file.files.length, uploadType]);

  const onSingleChange = (e: ChangeEvent) => {
    /* eslint-disable prefer-destructuring */
    const target = e.target as HTMLInputElement;
    const imageFile: File = (target.files as FileList)[0];
    if (!imageFile) return;

    const { name, size } = imageFile;
    if (!name.match(FILE_EXTENSION_REGEX)) {
      /* eslint-disable no-alert */
      alert(IMAGE_FILE_EXTENSION_ERROR);
      return;
    }
    if (size > IMAGE_MAX_SIZE) {
      /* eslint-disable no-alert */
      alert(IMAGE_FILE_SIZE_ERROR);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setFile((state) => ({
        ...state,
        files: [imageFile],
        urls: [fileReader.result],
      }));
    };
    fileReader.readAsDataURL(imageFile);

    target.value = '';
  };

  const onMultipleChange = (e: ChangeEvent) => {
    /* eslint-disable prefer-destructuring */
    const target = e.target as HTMLInputElement;
    const imageFiles: FileList | null = target.files;
    if (!imageFiles) return;
    if (imageFiles.length + file.files.length > 3) {
      alert(IMAGE_FILES_LENGTH_ERROR);
      return;
    }

    for (let i = 0; i < imageFiles.length; i += 1) {
      const { name, size } = imageFiles[i];
      if (!name.match(FILE_EXTENSION_REGEX)) {
        /* eslint-disable no-alert */
        alert(IMAGE_FILE_EXTENSION_ERROR);
        return;
      }
      if (size > IMAGE_MAX_SIZE) {
        /* eslint-disable no-alert */
        alert(IMAGE_FILE_SIZE_ERROR);
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFile((state) => ({
          ...state,
          files: [...state.files, imageFiles[i]],
          urls: [...state.urls, fileReader.result],
        }));
      };
      fileReader.readAsDataURL(imageFiles[i]);
    }

    target.value = '';
  };

  return (
    <UploadContainer {...props}>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={uploadType === 'single' ? onSingleChange : onMultipleChange}
        multiple
      />
      <Button
        buttonType="primary"
        width={88}
        height={40}
        border
        reversal
        borderRadius={20}
        onClick={handleButtonClick}
      >
        + 올리기
      </Button>
      <ImagesBox>
        {file.urls.map((url) => (
          <ImageContainer
            key={`${url}`}
            src={url as string}
            alt="이미지"
            width={uploadType === 'single' ? 200 : 92}
            height={uploadType === 'single' ? 200 : 92}
            css={ImageContainerCSS}
          />
        ))}
      </ImagesBox>
    </UploadContainer>
  );
};

export default Upload;
