import { CURRENT_TIME } from "../../../../utils/commonUtils";
import AdminUser from "../../../models/AdminUser";
import crypto from "crypto";
import Product from "../../../models/Product";

export default {
  Query: {
    getAdminUserLoginResult: async (_, args) => {
      const { userId, password } = args;

      try {
        let cipher = crypto.createCipher("aes256", "password");

        cipher.update(password, "ascii", "hex");
        const encPassword = cipher.final("hex");

        const result = await AdminUser.find({
          userId,
          // password: encPassword,
        });

        if (result.length > 0) return result[0];
        else return null;
      } catch (e) {
        console.log(e);
        return null;
      }
    },

    getAdminUser: async (_, args) => {
      try {
        const result = await AdminUser.find({
          right: 2,
          isDelete: false,
        }).sort({
          createdAt: -1,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getTotalAdminUser: async (_, args) => {
      try {
        const result = await AdminUser.find({
          right: {
            $in: [1, 2],
          },
          isDelete: false,
        }).sort({
          right: 1,
          createdAt: -1,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getAdminUserSearch: async (_, args) => {
      const { searchValue } = args;

      try {
        const result = await AdminUser.find({
          $or: [
            { userId: { $regex: `.*${searchValue}.*` } },
            { name: { $regex: `.*${searchValue}.*` } },
          ],

          right: 2,
          isDelete: false,
        }).sort({
          createdAt: -1,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    deleteAdminUser: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await AdminUser.updateOne(
          {
            _id: id,
          },
          {
            isDelete: true,
            deletedAt: current,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    createAdminUser: async (_, args) => {
      const {
        userId,
        password,
        rank,
        name,
        mobile,
        address,
        securityNumber,
        filePath,
      } = args;

      try {
        let cipher = crypto.createCipher("aes256", "password");
        cipher.update(password, "ascii", "hex");
        const encPassword = cipher.final("hex");

        const current = await CURRENT_TIME();

        const result = await AdminUser.create({
          userId,
          password: encPassword,
          rank,
          name,
          mobile,
          address,
          securityNumber,
          filePath,
          createdAt: current,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateAdminUser: async (_, args) => {
      const { id, rank, name, mobile, address, securityNumber, filePath } =
        args;

      try {
        const result = await AdminUser.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              rank,
              name,
              mobile,
              address,
              securityNumber,
              filePath,
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
