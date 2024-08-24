import { User } from "./user.model";

export const generateId = async () => {
  let newId;

  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const currentDate = year + month + day;

  const lastRecord = await User.findOne().sort({ createdAt: -1 });
  if (lastRecord) {
    const lastGeneratedId = lastRecord.id;
    const lastDate = lastGeneratedId.slice(0, 8);
    const lastSequenceNumber = parseInt(lastGeneratedId.slice(8), 10);

    if (currentDate === lastDate) {
      const newSequenceNumber = (lastSequenceNumber + 1)
        .toString()
        .padStart(5, "0");
      newId = `${currentDate}${newSequenceNumber}`;
      return newId;
    } else {
      newId = `${currentDate}00001`;
      return newId;
    }
  } else {
    newId = `${currentDate}00001`;
    return newId;
  }
};
