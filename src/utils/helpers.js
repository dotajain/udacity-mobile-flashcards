export const getDateFromTimeStamp = timestamp => {
  const todate = new Date(timestamp).getDate();
  const tomonth = new Date(timestamp).getMonth() + 1;
  const toyear = new Date(timestamp).getFullYear();
  const date = tomonth + '/' + todate + '/' + toyear;
  return date;
};

export const decouple = state => {
  return prop => {
    let copy = state;
    delete copy[prop];
    return copy;
  };
};

export const generateUID = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);
