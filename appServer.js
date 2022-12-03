const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const basicHelper = require("./helpers/basic"),
  FetchImageFromStabilityAIService = require("./services/FetchImageFromStabilityAI");
MintNFTService = require("./services/MintNFT");

const PORT = 3000;

var cors = require("cors");
var app = express();

app.use(cors());

morgan.token("id", function getId(req) {
  return req.id;
});

// eslint-disable-next-line no-unused-vars
morgan.token("pid", function getPid(req) {
  return process.pid;
});

// eslint-disable-next-line no-unused-vars
morgan.token("endTime", function getEndTime(req) {
  return Date.now();
});

// eslint-disable-next-line no-unused-vars
morgan.token("endDateTime", function getEndDateTime(req) {
  const date = new Date();

  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds() +
    "." +
    date.getMilliseconds()
  );
});

morgan.token("ipAddress", function getIpAddress(req) {
  return req.headers["x-real-ip"];
});

app.use(
  morgan(
    "[:pid][:id][:endTime][" +
      "slackmin-demo" +
      '] Completed with ":status" in :response-time ms at :endDateTime -  ":res[content-length] bytes" - ":ipAddress" ":remote-user" - "HTTP/:http-version :method :url" - ":referrer" - ":user-agent" \n\n'
  )
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "2mb" }));

const logRequestParams = function (req, res, next) {
  console.info("Body ------ ", req.body);
  console.info("Params ------ ", req.params);
  console.info("Query ------ ", req.query);

  next();
};

app.use(logRequestParams);

app.get("/", function (req, res, next) {
  res.status(200).json({ status: "Up and Running" });
});

app.get("/api/health-checker", function (req, res, next) {
  res.status(200).json({ HealthCheckerStatus: "Server is up and running!" });
});

app.post("/api/fetch-stable-diffusion-image", async function (req, res, next) {
  try {
    const prompt = req.body.prompt,
      artStyle = req.body.art_style;
    const response = await new FetchImageFromStabilityAIService({
      prompt: prompt,
      artStyle: artStyle,
    }).perform();
    let status = true;
    if (!basicHelper.isEmptyObject(response.error)) {
      status = false;
    }
    return res.status(200).json({ success: status, data: response });
  } catch (err) {
    console.error();
    "error ---------", err;
    return res
      .status(200)
      .json({ success: false, err: { msg: "something went wrong" } });
  }
});

app.post("/api/mint-nft", async function (req, res, next) {
  try {
    const receiverAddress = req.body.receiver_address,
      imageCid = req.body.image_cid;
    const response = await new MintNFTService({
      receiverAddress: receiverAddress,
      imageCid: imageCid,
    }).perform();
    let status = true;
    if (!response.error) {
      status = false;
    }
    return res.status(200).json({ success: status, data: response });
  } catch (error) {
    console.error();
    "error ---------", error;
    return res
      .status(200)
      .json({
        success: false,
        err: { msg: "something went wrong", err_data: error },
      });
  }
});

app.listen(PORT);

console.info("Listening on " + PORT);
