"use client";
import { DataObject, TableChart } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { MainContext } from "../core/contexts/main.context";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type IScrapResultComponentProp = {
  searching: boolean;
  setSearching: Dispatch<SetStateAction<boolean>>;
  // searchResults: Array<any>
};

const columns: GridColDef<any>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "company",
    headerName: "Company name",
    width: 150,
    // editable: true,
  },
  {
    field: "type",
    headerName: "Company type",
    width: 170,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    // type: "number",
    width: 210,
    editable: true,
  },
  {
    field: "website",
    headerName: "Website",
    // type: "number",
    width: 180,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    // type: "number",
    width: 210,
    // editable: true,
  },
  // {
  //   field: "address",
  //   headerName: "Address",
  //   // type: "number",
  //   width: 110,
  //   editable: true,
  // },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  // },
];

const ScrapResultComponent: FC<IScrapResultComponentProp> = (props) => {
  const { searching, setSearching } = props;
  const { scrapResults, downloadScrapData } = useContext(MainContext);
  const [viewType, setViewType] = useState("data");
  const [dataRows, setDataRows] = useState([]);
  const [dataCols, setDataCols] = useState(columns);

  useEffect(() => {
    if (!scrapResults) return;
    setSearching(false);
    scrapResults.map((s: any, i: any) => {
      s.id = i;
      return s;
    });
    setDataRows(scrapResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrapResults]);

  // const handleSetDataPre = () => {
  //   const hTag = document.getElementById("dataDisplay");
  //   const data = JSON.stringify(searchResults, null, 2);

  //   hTag && hTag?.dangerouslySetInnerHTML = data;
  // }

  const handleSwitchData = () => {
    setViewType("data");
  };
  const handleSwitchTable = () => {
    setViewType("table");
  };

  return (
    <Box px={{ xs: 1, md: 5 }} pt={{ xs: 4, md: 8 }}>
      <Toolbar sx={{ height: "60px" }}>
        <Box>
          <Typography>Search result</Typography>
        </Box>
        <Box flexGrow={1} />
        <Box pr={2}>
          <Button
            disabled={!scrapResults}
            variant="outlined"
            onClick={downloadScrapData}
          >
            Download CSV
          </Button>
        </Box>
        <Stack direction={"row"}>
          <Box>
            <IconButton onClick={handleSwitchData}>
              <DataObject color={viewType === "data" ? "primary" : "inherit"} />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={handleSwitchTable}>
              <TableChart
                color={viewType === "table" ? "primary" : "inherit"}
              />
            </IconButton>
          </Box>
        </Stack>
      </Toolbar>
      <Box height={"70vh"}>
        {searching ? (
          <>
            {viewType === "data" ? (
              <Box p={1} height={"inherit"}>
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"100%"}
                  sx={{ bgcolor: "grey.400", borderRadius: 2 }}
                />
              </Box>
            ) : (
              <Box p={1} height={"inherit"}>
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"50px"}
                  sx={{ bgcolor: "grey.400", borderRadius: 2 }}
                />
                <Stack spacing={2} direction={"row"} height={"inherit"} py={2}>
                  {Array.from(Array(6)).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      width={"15%"}
                      height={"100%"}
                      sx={{ bgcolor: "grey.400", borderRadius: 2 }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </>
        ) : (
          <>
            {viewType === "data" ? (
              <Box
                p={1}
                height={"inherit"}
                overflow={"auto"}
                border={"1px solid #e0e0e0"}
                borderRadius={4}
              >
                <pre
                  id="dataDisplay"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(scrapResults, null, 2),
                  }}
                ></pre>
              </Box>
            ) : (
              <Box
                p={1}
                height={"inherit"}
                overflow={"auto"}
                border={"1px solid #e0e0e0"}
                borderRadius={4}
              >
                <DataGrid columns={dataCols} rows={dataRows} />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ScrapResultComponent;
