import getEvent from '@axios/event/getEvent';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';

const EventDetailPage = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const { eventId } = router.query;
  useEffect(() => {
    async function getName() {
      const res = await getEvent({ eventId });
      setName(() => res.name);
    }
    getName();
  }, [eventId]);
  return <div>{name} 이벤트 상세 페이지</div>;
};

export default EventDetailPage;
