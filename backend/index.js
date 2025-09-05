import express from "express";
import morgan from "morgan";
import cors from "cors";

//routers
import { userRouter } from "./routes/userRouter.js";
import { restaurantRouter } from "./routes/restaurantRouter.js"
import { reviewRouter } from "./routes/reviewRouter.js"
import { voteRouter } from "./routes/voteRouter.js";

//middlewares
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.static('public'));

//logging middleware
app.use(morgan('dev'));

var corsOptions = {
    origin: ["http://127.0.0.1:4200", "http://localhost:4200"],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

//JSON payload
app.use(express.json());

app.use(userRouter);
app.use(restaurantRouter);
app.use(reviewRouter);
app.use(voteRouter)

//global error handler, catches errors in all routes
app.use(globalErrorHandler);

app.listen(PORT);