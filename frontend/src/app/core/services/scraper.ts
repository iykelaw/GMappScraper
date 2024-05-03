//  Server api url
const api = "http://localhost:4030/";
// Set headers value for post call
const reqHeaders = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
});

/**
 * Make Api call to scrap and fetch scrapped data from the backend
 * @param data included are query and coordinates for the search
 * @returns response in json format
 */
export const ScrapData = async (data: any) => {
  // Api call to scrap and fetch scrapped data from the backend
  const res = await fetch(`${api}scrap`, {
    headers: reqHeaders,
    method: "post",
    body: JSON.stringify(data),
  });
  // Api response in json format
  return await res.json();
};

/**
 * Function to prepare json data for csv download
 * @param dataToConvert data to convert to csv
 * @returns value in csv format
 */
export const convertToCSVString = (dataToConvert: Array<any>) => {
  let csvHeader: string[] = [];
  // Map and get the header values for the CSV
  dataToConvert.map((d) => {
    Object.keys(d).forEach((key) => {
      const findStr = csvHeader.find((s) => s === key);
      if (!findStr) csvHeader.push(key);
    });
    return d;
  });

  // Check to make sure header has value
  if (csvHeader.length < 1) return "";

  // convert header values to string
  const headerString = csvHeader.join(",") + "\n";

  // Map Json data to match header and get CSV formatted rows
  const csvRows = dataToConvert
    .map((v) => {
      // Get rows based on header keys
      return csvHeader.map((h) => v[h] || "").join(",");
    })
    .join("\n");

  //  return a combined value
  return headerString + csvRows;
};

/**
 * Function accepts csv string and downloads file in csv format
 * @param csvString csv string for download
 * @returns
 */
export const downloadCsvFile = (csvString: string) => {
  // Check to make sure CSV string is not empty
  if (csvString === "") return alert("No data to export");

  // If data available
  //  Create the csv file for export
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "scrapped data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
