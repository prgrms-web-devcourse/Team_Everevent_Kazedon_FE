import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, ImageContainer } from '.';

const IMAGE_FILE_EXTENSION_ERROR =
  '이미지 파일만 등록이 가능합니다. (jpg|jpeg|png|gif|bmp)';
const IMAGE_FILE_SIZE_ERROR =
  '이미지파일 사이즈는 5MB 이내로 등록이 가능합니다.';
const IMAGE_FILES_LENGTH_ERROR = '이미지 파일 첨부 가능 갯수는 최대 3개입니다.';
const IMAGE_FILE_LENGTH_ERROR = '이미지 파일 첨부 가능 갯수는 최대 1개입니다.';
const FILE_EXTENSION_REGEX = /(.*?)\.(jpg|jpeg|png|PNG|gif|bmp)$/;
const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
const UPLOAD_TYPE_SINGLE = 'single';
const UPLOAD_TYPE_MULTIPLE = 'multiple';
interface UploadProps {
  uploadType: 'single' | 'multiple';
  dispatchEvent?: (param: any) => void;
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

const Upload = ({
  children,
  uploadType,
  dispatchEvent,
  ...props
}: UploadProps) => {
  const initialState: InitialStateStateType = {
    files: [],
    urls: [],
  };

  const [file, setFile] = useState<InitialStateStateType>(initialState);
  const [imageIdx, setImageIdx] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dispatchEvent) {
      const payload =
        UPLOAD_TYPE_SINGLE === uploadType
          ? { name: 'picture', value: file.files[0] }
          : { name: 'pictures', value: file.files };
      dispatchEvent(payload);
    }
  }, [file, uploadType, dispatchEvent]);

  const handleButtonClick = useCallback(() => {
    if (
      (uploadType === UPLOAD_TYPE_SINGLE && file.files.length === 1) ||
      (uploadType === UPLOAD_TYPE_MULTIPLE && file.files.length === 3)
    ) {
      /* eslint-disable no-alert */
      alert(
        uploadType === UPLOAD_TYPE_SINGLE
          ? IMAGE_FILE_LENGTH_ERROR
          : IMAGE_FILES_LENGTH_ERROR
      );
    }
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [file.files.length, uploadType]);

  const handleImageClick = useCallback((idx) => {
    setImageIdx(() => idx);
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const onChange = (e: ChangeEvent) => {
    /* eslint-disable prefer-destructuring */
    const target = e.target as HTMLInputElement;
    const imageFiles: FileList | null = target.files;
    if (!imageFiles) return;

    if (
      (!imageIdx &&
        uploadType === UPLOAD_TYPE_SINGLE &&
        file.files.length === 1) ||
      (!imageIdx &&
        uploadType === UPLOAD_TYPE_MULTIPLE &&
        file.files.length === 3)
    ) {
      /* eslint-disable no-alert */
      alert(
        uploadType === UPLOAD_TYPE_SINGLE
          ? IMAGE_FILE_LENGTH_ERROR
          : IMAGE_FILES_LENGTH_ERROR
      );
    }

    for (let i = 0; i < imageFiles.length; i += 1) {
      const { name, size } = imageFiles[i];
      const nowFile = imageFiles[i];
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
          files:
            imageIdx !== null
              ? state.files.map((stateFile, stateIdx) =>
                  imageIdx === stateIdx ? nowFile : stateFile
                )
              : [
                  ...(uploadType === UPLOAD_TYPE_SINGLE ? [] : state.files),
                  nowFile,
                ],
          urls:
            imageIdx !== null
              ? state.urls.map((stateUrl, urlIdx) =>
                  imageIdx === urlIdx ? fileReader.result : stateUrl
                )
              : [
                  ...(uploadType === UPLOAD_TYPE_SINGLE ? [] : state.urls),
                  fileReader.result,
                ],
        }));
      };
      fileReader.readAsDataURL(imageFiles[i]);
      setImageIdx(() => null);
    }

    target.value = '';
  };

  return (
    <UploadContainer {...props}>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onChange}
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
        {file.urls.map((url, idx) => (
          <ImageContainer
            key={`${url}`}
            src={url as string}
            alt="Event Review Image"
            width={uploadType === UPLOAD_TYPE_SINGLE ? 312 : 92}
            height={uploadType === UPLOAD_TYPE_SINGLE ? 312 : 92}
            css={ImageContainerCSS}
            onClick={() => handleImageClick(idx)}
          />
        ))}
      </ImagesBox>
    </UploadContainer>
  );
};

export default Upload;
