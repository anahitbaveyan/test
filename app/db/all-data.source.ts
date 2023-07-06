import {DataSource} from "typeorm";
import {config} from "./config";

const AllDataSource = new DataSource(config);
AllDataSource.initialize().catch(error=> console.log(error)
)
export default AllDataSource;