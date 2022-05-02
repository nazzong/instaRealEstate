import Popup from "../../../models/Popup";

export default {
  Query: {
    getPopup: async (_, args) => {
      try {
        const result = await Popup.find().sort({ sort: 1 });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    modifyPopup: async (_, args) => {
      const { id, imagePath } = args;

      try {
        const result = await Popup.updateOne(
          { _id: id },
          {
            imagePath,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifyPopupStatus: async (_, args) => {
      const { id, status } = args;

      try {
        const result = await Popup.updateOne(
          { _id: id },
          {
            $set: {
              useYn: !status,
            },
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
