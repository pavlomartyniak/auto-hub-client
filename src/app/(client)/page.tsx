import { Box, Container, Pagination } from "@mui/material";
import SearchResults from "./_components/home/SearchResults";

const Page = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
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
