import Product from "../../graphql/models/Product";
import MenuDepth_2 from "../../graphql/models/MenuDepth_2";

const getProductDetail = async (req, res) => {
  const data = req.body;

  try {
    const result = await Product.findOne({ _id: data.id }).populate({
      path: `categoryList`,
      model: MenuDepth_2,
    });

    return res.json(result);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const MMController = {
  getProductDetail,
};

module.exports = MMController;
