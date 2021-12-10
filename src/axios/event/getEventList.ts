const getEventList = async () => {
  const res = await fetch('/v3/1649e9bd-0272-47cb-85c2-60f1fa19c722');
  return res;
};

export default getEventList;
