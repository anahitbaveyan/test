import express from 'express';
import {createDatabaseConnection} from "./db/connection";
import router from "./node/routes/node.routes";
import ErrorHandlerMiddleware from "./node/middlewares/error-handler.middleware";

const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use('/node', router)
app.use(ErrorHandlerMiddleware.init);


const port = 5000;

app.listen(port, async () => {
    const connection = await createDatabaseConnection()
    await connection.synchronize();
    console.log(`Server is running on port ${port}`);
});