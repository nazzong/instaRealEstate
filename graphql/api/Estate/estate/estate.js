import Estate from "../../../models/Estate";

export default {
  Query: {
    getEstate: async (_, args) => {
      try {
        const result = await Estate.find();

        return result[0];
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    modifyEstate: async (_, args) => {
      const {
        id,
        name,
        address,
        detailAddress,
        location,
        tel,
        fax,
        description,
        managerRank,
        managerName,
        managerTel,
        managerEmail,
        managerThumbnail,
      } = args;

      try {
        const result = await Estate.updateOne(
          { _id: id },
          {
            name,
            address,
            detailAddress,
            location,
            tel,
            fax,
            description,
            managerRank,
            managerName,
            managerTel,
            managerEmail,
            managerThumbnail,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
