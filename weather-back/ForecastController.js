require("dotenv").config();
const axios = require("axios");

var getForecast = async (req, resp) => {
  try {
    let { city, days } = req.body;
    const respdata = await axios.get(
      "http://api.weatherapi.com/v1/forecast.json",
      {
        params: {
          key: 'fed7f255b6264e378fe80711232602',
          q: city,
          days: days,
          aqi: "no",
          alerts: "no",
        },
      }
    );
    let response = {
      status: "success",
      data: respdata.data,
    };
    resp.status(200).json(response);
  } catch (e) {
    // console.log(e);
  }
};
module.exports = {
  getForecast,
};
