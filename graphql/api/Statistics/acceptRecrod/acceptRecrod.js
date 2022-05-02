import AcceptRecord from "../../../models/AcceptRecord";

export default {
  Query: {
    getAcceptRecord: async (_, args) => {
      const { currentYear } = args;

      try {
        const result = await AcceptRecord.find({
          date: { $regex: `${currentYear}.*` },
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getAcceptRecordByMonth: async (_, args) => {
      const { currentMonth } = args;

      try {
        const result = await AcceptRecord.find({
          date: { $regex: `${currentMonth}.*` },
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getAcceptRecordByDate: async (_, args) => {
      const { currentDate } = args;

      try {
        const result = await AcceptRecord.find({
          date: { $regex: `${currentDate}.*` },
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getAcceptRecrodAllYear: async (_, args) => {
      const { year } = args;

      try {
        const result = await AcceptRecord.find({
          date: { $regex: `${year}.*` },
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    addAcceptRecord: async (_, args) => {
      const { date } = args;
      try {
        await AcceptRecord.create({
          date,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
