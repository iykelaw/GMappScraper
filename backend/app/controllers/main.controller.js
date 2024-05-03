const GetLocalCompanies = require("../services/scraper")

exports.ServerConnect = (req, res) => {
  // res.send({ msg: "" })
  res.json({ statusCode: 200, msg: "Server connection successful!!!" })
}

exports.Users = (req, res) => {
  // res.send({ msg: "" })
  res.json("Responded with users list")
}

exports.GMapScrap = async (req, res) => {
  const reqData = req.body;
  console.log(reqData)
  if (!reqData) return res.json({ statusCode: 400, msg: "Post data required" })
  
  const requestParams = {
    baseURL: `http://google.com`,
    query: reqData.query, // "Businesses+and+companies+in+abuja",                                          // what we want to search
    coordinates: reqData.coordinates, //"@9.0609704,7.3223774,12z",                 // parameter defines GPS coordinates of location where you want your query to be applied
    hl: "en",                                                    // parameter defines the language to use for the Google maps search
  };

  const companies = await GetLocalCompanies(requestParams)

  if (companies && companies.length > 0) {
    res.json({statusCode: 200, msg: "Companies data", companies})
  } else {
    res.json({statusCode: 300, msg: "Something went wrong"})
  }
  
}