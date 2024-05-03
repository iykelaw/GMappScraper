"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ScrapData } from "../core/services/scraper";
import { MainContext } from "../core/contexts/main.context";

type IScrapFormComponentProp = {
  searching: boolean;
  setSearching: Dispatch<SetStateAction<boolean>>;
};
type IForm = {
  query: string;
  coordinates: string;
};
const ScrapFormComponent: FC<IScrapFormComponentProp> = (props) => {
  const { searching, setSearching } = props;
  const { setScrapResults } = useContext(MainContext);
  const [form, setForm] = useState<IForm>();

  const handleScrap = async () => {
    setSearching(true);
    const { statusCode, companies } = await ScrapData(form);
    if (statusCode === 200 && companies) {
      setScrapResults(companies);
    }
  };

  const handleReset = () => {
    setSearching(false);
    setForm(undefined);
  };

  const handleChange =
    (prop: keyof IForm) => (event: ChangeEvent<HTMLInputElement>) => {
      if (!prop) return;

      setForm({
        ...(form as IForm),
        [prop]: event.target?.value,
      });
    };

  return (
    <Box width={{ xs: "95%", md: "70%" }} m={"auto"}>
      <Box px={{ xs: 1, md: 5 }} pt={{ xs: 4, md: 8 }}>
        <Typography color={"text.primary"}>
          Enter search query followed by search location coordinates
        </Typography>
      </Box>
      <Box p={{ xs: 1, md: 5 }}>
        <form action="handleScrap" method="post">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <TextField
                  id="query"
                  name="query"
                  value={form?.query || ""}
                  // error={}
                  fullWidth
                  label={"Search Query"}
                  placeholder="What to search on google map"
                  onChange={handleChange("query")}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <TextField
                  id="coordinates"
                  name="coordinates"
                  // error={!form?.location}
                  // onKeyUp={(e) => console.log(e.currentTarget)}
                  value={form?.coordinates || ""}
                  fullWidth
                  placeholder="Enter map location coordinate"
                  label={"Coordinates"}
                  onChange={handleChange("coordinates")}
                />
              </Box>
            </Grid>
            <Grid item xs>
              <Box>
                <Button
                  variant="outlined"
                  onClick={handleScrap}
                  disabled={!form || searching}
                  endIcon={
                    searching && (
                      <CircularProgress
                        sx={{
                          fontSize: 16,
                          width: "20px !important",
                          height: "20px !important",
                          ml: 1,
                          color: "inherit",
                        }}
                      />
                    )
                  }
                >
                  {searching ? "Searching" : "Search"}
                </Button>
                <Button sx={{ ml: 4 }} onClick={handleReset}>
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default ScrapFormComponent;
