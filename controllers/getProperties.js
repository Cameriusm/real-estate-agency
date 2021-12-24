import pool from "../config/db";

const getAllProperties = (perPage, purpose) => {
  // res.send("Done Successfuly");
  // const { perPage, purpose } = req.query;
  console.log(perPage, purpose);
  pool.query(
    `SELECT * FROM property${
      purpose === "for-sale" ? " WHERE purpose_id = 1" : " WHERE purpose_id = 2"
    }${perPage ? " LIMIT 6" : ""}`,
    (err, result) => {
      if (err) {
        console.log(err);
        return [false];
      } else {
        console.log(result);
        console.log({ hitsssss: result });
        return { hits: result };
      }
    }
  );
};

export default getAllProperties;
