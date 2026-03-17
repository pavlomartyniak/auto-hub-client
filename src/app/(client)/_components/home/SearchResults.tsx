import { Box, Divider, Typography } from "@mui/material";
import STOCard from "@/components/shared/STOCard";
import { mockSTOs } from "@/utils/mocked-data";

const totalResults = mockSTOs.length;

const SearchResults = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
      }}
    >
      <Typography variant="body2">
        Found {totalResults} results near{" "}
        <Box component="span" fontWeight="600" color="common.black">
          Львів, Україна
        </Box>
      </Typography>

      <Divider />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        {mockSTOs.map((sto) => (
          <STOCard key={sto.id} sto={sto} />
        ))}
      </Box>
    </Box>
  );
};

export default SearchResults;
