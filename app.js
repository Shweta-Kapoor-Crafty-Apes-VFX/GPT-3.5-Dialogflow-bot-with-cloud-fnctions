const express = require("express");
const axios = require("axios");
const {Configuration, OpenAIApi} = require("openai");
require("dotenv").config();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const chatCompletion = async (prompt) => {
//  try {
//    const options = {
//      method: "POST",
//      url: "https://api.openai.com/v1/chat/completions",
//      headers: {
//        "Content-Type": "application/json",
//        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//      },
//      data: {
//        model: "gpt-3.5-turbo",
//        messages: [
//          {"role": "system", "content": "You are a helpful assistant."},
//          {"role": "user", "content": prompt},
//        ],
//      },
//    };

//    const response = await axios.request(options);

// /  const content = response.data.choices[0].message.content;

//    return {
//      status: 1,
//      response: content,
//    };
//  } catch (error) {
//    return {
//      status: 0,
//      response: "",
//    };
//  }
// };

const chatCompletion = async (prompt) => {
  try {
    const response = await openai.createChatCompletion(
        {
          model: "gpt-3.5-turbo",
          messages: [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
          ],
        },
    );

    const content = response.data.choices[0].message.content;

    return {
      status: 1,
      response: content,
    };
  } catch (error) {
    return {
      status: 0,
      response: "",
    };
  }
};

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Path ${req.path} with Method ${req.method}`);
  next();
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.post("/dialogflow", async (req, res) => {
  const action = req.body.queryResult.action;
  const queryText = req.body.queryResult.queryText;

  if (action === "input.unknown") {
    const result = await chatCompletion(queryText);
    if (result.status == 1) {
      res.send(
          {
            fulfillmentText: result.response,
          },
      );
    } else {
      res.send(
          {
            fulfillmentText: `Sorry, I'm not able to help with that.`,
          },
      );
    }
  } else {
    res.send(
        {
          fulfillmentText: `No handler for the action ${action}.`,
        },
    );
  }
});

module.exports =app;
