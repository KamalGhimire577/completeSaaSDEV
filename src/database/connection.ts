import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: Number(process.env.DB_PORT),
  models:[__dirname + '/models']
});



// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("❌ Unable to connect to the database:", error);
  });


  /// migression code
  sequelize.sync({alter:false})
.then(()=>{
  console.log("migression success")
})
  export default sequelize;
