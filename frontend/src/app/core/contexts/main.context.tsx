"use client";
import { createContext, useEffect, useState } from "react";
import { convertToCSVString, downloadCsvFile } from "../services/scraper";

export const MainContext = createContext<any>(null);

export const MainContextProvider = ({ children }: any) => {
  const [scrapResults, setScrapResults] = useState<Array<any>>();
  const [csvString, setCsvString] = useState("");

  // Call format as soon as data id ready
  useEffect(() => {
    if (!scrapResults || scrapResults?.length < 1) return;
    // console.log(scrapResults);
    convertScrappedResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrapResults]);

  // Format json results on the go and get it ready for user download
  const convertScrappedResult = async () => {
    const csvStringData = await convertToCSVString(scrapResults as []);
    if (!csvStringData) return;
    setCsvString(csvStringData);
  };

  const downloadScrapData = async () => {
    if (csvString === "") return alert("Csv file not found");
    await downloadCsvFile(csvString);
  };

  let value = {
    csvString,
    scrapResults,
    setScrapResults,
    downloadScrapData,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
