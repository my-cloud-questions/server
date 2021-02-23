import platformModel from "../../database/schema/platforms";
import { scan } from "../../database/operations";

const platforms = async (req, res) => {
  try {
    const result = await scan(platformModel);
    res.status(200);
    res.json({
      data: result.map(({ id }) => ({ value: id, label: id }))
    });
  } catch (err) {
    // console.log(err);
  }
};

export default platforms;
