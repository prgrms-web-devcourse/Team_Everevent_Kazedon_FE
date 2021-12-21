import request from '@axios/index';
import { ResType } from '@axios/types';

const postEventInfo = async (eventInfo: any) => {
  const formData = new FormData();

  formData.append(
    'request',
    new Blob([JSON.stringify({ ...eventInfo.request })], {
      type: 'application/json',
    })
  );

  eventInfo.files.forEach((file: any) => formData.append('files[]', file));

  const res: ResType<any> = await request.post('/events', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export default postEventInfo;
