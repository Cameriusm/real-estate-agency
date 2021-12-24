import pool from "../config/db";

const getAllProperties = (req, res) => {
  // res.send("Done Successfuly");
  const { perPage, purpose } = req.query;
  console.log(perPage);
  pool.query(
    `SELECT * FROM property${
      purpose === "for-sale" ? " WHERE purpose_id = 1" : " WHERE purpose_id = 2"
    }${perPage ? " LIMIT 6" : ""}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send([false]);
      } else {
        res.send({ hits: result });
      }
    }
  );
};

export default getAllProperties;
