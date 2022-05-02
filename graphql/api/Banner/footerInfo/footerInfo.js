import FooterInfo from "../../../models/FooterInfo";

export default {
  Query: {
    getFooterInfo: async (_, args) => {
      try {
        const result = await FooterInfo.find();

        return result[0];
      } catch (e) {
        return {};
      }
    },
  },

  Mutation: {
    modifyFooterInfo: async (_, args) => {
      const {
        id,
        cheifName,
        businessName,
        businessNumber,
        tel,
        email,
        address,
        privacyOfficer,
        officeHours,
      } = args;

      try {
        const result = await FooterInfo.update(
          { _id: id },
          {
            cheifName,
            businessNumber,
            businessName,
            tel,
            email,
            address,
            privacyOfficer,
            officeHours,
          }
        );

        return true;
      } catch (e) {
        return false;
      }
    },

    // modifyFooterInfoLogoPath: async (_, args) => {
    //   const { id, logoPath } = args;

    //   try {
    //     const result = await FooterInfo.update({ _id: id }, { logoPath });

    //     return true;
    //   } catch (e) {
    //     return false;
    //   }
    // },
  },
};
