import {
  Box,
  Container,
  Divider,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { HomeFilter } from "./_components/home/HomeFilter";
import SearchResults from "./_components/home/SearchResults";

const Page = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Container sx={{ flex: 1, py: 4, display: "flex" }}>
        <HomeFilter />
      </Container>

      <Box bgcolor="common.white">
        <Container
          sx={{
            flex: 1,
            py: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <SearchResults />
          <Pagination sx={{ placeSelf: "center" }} count={10} />
        </Container>
      </Box>
    </Box>
  );
};

export default Page;
