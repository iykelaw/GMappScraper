const createCSVFile = async (companies, browser) => {
  const localCompanies = await GetLocalCompanies();
  
  if (localCompanies && localCompanies.length <= 0){
    await browser.close()
    return console.log("No companies found....");
  }
  else
    // Convert data to csv
    jsonexport(localCompanies, async (err, csv) => {
      if (err) return console.log(err)
      await writeFileSync("./csv/List of all companies in abuja.csv", csv, (err) => {
        if (err) return console.log(err)
        console.log("CSV saved ...", csv)
      })

      // await browser.close();
    })
    const localCompaniesWithWeb = localCompanies
      .filter((c) => c.website && c.website !== '')
      .map((m) => {
        m.email = ""
        return m
      })
  if (localCompaniesWithWeb && localCompaniesWithWeb.length < 1){
      await browser.close();
      return console.log("No companies with website found....")}
    else  
      jsonexport(localCompaniesWithWeb, async (err, csv) => {
        if (err) return console.log(err)
        await writeFileSync("./csv/Companies with website in abuja.csv", csv, (err) => {
          if (err) return console.log(err)
          console.log("CSV saved ...", csv)
        })

        // await delay(2000)
        // await browser.close();
      })
    await delay(2000)
    await browser.close();

  
}