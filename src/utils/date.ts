const getConvertedDate = (date: string | Date) => {
  const now = new Date(date);
  return `${now.toLocaleDateString()} ${
    now.getHours() < 10 ? `0${now.getHours()}` : now.getHours()
  }:${now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()}`;
};

export default getConvertedDate;
