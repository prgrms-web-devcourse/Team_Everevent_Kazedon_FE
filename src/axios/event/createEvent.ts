import request from '@axios/index';
import { ResType } from '@axios/types';

const postEventInfo = async (eventInfo: any) => {
  const formData = new FormData();

  // TODO: 추후 API 오류 확인 시 아래 주석을 활용하여 수정될 수 있습니다.
  /* 
    formData.append(
    'request',
    new Blob([JSON.stringify({ ...eventInfo.request })], {
      type: 'application/json',
    })
  );
  eventInfo.files.forEach((file: any) => formData.append('files', file));
   */
  formData.append('request', eventInfo.request);
  formData.append('files', eventInfo.files);

  const res: ResType<any> = await request.post('/events', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export default postEventInfo;
