import pool from "../config/db";
import mysql from "mysql";
const getAllProperties = (req, res) => {
  // res.send("Done Successfuly");
  const { id } = req.query;

  // console.log(perPage);
  pool.query(`SELECT * FROM property WHERE id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      res.send([false]);
    } else {
      const property = result;
      // const property = { hits: result };
      // res.send({ hits: result });
      pool.query(
        `SELECT * FROM utility_property inner join utility on utility_id = id WHERE property_id = ${id}`,
        (err, result) => {
          if (err) {
            console.log(err);
            res.send([false]);
          } else {
            // property = ({hits: result})
            const utilities = result.map((item) => item.name);
            // console.log(property, amenities);
            // res.send({ ...property, ...amenities });
            console.log(utilities);

            property[0].amenities = utilities;

            // console.log(property.amenities.length);
            res.send(property[0]);
          }
        }
      );
    }
  });
};

export default getAllProperties;
