import Product from "../../../models/Product";
import AdminUser from "../../../models/AdminUser";
import MenuDepth_1 from "../../../models/MenuDepth_1";
import MenuDepth_2 from "../../../models/MenuDepth_2";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import mongoose from "mongoose";
import moment from "moment";

const unitNumber = {
  "": 1,
  만: 10000,
  억: 100000000,
  조: 1000000000000,
};

const areaCalculation = (x, no) => {
  const data = (parseInt(x) * 3.3058).toFixed(no >= 0 ? no : 2);

  return data && data != "NaN" ? data : 0;
};

export default {
  Query: {
    getProductAll: async (_, args) => {
      try {
        const result = await Product.find()
          .lean()
          .sort({ createdAt: -1 })
          .populate({
            path: `categoryList`,
            model: MenuDepth_2,
            populate: {
              path: "parentMenu",
              model: MenuDepth_1,
            },
          });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProduct: async (_, args) => {
      const { searchValue } = args;

      try {
        const result = await Product.find({
          $or: [
            { productNo: { $regex: `.*${searchValue}.*` } },
            { productType: { $regex: `.*${searchValue}.*` } },
            { address: { $regex: `.*${searchValue}.*` } },
            { detailAddress: { $regex: `.*${searchValue}.*` } },
            { viewAddress: { $regex: `.*${searchValue}.*` } },
            { monthlyDeposit: { $regex: `.*${searchValue}.*` } },
            { monthlyPrice: { $regex: `.*${searchValue}.*` } },
            { jeonseDeposit: { $regex: `.*${searchValue}.*` } },
            { tradingPrice: { $regex: `.*${searchValue}.*` } },
            { managementFee: { $regex: `.*${searchValue}.*` } },
            { rightFee: { $regex: `.*${searchValue}.*` } },
            { totalFloor: { $regex: `.*${searchValue}.*` } },
            { floor: { $regex: `.*${searchValue}.*` } },
            {
              contractArea: {
                $regex: `.*${parseFloat(
                  areaCalculation(searchValue.replace("평", ""))
                )}.*`,
              },
            },
            { listTitle: { $regex: `.*${searchValue}.*` } },
            { listSubTitle: { $regex: `.*${searchValue}.*` } },
          ],
          status: 1,
          isView: true,
          isDelete: false,
        })
          .lean()
          .sort({
            createdAt: -1,
          })
          .populate({
            path: `categoryList`,
            model: MenuDepth_2,
            populate: {
              path: "parentMenu",
              model: MenuDepth_1,
            },
          });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductForInfinite: async (_, args) => {
      const { limit, searchValue } = args;

      try {
        const result = await Product.find({
          $or: [
            { productNo: { $regex: `.*${searchValue}.*` } },
            { productType: { $regex: `.*${searchValue}.*` } },
            { address: { $regex: `.*${searchValue}.*` } },
            { detailAddress: { $regex: `.*${searchValue}.*` } },
            { viewAddress: { $regex: `.*${searchValue}.*` } },
            { monthlyDeposit: { $regex: `.*${searchValue}.*` } },
            { monthlyPrice: { $regex: `.*${searchValue}.*` } },
            { jeonseDeposit: { $regex: `.*${searchValue}.*` } },
            { tradingPrice: { $regex: `.*${searchValue}.*` } },
            { managementFee: { $regex: `.*${searchValue}.*` } },
            { rightFee: { $regex: `.*${searchValue}.*` } },
            { totalFloor: { $regex: `.*${searchValue}.*` } },
            { floor: { $regex: `.*${searchValue}.*` } },
            {
              contractArea: {
                $regex: `.*${parseFloat(
                  areaCalculation(searchValue.replace("평", ""))
                )}.*`,
              },
            },
            { listTitle: { $regex: `.*${searchValue}.*` } },
            { listSubTitle: { $regex: `.*${searchValue}.*` } },
          ],
          status: 1,
          isView: true,
          isDelete: false,
        })
          .lean()
          .sort({
            createdAt: -1,
          })
          .limit(limit);

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductByBest: async (_, args) => {
      try {
        const result = await Product.find({
          status: 1,
          isView: true,
          isDelete: false,
          isBest: true,
        })
          .lean()
          .sort({
            createdAt: -1,
          });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductByMenu: async (_, args) => {
      const { pmenu, cmenu, limit, currentPage } = args;

      try {
        let productResult = await Product.find({
          status: 1,
          isView: true,
          isDelete: false,
        })
          .lean()
          .sort({
            createdAt: -1,
          })
          .populate({
            path: `categoryList`,
            model: MenuDepth_2,
          });

        let menuResult = null;

        if (pmenu) {
          menuResult = await MenuDepth_1.findOne({ _id: pmenu }).populate({
            path: `subMenu`,
            model: MenuDepth_2,
          });

          productResult = await productResult.filter((data) => {
            if (!data.categoryList) return false;

            return (
              data.categoryList.filter((data2) => {
                return String(data2.parentMenu) === String(pmenu);
              }).length > 0
            );
          });
        }

        if (cmenu) {
          menuResult = await MenuDepth_2.findOne({ _id: cmenu });

          productResult = await productResult.filter((data) => {
            if (!data.categoryList) return false;

            return (
              data.categoryList.filter((data2) => {
                return data2.name === menuResult.name;
              }).length > 0
            );
          });
        }

        return productResult.slice(
          currentPage * limit,
          currentPage * limit + limit
        );
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductTotalPage: async (_, args) => {
      const { pmenu, cmenu, limit } = args;

      try {
        let productResult = await Product.find({
          status: 1,
          isView: true,
          isDelete: false,
        })
          .lean()
          .sort({
            createdAt: -1,
          })
          .populate({
            path: `categoryList`,
            model: MenuDepth_2,
          });

        let menuResult = null;

        if (pmenu) {
          menuResult = await MenuDepth_1.findOne({ _id: pmenu }).populate({
            path: `subMenu`,
            model: MenuDepth_2,
          });

          productResult = await productResult.filter((data) => {
            if (!data.categoryList) return false;

            return (
              data.categoryList.filter((data2) => {
                return String(data2.parentMenu) === String(pmenu);
              }).length > 0
            );
          });
        }

        if (cmenu) {
          menuResult = await MenuDepth_2.findOne({ _id: cmenu });

          productResult = await productResult.filter((data) => {
            if (!data.categoryList) return false;

            return (
              data.categoryList.filter((data2) => {
                return data2.name === menuResult.name;
              }).length > 0
            );
          });
        }

        const cnt = productResult.length;

        const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

        return parseInt(realTotalPage);
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductTotalPageOnlyCnt: async (_, args) => {
      const { pmenu, cmenu } = args;

      try {
        let productResult = await Product.find({
          status: 1,
          isView: true,
          isDelete: false,
        })
          .lean()
          .sort({
            createdAt: -1,
          })
          .populate({
            path: `categoryList`,
            model: MenuDepth_2,
          });

        let menuResult = null;

        if (pmenu) {
          menuResult = await MenuDepth_1.findOne({ _id: pmenu }).populate({
            path: `subMenu`,
            model: MenuDepth_2,
          });

          productResult = await productResult.filter((data) => {
            if (!data.categoryList) return false;

            return (
              data.categoryList.filter((data2) => {
                return String(data2.parentMenu) === String(pmenu);
              }).length > 0
            );
          });
        }

        if (cmenu) {
          menuResult = await MenuDepth_2.findOne({ _id: cmenu });

          productResult = await productResult.filter((data) => {
            if (!data.categoryList) return false;

            return (
              data.categoryList.filter((data2) => {
                return data2.name === menuResult.name;
              }).length > 0
            );
          });
        }

        const cnt = productResult.length;

        return parseInt(cnt);
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductSearch: async (_, args) => {
      const { searchValue, currentPage, limit } = args;

      try {
        const result = await Product.find({
          $or: [
            { productNo: { $regex: `.*${searchValue}.*` } },
            { productType: { $regex: `.*${searchValue}.*` } },
            { address: { $regex: `.*${searchValue}.*` } },
            { detailAddress: { $regex: `.*${searchValue}.*` } },
            { viewAddress: { $regex: `.*${searchValue}.*` } },
            { monthlyDeposit: { $regex: `.*${searchValue}.*` } },
            { monthlyPrice: { $regex: `.*${searchValue}.*` } },
            { jeonseDeposit: { $regex: `.*${searchValue}.*` } },
            { tradingPrice: { $regex: `.*${searchValue}.*` } },
            { managementFee: { $regex: `.*${searchValue}.*` } },
            { rightFee: { $regex: `.*${searchValue}.*` } },
            { totalFloor: { $regex: `.*${searchValue}.*` } },
            { floor: { $regex: `.*${searchValue}.*` } },
            { listTitle: { $regex: `.*${searchValue}.*` } },
            { listSubTitle: { $regex: `.*${searchValue}.*` } },
          ],
          status: 1,
          isView: true,
          isDelete: false,
        })
          .lean()
          .sort({
            createdAt: -1,
          })
          .populate({
            path: `categoryList`,
            model: MenuDepth_2,
          });

        let finalResult = result;

        if (typeof searchValue === "number" || searchValue.includes("평")) {
          finalResult = await result.filter((data) => {
            if (
              data.contractArea.includes(
                parseFloat(areaCalculation(searchValue.replace("평", "")))
              )
            ) {
              return true;
            } else {
              return false;
            }
          });
        }

        return finalResult.slice(
          limit * currentPage,
          limit * currentPage + limit
        );
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductSearchTotalPage: async (_, args) => {
      const { searchValue, limit } = args;

      try {
        const result = await Product.find({
          $or: [
            { productNo: { $regex: `.*${searchValue}.*` } },
            { productType: { $regex: `.*${searchValue}.*` } },
            { address: { $regex: `.*${searchValue}.*` } },
            { detailAddress: { $regex: `.*${searchValue}.*` } },
            { viewAddress: { $regex: `.*${searchValue}.*` } },
            { monthlyDeposit: { $regex: `.*${searchValue}.*` } },
            { monthlyPrice: { $regex: `.*${searchValue}.*` } },
            { jeonseDeposit: { $regex: `.*${searchValue}.*` } },
            { tradingPrice: { $regex: `.*${searchValue}.*` } },
            { managementFee: { $regex: `.*${searchValue}.*` } },
            { rightFee: { $regex: `.*${searchValue}.*` } },
            { totalFloor: { $regex: `.*${searchValue}.*` } },
            { floor: { $regex: `.*${searchValue}.*` } },
            { listTitle: { $regex: `.*${searchValue}.*` } },
            { listSubTitle: { $regex: `.*${searchValue}.*` } },
          ],
          status: 1,
          isView: true,
          isDelete: false,
        })
          .lean()
          .sort({
            createdAt: -1,
          })
          .populate({
            path: `categoryList`,
            model: MenuDepth_2,
          });

        let finalResult = result;

        if (typeof searchValue === "number" || searchValue.includes("평")) {
          finalResult = await result.filter((data) => {
            if (
              data.contractArea.includes(
                parseFloat(areaCalculation(searchValue.replace("평", "")))
              )
            ) {
              return true;
            } else {
              return false;
            }
          });
        }

        const cnt = finalResult.length;

        const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

        return parseInt(realTotalPage);
      } catch (e) {
        console.log(e);
        return 0;
      }
    },

    getProductSearchTotalPageOnlyCnt: async (_, args) => {
      const { searchValue } = args;

      try {
        const result = await Product.find({
          $or: [
            { productNo: { $regex: `.*${searchValue}.*` } },
            { productType: { $regex: `.*${searchValue}.*` } },
            { address: { $regex: `.*${searchValue}.*` } },
            { detailAddress: { $regex: `.*${searchValue}.*` } },
            { viewAddress: { $regex: `.*${searchValue}.*` } },
            { monthlyDeposit: { $regex: `.*${searchValue}.*` } },
            { monthlyPrice: { $regex: `.*${searchValue}.*` } },
            { jeonseDeposit: { $regex: `.*${searchValue}.*` } },
            { tradingPrice: { $regex: `.*${searchValue}.*` } },
            { managementFee: { $regex: `.*${searchValue}.*` } },
            { rightFee: { $regex: `.*${searchValue}.*` } },
            { totalFloor: { $regex: `.*${searchValue}.*` } },
            { floor: { $regex: `.*${searchValue}.*` } },
            { listTitle: { $regex: `.*${searchValue}.*` } },
            { listSubTitle: { $regex: `.*${searchValue}.*` } },
          ],
          status: 1,
          isView: true,
          isDelete: false,
        })
          .lean()
          .sort({
            createdAt: -1,
          })
          .populate({
            path: `categoryList`,
            model: MenuDepth_2,
          });

        let finalResult = result;

        if (typeof searchValue === "number" || searchValue.includes("평")) {
          finalResult = await result.filter((data) => {
            if (
              data.contractArea.includes(
                parseFloat(areaCalculation(searchValue.replace("평", "")))
              )
            ) {
              return true;
            } else {
              return false;
            }
          });
        }

        const cnt = finalResult.length;

        return parseInt(cnt);
      } catch (e) {
        console.log(e);
        return 0;
      }
    },

    getProductByMenuForInfinite: async (_, args) => {
      const { limit, pmenu, cmenu } = args;

      try {
        let productResult = await Product.find({
          status: 1,
          isView: true,
          isDelete: false,
        })
          .lean()
          .sort({
            createdAt: -1,
          })
          .populate({
            path: `categoryList`,
            model: MenuDepth_2,
          })
          .limit(limit);

        let menuResult = null;

        if (pmenu) {
          menuResult = await MenuDepth_1.findOne({ _id: pmenu }).populate({
            path: `subMenu`,
            model: MenuDepth_2,
          });

          productResult = await productResult.filter((data) => {
            if (!data.categoryList) return false;

            return (
              data.categoryList.filter((data2) => {
                return String(data2.parentMenu) === String(pmenu);
              }).length > 0
            );
          });
        }

        if (cmenu) {
          menuResult = await MenuDepth_2.findOne({ _id: cmenu });

          productResult = await productResult.filter((data) => {
            if (!data.categoryList) return false;

            return (
              data.categoryList.filter((data2) => {
                return data2.name === menuResult.name;
              }).length > 0
            );
          });
        }

        return productResult;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductForMain: async (_, args) => {
      const {
        mainLimit,
        currentPage,
        limit,
        category,
        moreCategory,
        moreLimit,
        filterTab,
        starList,
        type,
        monthStart,
        monthEnd,
        monthLimit,
        depositStart,
        depositEnd,
        depositLimit,
        tradingStart,
        tradingEnd,
        tradingLimit,
        rightFeeStart,
        rightFeeEnd,
        rightFeeLimit,
        isRightFee,
        contractAreaStart,
        contractAreaEnd,
        contractAreaLimit,
        floor,
        isParking,
        isElevator,
        restroom1,
        restroom2,
        isCeiling,
        buildingUse,
        productType,
      } = args;

      try {
        let where = {
          buildingUse: { $regex: `.*${buildingUse}.*` },
          productType:
            category === "사무실"
              ? {
                  $in: ["사무실"],
                }
              : category === "상가"
              ? {
                  $in: ["상가"],
                }
              : category === "주택"
              ? {
                  $in: ["원룸", "투룸", "쓰리룸", "오피스텔", "아파트"],
                }
              : category === "매매"
              ? { $regex: `.*${productType}.*` }
              : filterTab === 0
              ? {
                  $in: ["사무실"],
                }
              : filterTab === 1
              ? {
                  $in: ["상가"],
                }
              : filterTab === 2
              ? productType === "포룸+"
                ? { $in: ["오피스텔", "아파트"] }
                : productType === ""
                ? {
                    $in: ["원룸", "투룸", "쓰리룸", "오피스텔", "아파트"],
                  }
                : { $regex: `.*${productType}.*` }
              : filterTab === 3
              ? productType === "포룸+"
                ? { $in: ["오피스텔", "아파트"] }
                : productType === ""
                ? {
                    $in: [
                      "원룸",
                      "투룸",
                      "쓰리룸",
                      "오피스텔",
                      "아파트",
                      "상가",
                      "사무실",
                    ],
                  }
                : { $regex: `.*${productType}.*` }
              : { $regex: `.*${productType}.*` },
          isParking:
            isParking === "true"
              ? true
              : isParking === "false"
              ? false
              : { $in: [true, false] },
          isElevator:
            isElevator === "true"
              ? true
              : isElevator === "false"
              ? false
              : { $in: [true, false] },
          restroom: {
            $regex: `.*${restroom1}.*(.*${restroom2}.*)`,
          },
          isCeiling: isCeiling ? true : { $in: [true, false] },
          status: 1,
          isView: true,
          isDelete: false,
        };

        let find = {
          $and: [
            ...where,
            floor === "1층"
              ? { floor: { $in: ["1층", "반지층", "1.5층"] } }
              : floor === "2층"
              ? { floor: { $in: ["2층", "복층"] } }
              : floor === "지하층"
              ? {
                  $or: [
                    {
                      floor: {
                        $regex: `.*지.*층.*`,
                      },
                    },
                    {
                      floor: {
                        $regex: `.*-.*층.*`,
                      },
                    },
                  ],
                }
              : {
                  floor: { $regex: `.*${floor}.*` },
                },
          ],
        };

        let newResult = null;

        if (category === "") {
          const result = await Product.find(find)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
              },
            });

          newResult = result;
        } else if (category === "사무실") {
          const result = await Product.find(where).lean().sort({
            createdAt: -1,
          });

          newResult = result;
        } else if (category === "상가") {
          const result = await Product.find(where).lean().sort({
            createdAt: -1,
          });

          newResult = result;
        } else if (category === "주택") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
              },
            });

          newResult = result;
        } else if (category === "매매") {
          where["isTrading"] = true;

          const result = await Product.find(where).lean().sort({
            createdAt: -1,
          });

          newResult = result;
        } else {
          return [];
        }
        if (newResult) {
          const finalResult = [];

          await Promise.all(
            newResult.map((data) => {
              // if (String(data._id) === "60c3296f763a5a6648946b16") {
              //   console.log(data);
              // }
              if (filterTab === 3) {
                if (!starList.includes(String(data._id))) {
                  return;
                }
              }

              if (contractAreaLimit) {
                if (
                  parseFloat(data.contractArea) <
                  parseFloat(areaCalculation(contractAreaStart))
                ) {
                  // if (String(data._id) === "60c3296f763a5a6648946b16") {
                  //   console.log(
                  //     data.contractArea,
                  //     areaCalculation(contractAreaStart)
                  //   );
                  //   console.log("1번");
                  // }

                  return;
                }
              } else {
                if (
                  parseFloat(data.contractArea) <
                    parseFloat(areaCalculation(contractAreaStart)) ||
                  parseFloat(data.contractArea) >
                    parseFloat(areaCalculation(contractAreaEnd))
                ) {
                  // if (String(data._id) === "60c3296f763a5a6648946b16") {
                  //   console.log(
                  //     data.contractArea,
                  //     areaCalculation(contractAreaStart)
                  //   );
                  //   console.log("2번");
                  // }

                  return;
                }
              }

              if (data.isMonthly) {
                if (
                  (type === "" || type === "월세") &&
                  data.monthlyPrice >= monthStart &&
                  (monthLimit ? true : data.monthlyPrice <= monthEnd) &&
                  data.monthlyDeposit >= depositStart &&
                  (depositLimit ? true : data.monthlyDeposit <= depositEnd)
                ) {
                  if (isRightFee) {
                    if (!data.isRightFee || data.rightFee === 0) {
                      finalResult.push(data);
                    }
                  } else {
                    if (
                      (!data.isRightFee && rightFeeStart === 0) ||
                      data.rightFee === "협의" ||
                      (data.rightFee >= rightFeeStart &&
                        (rightFeeLimit ? true : data.rightFee <= rightFeeEnd))
                    ) {
                      finalResult.push(data);
                    }
                  }
                }
              } else if (data.isJeonse) {
                if (
                  (type === "" || type === "전세") &&
                  data.jeonseDeposit >= depositStart &&
                  (depositLimit ? true : data.jeonseDeposit <= depositEnd)
                ) {
                  if (isRightFee) {
                    if (!data.isRightFee || data.rightFee === 0) {
                      finalResult.push(data);
                    }
                  } else {
                    if (
                      (!data.isRightFee && rightFeeStart === 0) ||
                      data.rightFee === "협의" ||
                      (data.rightFee >= rightFeeStart &&
                        (rightFeeLimit ? true : data.rightFee <= rightFeeEnd))
                    ) {
                      finalResult.push(data);
                    }
                  }
                }
              } else if (data.isTrading) {
                if (
                  (type === "" || type === "매매") &&
                  data.tradingPrice >= tradingStart &&
                  (tradingLimit ? true : data.tradingPrice <= tradingEnd)
                ) {
                  if (isRightFee) {
                    if (!data.isRightFee || data.rightFee === 0) {
                      finalResult.push(data);
                    }
                  } else {
                    if (
                      (!data.isRightFee && rightFeeStart === 0) ||
                      data.rightFee === "협의" ||
                      (data.rightFee * unitNumber[data.rightFeeUnit] >=
                        rightFeeStart * unitNumber["만"] &&
                        (rightFeeLimit
                          ? true
                          : data.rightFee * unitNumber[data.rightFeeUnit] <=
                            rightFeeEnd * unitNumber["만"]))
                    ) {
                      finalResult.push(data);
                    }
                  }
                }
              }
            })
          );

          // finalResult.map((data, idx) => {
          //   const a = finalResult.findIndex(
          //     (data2) => String(data2._id) === "60c3296f763a5a6648946b16"
          //   );
          //   if (a >= idx * limit && a <= idx * limit + limit) {
          //     console.log("필터 !!!");
          //     console.log("필터 !!!");
          //     console.log("필터 !!!");
          //     console.log(idx);
          //   }
          // });

          return category
            ? moreCategory
              ? moreCategory === category
                ? finalResult.slice(0, moreLimit)
                : []
              : finalResult.slice(0, mainLimit)
            : finalResult.slice(
                currentPage * limit,
                currentPage * limit + limit
              );
        }
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductTotalPageForMain: async (_, args) => {
      const {
        limit,
        category,
        filterTab,
        starList,
        type,
        monthStart,
        monthEnd,
        monthLimit,
        depositStart,
        depositEnd,
        depositLimit,
        tradingStart,
        tradingEnd,
        tradingLimit,
        rightFeeStart,
        rightFeeEnd,
        rightFeeLimit,
        isRightFee,
        contractAreaStart,
        contractAreaEnd,
        contractAreaLimit,
        floor,
        isParking,
        isElevator,
        restroom1,
        restroom2,
        isCeiling,
        buildingUse,
        productType,
      } = args;

      try {
        let where = {
          buildingUse: { $regex: `.*${buildingUse}.*` },
          productType:
            filterTab === 0
              ? "사무실"
              : filterTab === 1
              ? "상가"
              : filterTab === 2
              ? productType === "포룸+"
                ? { $in: ["오피스텔", "아파트"] }
                : productType === ""
                ? { $in: ["원룸", "투룸", "쓰리룸", "오피스텔", "아파트"] }
                : { $regex: `.*${productType}.*` }
              : filterTab === 3
              ? productType === "포룸+"
                ? { $in: ["오피스텔", "아파트"] }
                : productType === ""
                ? {
                    $in: [
                      "원룸",
                      "투룸",
                      "쓰리룸",
                      "오피스텔",
                      "아파트",
                      "상가",
                      "사무실",
                    ],
                  }
                : { $regex: `.*${productType}.*` }
              : { $regex: `.*${productType}.*` },
          isParking:
            isParking === "true"
              ? true
              : isParking === "false"
              ? false
              : { $in: [true, false] },
          isElevator:
            isElevator === "true"
              ? true
              : isElevator === "false"
              ? false
              : { $in: [true, false] },
          restroom: {
            $regex: `.*${restroom1}.*(.*${restroom2}.*)`,
          },
          isCeiling: isCeiling ? true : { $in: [true, false] },
          status: 1,
          isView: true,
          isDelete: false,
        };

        let find = {
          $and: [
            ...where,
            floor === "1층"
              ? { floor: { $in: ["1층", "반지층", "1.5층"] } }
              : floor === "2층"
              ? { floor: { $in: ["2층", "복층"] } }
              : floor === "지하층"
              ? {
                  $or: [
                    {
                      floor: {
                        $regex: `.*지.*층.*`,
                      },
                    },
                    {
                      floor: {
                        $regex: `.*-.*층.*`,
                      },
                    },
                  ],
                }
              : {
                  floor: { $regex: `.*${floor}.*` },
                },
          ],
        };

        let newResult = null;

        if (category === "") {
          const result = await Product.find(find)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
              },
            });

          newResult = result;
        } else if (category === "홍대사무실 테마별") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              match: {
                name: "甲인테리어 사무실",
              },
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
              },
            });

          newResult = result.filter((data) => {
            return data.categoryList.length > 0;
          });
        } else if (category === "홍대상가 테마별") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
              },
            });

          newResult = result;
        } else if (category === "홍대사무실 실평형") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
                match: {
                  name: "홍대사무실 실평형",
                },
              },
            });

          newResult = await result.filter((data) => {
            let flag = false;

            if (!data.categoryList) return false;

            data.categoryList.map((data2) => {
              if (data2.parentMenu != null) {
                flag = true;
                return;
              }
            });

            return flag;
          });
        } else if (category === "홍대상가 실평형") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
                match: {
                  name: "홍대상가 실평형",
                },
              },
            });

          newResult = result.filter((data) => {
            let flag = false;

            if (!data.categoryList) return false;

            data.categoryList.map((data2) => {
              if (data2.parentMenu != null) {
                flag = true;
                return;
              }
            });

            return flag;
          });
        } else if (category === "홍대Home/ 주택") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
                match: {
                  name: "홍대Home/ 주택",
                },
              },
            });

          newResult = result.filter((data) => {
            let flag = false;

            if (!data.categoryList) return false;

            data.categoryList.map((data2) => {
              if (data2.parentMenu != null) {
                flag = true;
                return;
              }
            });

            return flag;
          });
        } else if (category === "홍대매매 정보") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
                match: {
                  name: "홍대매매 정보",
                },
              },
            });

          newResult = result.filter((data) => {
            let flag = false;

            if (!data.categoryList) return false;

            data.categoryList.map((data2) => {
              if (data2.parentMenu != null) {
                flag = true;
                return;
              }
            });

            return flag;
          });
        } else {
          return [];
        }
        if (newResult) {
          const finalResult = [];

          await Promise.all(
            newResult.map((data) => {
              if (filterTab === 3) {
                if (!starList.includes(String(data._id))) {
                  return;
                }
              }

              if (
                data.contractArea >=
                  parseFloat(areaCalculation(contractAreaStart)) &&
                data.contractArea <=
                  parseFloat(areaCalculation(contractAreaEnd))
              ) {
                if (data.isMonthly) {
                  if (
                    (type === "" || type === "월세") &&
                    data.monthlyPrice >= monthStart &&
                    (monthLimit ? true : data.monthlyPrice <= monthEnd) &&
                    data.monthlyDeposit >= depositStart &&
                    (depositLimit ? true : data.monthlyDeposit <= depositEnd)
                  ) {
                    if (isRightFee) {
                      if (!data.isRightFee || data.rightFee === 0) {
                        finalResult.push(data);
                      }
                    } else {
                      if (
                        (!data.isRightFee && rightFeeStart === 0) ||
                        data.rightFee === "협의" ||
                        (data.rightFee >= rightFeeStart &&
                          (rightFeeLimit ? true : data.rightFee <= rightFeeEnd))
                      ) {
                        finalResult.push(data);
                      }
                    }
                  }
                } else if (data.isJeonse) {
                  if (
                    (type === "" || type === "전세") &&
                    data.jeonseDeposit >= depositStart &&
                    (depositLimit ? true : data.jeonseDeposit <= depositEnd)
                  ) {
                    if (isRightFee) {
                      if (!data.isRightFee || data.rightFee === 0) {
                        finalResult.push(data);
                      }
                    } else {
                      if (
                        (!data.isRightFee && rightFeeStart === 0) ||
                        data.rightFee === "협의" ||
                        (data.rightFee >= rightFeeStart &&
                          (rightFeeLimit ? true : data.rightFee <= rightFeeEnd))
                      ) {
                        finalResult.push(data);
                      }
                    }
                  }
                } else if (data.isTrading) {
                  if (
                    (type === "" || type === "매매") &&
                    data.tradingPrice >= tradingStart &&
                    (tradingLimit ? true : data.tradingPrice <= tradingEnd)
                  ) {
                    if (isRightFee) {
                      if (!data.isRightFee || data.rightFee === 0) {
                        finalResult.push(data);
                      }
                    } else {
                      if (
                        (!data.isRightFee && rightFeeStart === 0) ||
                        data.rightFee === "협의" ||
                        (data.rightFee * unitNumber[data.rightFeeUnit] >=
                          rightFeeStart * unitNumber["만"] &&
                          (rightFeeLimit
                            ? true
                            : data.rightFee * unitNumber[data.rightFeeUnit] <=
                              rightFeeEnd * unitNumber["만"]))
                      ) {
                        finalResult.push(data);
                      }
                    }
                  }
                }
              }
            })
          );

          const cnt = finalResult.length;

          const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

          return parseInt(realTotalPage);
        }
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductTotalPageOnlyCntForMain: async (_, args) => {
      const {
        category,
        filterTab,
        starList,
        type,
        monthStart,
        monthEnd,
        monthLimit,
        depositStart,
        depositEnd,
        depositLimit,
        tradingStart,
        tradingEnd,
        tradingLimit,
        rightFeeStart,
        rightFeeEnd,
        rightFeeLimit,
        isRightFee,
        contractAreaStart,
        contractAreaEnd,
        contractAreaLimit,
        floor,
        isParking,
        isElevator,
        restroom1,
        restroom2,
        isCeiling,
        buildingUse,
        productType,
      } = args;

      try {
        let where = {
          buildingUse: { $regex: `.*${buildingUse}.*` },
          productType:
            filterTab === 0
              ? "사무실"
              : filterTab === 1
              ? "상가"
              : filterTab === 2
              ? productType === "포룸+"
                ? { $in: ["오피스텔", "아파트"] }
                : productType === ""
                ? { $in: ["원룸", "투룸", "쓰리룸", "오피스텔", "아파트"] }
                : { $regex: `.*${productType}.*` }
              : filterTab === 3
              ? productType === "포룸+"
                ? { $in: ["오피스텔", "아파트"] }
                : productType === ""
                ? {
                    $in: [
                      "원룸",
                      "투룸",
                      "쓰리룸",
                      "오피스텔",
                      "아파트",
                      "상가",
                      "사무실",
                    ],
                  }
                : { $regex: `.*${productType}.*` }
              : { $regex: `.*${productType}.*` },
          isParking:
            isParking === "true"
              ? true
              : isParking === "false"
              ? false
              : { $in: [true, false] },
          isElevator:
            isElevator === "true"
              ? true
              : isElevator === "false"
              ? false
              : { $in: [true, false] },
          restroom: {
            $regex: `.*${restroom1}.*(.*${restroom2}.*)`,
          },
          isCeiling: isCeiling ? true : { $in: [true, false] },
          status: 1,
          isView: true,
          isDelete: false,
        };

        let find = {
          $and: [
            ...where,
            floor === "1층"
              ? { floor: { $in: ["1층", "반지층", "1.5층"] } }
              : floor === "2층"
              ? { floor: { $in: ["2층", "복층"] } }
              : floor === "지하층"
              ? {
                  $or: [
                    {
                      floor: {
                        $regex: `.*지.*층.*`,
                      },
                    },
                    {
                      floor: {
                        $regex: `.*-.*층.*`,
                      },
                    },
                  ],
                }
              : {
                  floor: { $regex: `.*${floor}.*` },
                },
          ],
        };

        let newResult = null;

        if (category === "") {
          const result = await Product.find(find)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
              },
            });

          newResult = result;
        } else if (category === "홍대사무실 테마별") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              match: {
                name: "甲인테리어 사무실",
              },
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
              },
            });

          newResult = result.filter((data) => {
            return data.categoryList.length > 0;
          });
        } else if (category === "홍대상가 테마별") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
              },
            });

          newResult = result;
        } else if (category === "홍대사무실 실평형") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
                match: {
                  name: "홍대사무실 실평형",
                },
              },
            });

          newResult = await result.filter((data) => {
            let flag = false;

            if (!data.categoryList) return false;

            data.categoryList.map((data2) => {
              if (data2.parentMenu != null) {
                flag = true;
                return;
              }
            });

            return flag;
          });
        } else if (category === "홍대상가 실평형") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
                match: {
                  name: "홍대상가 실평형",
                },
              },
            });

          newResult = result.filter((data) => {
            let flag = false;

            if (!data.categoryList) return false;

            data.categoryList.map((data2) => {
              if (data2.parentMenu != null) {
                flag = true;
                return;
              }
            });

            return flag;
          });
        } else if (category === "홍대Home/ 주택") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
                match: {
                  name: "홍대Home/ 주택",
                },
              },
            });

          newResult = result.filter((data) => {
            let flag = false;

            if (!data.categoryList) return false;

            data.categoryList.map((data2) => {
              if (data2.parentMenu != null) {
                flag = true;
                return;
              }
            });

            return flag;
          });
        } else if (category === "홍대매매 정보") {
          const result = await Product.find(where)
            .lean()
            .sort({
              createdAt: -1,
            })
            .populate({
              path: `categoryList`,
              model: MenuDepth_2,
              populate: {
                path: "parentMenu",
                model: MenuDepth_1,
                match: {
                  name: "홍대매매 정보",
                },
              },
            });

          newResult = result.filter((data) => {
            let flag = false;

            if (!data.categoryList) return false;

            data.categoryList.map((data2) => {
              if (data2.parentMenu != null) {
                flag = true;
                return;
              }
            });

            return flag;
          });
        } else {
          return [];
        }
        if (newResult) {
          const finalResult = [];

          await Promise.all(
            newResult.map((data) => {
              if (filterTab === 3) {
                if (!starList.includes(String(data._id))) {
                  return;
                }
              }

              if (
                data.contractArea >=
                  parseFloat(areaCalculation(contractAreaStart)) &&
                data.contractArea <=
                  parseFloat(areaCalculation(contractAreaEnd))
              ) {
                if (data.isMonthly) {
                  if (
                    (type === "" || type === "월세") &&
                    data.monthlyPrice >= monthStart &&
                    (monthLimit ? true : data.monthlyPrice <= monthEnd) &&
                    data.monthlyDeposit >= depositStart &&
                    (depositLimit ? true : data.monthlyDeposit <= depositEnd)
                  ) {
                    if (isRightFee) {
                      if (!data.isRightFee || data.rightFee === 0) {
                        finalResult.push(data);
                      }
                    } else {
                      if (
                        (!data.isRightFee && rightFeeStart === 0) ||
                        data.rightFee === "협의" ||
                        (data.rightFee >= rightFeeStart &&
                          (rightFeeLimit ? true : data.rightFee <= rightFeeEnd))
                      ) {
                        finalResult.push(data);
                      }
                    }
                  }
                } else if (data.isJeonse) {
                  if (
                    (type === "" || type === "전세") &&
                    data.jeonseDeposit >= depositStart &&
                    (depositLimit ? true : data.jeonseDeposit <= depositEnd)
                  ) {
                    if (isRightFee) {
                      if (!data.isRightFee || data.rightFee === 0) {
                        finalResult.push(data);
                      }
                    } else {
                      if (
                        (!data.isRightFee && rightFeeStart === 0) ||
                        data.rightFee === "협의" ||
                        (data.rightFee >= rightFeeStart &&
                          (rightFeeLimit ? true : data.rightFee <= rightFeeEnd))
                      ) {
                        finalResult.push(data);
                      }
                    }
                  }
                } else if (data.isTrading) {
                  if (
                    (type === "" || type === "매매") &&
                    data.tradingPrice >= tradingStart &&
                    (tradingLimit ? true : data.tradingPrice <= tradingEnd)
                  ) {
                    if (isRightFee) {
                      if (!data.isRightFee || data.rightFee === 0) {
                        finalResult.push(data);
                      }
                    } else {
                      if (
                        (!data.isRightFee && rightFeeStart === 0) ||
                        data.rightFee === "협의" ||
                        (data.rightFee * unitNumber[data.rightFeeUnit] >=
                          rightFeeStart * unitNumber["만"] &&
                          (rightFeeLimit
                            ? true
                            : data.rightFee * unitNumber[data.rightFeeUnit] <=
                              rightFeeEnd * unitNumber["만"]))
                      ) {
                        finalResult.push(data);
                      }
                    }
                  }
                }
              }
            })
          );

          const cnt = finalResult.length;

          return parseInt(cnt);
        }
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductForAdmin: async (_, args) => {
      const {
        id,
        currentPage,
        limit,
        searchType,
        searchKeyword,
        searchProductType,
        searchTab,
        searchOrder,
      } = args;

      let find = {
        isDelete: false,
        // manager: id,
      };

      let sort = {};

      const manager = await AdminUser.find({
        name: searchKeyword,
      });

      const managerList = [];

      await Promise.all(
        manager.map((data) => {
          managerList.push({
            manager: data._id,
          });
        })
      );

      if (searchType === "1") {
        find["$or"] = [
          { productNo: { $regex: `.*${searchKeyword}.*` } },
          { title: { $regex: `.*${searchKeyword}.*` } },
          { address: { $regex: `.*${searchKeyword}.*` } },
          { roadAddress: { $regex: `.*${searchKeyword}.*` } },
          { memo: { $regex: `.*${searchKeyword}.*` } },
        ];
        if (managerList.length > 0)
          find["$or"].push({
            $or: [...managerList],
          });
      } else if (searchType === "2") {
        const split = searchKeyword.split("~");

        if (split[0] && split[1]) {
          find["$and"] = [
            {
              contractArea: { $gte: split[0] },
            },
            {
              contractArea: { $lte: split[1] },
            },
          ];
        } else if (split[0] && !split[1]) {
          find["contractArea"] = {
            $gte: split[0],
          };
        } else if (!split[0] && split[1]) {
          find["contractArea"] = {
            $lte: split[1],
          };
        }
      } else if (searchType === "3") {
        const split = searchKeyword.split("~");

        if (split[0] && split[1]) {
          find["$and"] = [
            {
              monthlyPrice: { $gte: split[0] },
            },
            {
              monthlyPrice: { $lte: split[1] },
            },
          ];
        } else if (split[0] && !split[1]) {
          find["monthlyPrice"] = {
            $gte: split[0],
          };
        } else if (!split[0] && split[1]) {
          find["monthlyPrice"] = {
            $lte: split[1],
          };
        }
      } else if (searchType === "4") {
        if (searchKeyword === "O") {
          find["isCeiling"] = true;
        } else if (searchKeyword === "X") {
          find["isCeiling"] = false;
        }
      }

      if (searchProductType === "2") {
        find["productType"] = {
          $in: ["원룸", "투룸", "쓰리룸", "오피스텔", "아파트"],
        };
      } else if (searchProductType === "3") {
        find["productType"] = "사무실";
      } else if (searchProductType === "4") {
        find["productType"] = "상가";
      }

      if (searchOrder === "1") {
        sort.createdAt = -1;
      } else if (searchOrder === "2") {
        sort.updatedAt = -1;
      }

      try {
        const result = await Product.find(find)
          .lean()
          .populate({
            path: `manager`,
            model: AdminUser,
          })
          .sort(sort);

        // let finalResult = result.filter((data) => {
        //   return data.manager.right === 2;
        // });

        let finalResult = result;

        if (searchTab === "1") {
          finalResult = await finalResult.filter((data) => {
            return data.status === 1;
          });
        } else if (searchTab === "2") {
          finalResult = await finalResult.filter((data) => {
            return data.isView && !data.isComplete && data.status === 1;
          });
        } else if (searchTab === "3") {
          finalResult = await finalResult.filter((data) => {
            return !data.isView && !data.isComplete && data.status === 1;
          });
        } else if (searchTab === "4") {
          finalResult = await finalResult.filter((data) => {
            return data.isComplete && data.status === 1;
          });
        }

        return finalResult;

        // return finalResult.slice(
        //   currentPage * limit,
        //   currentPage * limit + limit
        // );
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductTotalPageForAdmin: async (_, args) => {
      const {
        id,
        limit,
        searchType,
        searchKeyword,
        searchProductType,
        searchTab,
        searchOrder,
      } = args;

      let find = {
        isDelete: false,
        // manager: id,
      };

      let sort = {};

      const manager = await AdminUser.find({
        name: searchKeyword,
      });

      const managerList = [];

      await Promise.all(
        manager.map((data) => {
          managerList.push({
            manager: data._id,
          });
        })
      );

      if (searchType === "1") {
        find["$or"] = [
          { productNo: { $regex: `.*${searchKeyword}.*` } },
          { title: { $regex: `.*${searchKeyword}.*` } },
          { address: { $regex: `.*${searchKeyword}.*` } },
          { roadAddress: { $regex: `.*${searchKeyword}.*` } },
          { memo: { $regex: `.*${searchKeyword}.*` } },
        ];
        if (managerList.length > 0)
          find["$or"].push({
            $or: [...managerList],
          });
      } else if (searchType === "2") {
        const split = searchKeyword.split("~");

        if (split[0] && split[1]) {
          find["$and"] = [
            {
              contractArea: { $gte: split[0] },
            },
            {
              contractArea: { $lte: split[1] },
            },
          ];
        } else if (split[0] && !split[1]) {
          find["contractArea"] = {
            $gte: split[0],
          };
        } else if (!split[0] && split[1]) {
          find["contractArea"] = {
            $lte: split[1],
          };
        }
      } else if (searchType === "3") {
        const split = searchKeyword.split("~");

        if (split[0] && split[1]) {
          find["$and"] = [
            {
              monthlyPrice: { $gte: split[0] },
            },
            {
              monthlyPrice: { $lte: split[1] },
            },
          ];
        } else if (split[0] && !split[1]) {
          find["monthlyPrice"] = {
            $gte: split[0],
          };
        } else if (!split[0] && split[1]) {
          find["monthlyPrice"] = {
            $lte: split[1],
          };
        }
      } else if (searchType === "4") {
        if (searchKeyword === "O") {
          find["isCeiling"] = true;
        } else if (searchKeyword === "X") {
          find["isCeiling"] = false;
        }
      }

      if (searchProductType === "2") {
        find["productType"] = {
          $in: ["원룸", "투룸", "쓰리룸", "오피스텔", "아파트"],
        };
      } else if (searchProductType === "3") {
        find["productType"] = "사무실";
      } else if (searchProductType === "4") {
        find["productType"] = "상가";
      }

      if (searchOrder === "1") {
        sort.createdAt = -1;
      } else if (searchOrder === "2") {
        sort.updatedAt = -1;
      }

      try {
        const result = await Product.find(find)
          .lean()
          .populate({
            path: `manager`,
            model: AdminUser,
          })
          .sort(sort);

        // let finalResult = result.filter((data) => {
        //   return data.manager.right === 2;
        // });

        let finalResult = result;

        if (searchTab === "1") {
          finalResult = await finalResult.filter((data) => {
            return data.status === 1;
          });
        } else if (searchTab === "2") {
          finalResult = await finalResult.filter((data) => {
            return data.isView && !data.isComplete && data.status === 1;
          });
        } else if (searchTab === "3") {
          finalResult = await finalResult.filter((data) => {
            return !data.isView && !data.isComplete && data.status === 1;
          });
        } else if (searchTab === "4") {
          finalResult = await finalResult.filter((data) => {
            return data.isComplete && data.status === 1;
          });
        }

        const cnt = finalResult.length;

        const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

        return parseInt(realTotalPage);
      } catch (e) {
        console.log(e);
        return 0;
      }
    },

    getProductTotalPageOnlyCntForAdmin: async (_, args) => {
      const { id, searchType, searchKeyword, searchProductType, searchOrder } =
        args;

      let find = {
        isDelete: false,
        // manager: id,
      };

      let sort = {};

      const manager = await AdminUser.find({
        name: searchKeyword,
      });

      const managerList = [];

      await Promise.all(
        manager.map((data) => {
          managerList.push({
            manager: data._id,
          });
        })
      );

      if (searchType === "1") {
        find["$or"] = [
          { productNo: { $regex: `.*${searchKeyword}.*` } },
          { title: { $regex: `.*${searchKeyword}.*` } },
          { address: { $regex: `.*${searchKeyword}.*` } },
          { roadAddress: { $regex: `.*${searchKeyword}.*` } },
          { memo: { $regex: `.*${searchKeyword}.*` } },
        ];
        if (managerList.length > 0)
          find["$or"].push({
            $or: [...managerList],
          });
      } else if (searchType === "2") {
        const split = searchKeyword.split("~");

        if (split[0] && split[1]) {
          find["$and"] = [
            {
              contractArea: { $gte: split[0] },
            },
            {
              contractArea: { $lte: split[1] },
            },
          ];
        } else if (split[0] && !split[1]) {
          find["contractArea"] = {
            $gte: split[0],
          };
        } else if (!split[0] && split[1]) {
          find["contractArea"] = {
            $lte: split[1],
          };
        }
      } else if (searchType === "3") {
        const split = searchKeyword.split("~");

        if (split[0] && split[1]) {
          find["$and"] = [
            {
              monthlyPrice: { $gte: split[0] },
            },
            {
              monthlyPrice: { $lte: split[1] },
            },
          ];
        } else if (split[0] && !split[1]) {
          find["monthlyPrice"] = {
            $gte: split[0],
          };
        } else if (!split[0] && split[1]) {
          find["monthlyPrice"] = {
            $lte: split[1],
          };
        }
      } else if (searchType === "4") {
        if (searchKeyword === "O") {
          find["isCeiling"] = true;
        } else if (searchKeyword === "X") {
          find["isCeiling"] = false;
        }
      }

      if (searchProductType === "2") {
        find["productType"] = {
          $in: ["원룸", "투룸", "쓰리룸", "오피스텔", "아파트"],
        };
      } else if (searchProductType === "3") {
        find["productType"] = "사무실";
      } else if (searchProductType === "4") {
        find["productType"] = "상가";
      }

      if (searchOrder === "1") {
        sort.createdAt = -1;
      } else if (searchOrder === "2") {
        sort.updatedAt = -1;
      }

      try {
        const result = await Product.find(find)
          .lean()
          .populate({
            path: `manager`,
            model: AdminUser,
          })
          .sort(sort);

        // const finalResult = result.filter((data) => {
        //   return data.manager.right === 2;
        // });

        let finalResult = result;

        const cnt = finalResult.length;

        const tabData01 = await finalResult.filter((data) => {
          return data.status === 1;
        });

        const tabData02 = await finalResult.filter((data) => {
          return data.isView && !data.isComplete && data.status === 1;
        });

        const tabData03 = await finalResult.filter((data) => {
          return !data.isView && !data.isComplete && data.status === 1;
        });

        const tabData04 = await finalResult.filter((data) => {
          return data.isComplete && data.status === 1;
        });

        return {
          cnt: parseInt(cnt),
          tabCount01: tabData01.length,
          tabCount02: tabData02.length,
          tabCount03: tabData03.length,
          tabCount04: tabData04.length,
        };
      } catch (e) {
        console.log(e);
        return {};
      }
    },

    getTotalProductForAdmin: async (_, args) => {
      const { searchType, searchKeyword, searchProductType } = args;

      let find = {
        isDelete: false,
      };

      let sort = {};

      const manager = await AdminUser.find({
        name: searchKeyword,
      });

      const managerList = [];

      await Promise.all(
        manager.map((data) => {
          managerList.push({
            manager: data._id,
          });
        })
      );

      if (searchType === "1") {
        find["$or"] = [
          { productNo: { $regex: `.*${searchKeyword}.*` } },
          { title: { $regex: `.*${searchKeyword}.*` } },
          { address: { $regex: `.*${searchKeyword}.*` } },
          { roadAddress: { $regex: `.*${searchKeyword}.*` } },
          { memo: { $regex: `.*${searchKeyword}.*` } },
        ];
        if (managerList.length > 0)
          find["$or"].push({
            $or: [...managerList],
          });
      } else if (searchType === "2") {
        const split = searchKeyword.split("~");

        if (split[0] && split[1]) {
          find["$and"] = [
            {
              contractArea: { $gte: split[0] },
            },
            {
              contractArea: { $lte: split[1] },
            },
          ];
        } else if (split[0] && !split[1]) {
          find["contractArea"] = {
            $gte: split[0],
          };
        } else if (!split[0] && split[1]) {
          find["contractArea"] = {
            $lte: split[1],
          };
        }
      } else if (searchType === "3") {
        const split = searchKeyword.split("~");

        if (split[0] && split[1]) {
          find["$and"] = [
            {
              monthlyPrice: { $gte: split[0] },
            },
            {
              monthlyPrice: { $lte: split[1] },
            },
          ];
        } else if (split[0] && !split[1]) {
          find["monthlyPrice"] = {
            $gte: split[0],
          };
        } else if (!split[0] && split[1]) {
          find["monthlyPrice"] = {
            $lte: split[1],
          };
        }
      } else if (searchType === "4") {
        if (searchKeyword === "O") {
          find["isCeiling"] = true;
        } else if (searchKeyword === "X") {
          find["isCeiling"] = false;
        }
      }

      if (searchProductType === "2") {
        find["productType"] = {
          $in: ["원룸", "투룸", "쓰리룸", "오피스텔", "아파트"],
        };
      } else if (searchProductType === "3") {
        find["productType"] = "사무실";
      } else if (searchProductType === "4") {
        find["productType"] = "상가";
      }

      try {
        const result = await Product.find(find).lean().populate({
          path: `manager`,
          model: AdminUser,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getProductDetail: async (_, args) => {
      const { id } = args;

      if (!id) return null;

      try {
        const result = await Product.findOne({ _id: id }).lean().populate({
          path: `categoryList`,
          model: MenuDepth_2,
        });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
  },

  Mutation: {
    createProduct: async (_, args) => {
      const {
        categoryList,
        manager,
        productType,
        buildingType,
        buildingUse,
        address,
        roadAddress,
        detailAddress,
        viewAddress,
        addressLat,
        addressLng,
        subwayTime,
        subwayTime2,
        subwayCarTime,
        subwayCarTime2,
        subwayName,
        subwayName2,
        isMonthly,
        monthlyDeposit,
        monthlyDepositUnit,
        monthlyPrice,
        monthlyPriceUnit,
        isMonthlyCheck,
        isJeonse,
        jeonseDeposit,
        jeonseDepositUnit,
        isJeonseCheck,
        isTrading,
        tradingPrice,
        tradingPriceUnit,
        isTradingCheck,
        isManagementFee,
        managementFee,
        managementFeeUnit,
        isRightFee,
        rightFee,
        rightFeeUnit,
        pyeongPrice,
        pyeongPriceUnit,
        totalFloor,
        floor,
        realArea,
        contractArea,
        dedicatedArea,
        groundArea,
        isParking,
        parkingNumber,
        totalParkingNumber,
        parkType1,
        parkType2,
        isElevator,
        elevatorNumber,
        isHeating,
        heatingType,
        moveInDate,
        entranceDirection,
        useApprovalDate,
        restroom,
        usage,
        roomNumber,
        isCeiling,
        title,
        description,
        listTitle,
        listSubTitle,
        additionalContent,
        content,
        privateAddress,
        privateTel,
        privateTel2,
        memo,
        privateRemark,
        thumbnailPath,
        detailImagePaths,
      } = args;

      try {
        const current = await CURRENT_TIME();

        const categoryObjectList = [];

        categoryList.map((data) => {
          categoryObjectList.push(mongoose.Types.ObjectId(data));
        });

        const managerId = mongoose.Types.ObjectId(manager);

        let adminUser = await AdminUser.find({
          _id: manager,
        });

        let product = await Product.find({
          createdAt: {
            $gt: current.substring(0, 10),
          },
        });

        // let status = adminUser[0].right === 1 ? 1 : 0;
        let status = 1;

        let productNo = current.substring(0, 10).replace(/-/g, "");
        productNo = productNo.substring(2, productNo.length);

        const length =
          product.length < 9
            ? "0" + (product.length + 1)
            : String(product.length + 1);
        productNo += length;

        const result = await Product.create({
          productNo,
          categoryList: categoryObjectList,
          manager: managerId,
          productType,
          buildingType,
          buildingUse,
          address,
          roadAddress,
          detailAddress,
          viewAddress,
          addressLat,
          addressLng,
          subwayTime,
          subwayTime2,
          subwayCarTime,
          subwayCarTime2,
          subwayName,
          subwayName2,
          isMonthly,
          monthlyDeposit,
          monthlyDepositUnit,
          monthlyPrice,
          monthlyPriceUnit,
          isMonthlyCheck,
          isJeonse,
          jeonseDeposit,
          jeonseDepositUnit,
          isJeonseCheck,
          isTrading,
          tradingPrice,
          tradingPriceUnit,
          isTradingCheck,
          isManagementFee,
          managementFee,
          managementFeeUnit,
          isRightFee,
          rightFee,
          rightFeeUnit,
          pyeongPrice,
          pyeongPriceUnit,
          totalFloor,
          floor,
          realArea,
          contractArea,
          dedicatedArea,
          groundArea,
          isParking,
          parkingNumber,
          totalParkingNumber,
          parkType1,
          parkType2,
          isElevator,
          elevatorNumber,
          isHeating,
          heatingType,
          moveInDate,
          entranceDirection,
          useApprovalDate,
          restroom,
          usage,
          roomNumber,
          isCeiling,
          title,
          description,
          listTitle,
          listSubTitle,
          additionalContent,
          content,
          privateAddress,
          privateTel,
          privateTel2,
          memo,
          privateRemark,
          thumbnailPath,
          detailImagePaths: detailImagePaths || [],
          status,
          createdAt: current,
          updatedAt: current,
        });

        console.log("============================================");
        console.log("CREATE COMPLETE !! " + result._id);
        console.log("detailImagePaths " + detailImagePaths.length);
        console.log("detailImagePaths " + detailImagePaths[0]);
        console.log("============================================");

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProduct: async (_, args) => {
      const {
        id,
        categoryList,
        productType,
        buildingType,
        buildingUse,
        address,
        roadAddress,
        detailAddress,
        viewAddress,
        addressLat,
        addressLng,
        subwayTime,
        subwayTime2,
        subwayCarTime,
        subwayCarTime2,
        subwayName,
        subwayName2,
        isMonthly,
        monthlyDeposit,
        monthlyDepositUnit,
        monthlyPrice,
        monthlyPriceUnit,
        isMonthlyCheck,
        isJeonse,
        jeonseDeposit,
        jeonseDepositUnit,
        isJeonseCheck,
        isTrading,
        tradingPrice,
        tradingPriceUnit,
        isTradingCheck,
        isManagementFee,
        managementFee,
        managementFeeUnit,
        isRightFee,
        rightFee,
        rightFeeUnit,
        pyeongPrice,
        pyeongPriceUnit,
        totalFloor,
        floor,
        realArea,
        contractArea,
        dedicatedArea,
        groundArea,
        isParking,
        parkingNumber,
        totalParkingNumber,
        parkType1,
        parkType2,
        isElevator,
        elevatorNumber,
        isHeating,
        heatingType,
        moveInDate,
        entranceDirection,
        useApprovalDate,
        restroom,
        usage,
        roomNumber,
        isCeiling,
        title,
        description,
        listTitle,
        listSubTitle,
        additionalContent,
        content,
        privateAddress,
        privateTel,
        privateTel2,
        memo,
        privateRemark,
        thumbnailPath,
        detailImagePaths,
      } = args;

      try {
        const current = await CURRENT_TIME();

        const categoryObjectList = [];

        categoryList.map((data) => {
          categoryObjectList.push(mongoose.Types.ObjectId(data));
        });

        const currentProduct = await Product.findOne({
          _id: id,
        });

        // if (moment(current).diff(currentProduct.updatedAt, "m") < 3) {
        //   return false;
        // } else {
        const result = await Product.updateOne(
          { _id: id },
          {
            $set: {
              categoryList: categoryObjectList,
              productType,
              buildingType,
              buildingUse,
              address,
              roadAddress,
              detailAddress,
              viewAddress,
              addressLat,
              addressLng,
              subwayTime,
              subwayTime2,
              subwayCarTime,
              subwayCarTime2,
              subwayName,
              subwayName2,
              isMonthly,
              monthlyDeposit,
              monthlyDepositUnit,
              monthlyPrice,
              monthlyPriceUnit,
              isMonthlyCheck,
              isJeonse,
              jeonseDeposit,
              jeonseDepositUnit,
              isJeonseCheck,
              isTrading,
              tradingPrice,
              tradingPriceUnit,
              isTradingCheck,
              isManagementFee,
              managementFee,
              managementFeeUnit,
              isRightFee,
              rightFee,
              rightFeeUnit,
              pyeongPrice,
              pyeongPriceUnit,
              totalFloor,
              floor,
              realArea,
              contractArea,
              dedicatedArea,
              groundArea,
              isParking,
              parkingNumber,
              totalParkingNumber,
              parkType1,
              parkType2,
              isElevator,
              elevatorNumber,
              isHeating,
              heatingType,
              moveInDate,
              entranceDirection,
              useApprovalDate,
              restroom,
              usage,
              roomNumber,
              isCeiling,
              title,
              description,
              listTitle,
              listSubTitle,
              additionalContent,
              content,
              privateAddress,
              privateTel,
              privateTel2,
              memo,
              privateRemark,
              thumbnailPath,
              detailImagePaths: detailImagePaths || [],
              updatedAt: current,
            },
          }
        );
        // }
        console.log("============================================");
        console.log("UPDATE COMPLETE !! " + id);
        console.log("detailImagePaths " + detailImagePaths.length);
        console.log("detailImagePaths " + detailImagePaths[0]);
        console.log("============================================");

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteProduct: async (_, args) => {
      const { id } = args;

      try {
        const result = await Product.updateOne(
          {
            _id: id,
          },
          {
            isDelete: true,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProductManager: async (_, args) => {
      const { id, manager } = args;

      try {
        const managerId = mongoose.Types.ObjectId(manager);

        const result = await Product.updateOne(
          {
            _id: id,
          },
          {
            manager: managerId,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProductStatus: async (_, args) => {
      const { id, status } = args;

      try {
        const result = await Product.updateOne(
          {
            _id: id,
          },
          {
            status,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProductView: async (_, args) => {
      const { id, isView } = args;

      try {
        const result = await Product.updateOne(
          {
            _id: id,
          },
          {
            isView,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProductOpen: async (_, args) => {
      const { id, isOpen } = args;

      try {
        const result = await Product.updateOne(
          {
            _id: id,
          },
          {
            isOpen,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProductMap: async (_, args) => {
      const { id, isMap } = args;

      try {
        const result = await Product.updateOne(
          {
            _id: id,
          },
          {
            isMap,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProductComplete: async (_, args) => {
      const { id, isComplete } = args;

      try {
        const result = await Product.updateOne(
          {
            _id: id,
          },
          {
            isComplete,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProductBest: async (_, args) => {
      const { id, isBest } = args;

      try {
        const result = await Product.updateOne(
          {
            _id: id,
          },
          {
            isBest,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProductHit: async (_, args) => {
      const { id, hit } = args;

      try {
        const result = await Product.updateOne(
          {
            _id: id,
          },
          {
            hit,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProductStar: async (_, args) => {
      const { id, star } = args;

      try {
        const result = await Product.updateOne(
          {
            _id: id,
          },
          {
            star,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    updateProductImagePaths: async (_, args) => {
      const { id, detailImagePaths } = args;

      try {
        await Product.updateOne(
          { _id: id },
          {
            detailImagePaths: detailImagePaths,
          }
        );

        return true;

        // return new Promise(async (resolve, reject) => {
        //   const result = await Product.find();

        //   await Promise.all(
        //     result.map(async (data) => {
        //       let detailImagePaths = [];

        //       await Promise.all(
        //         data.detailImagePaths.map(async (data2) => {
        //           detailImagePaths.push(
        //             data2.replace("productDetail", "productDetail_v2")
        //           );
        //         })
        //       );
        //     })
        //   );

        //   resolve(true);
        // });
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
