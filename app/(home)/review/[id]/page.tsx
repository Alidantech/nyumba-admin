import { Box } from "@mui/material";
import ConfirmationPage from "./form";
import { getCookie } from "@/lib/utils/cookies.util";
import { API_URL } from "@/app/url";

export default async function RequestPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // Fetch property data
  const response = await fetch(`${API_URL}/properties/view/${id}`, {
    cache: "no-store",
  });

  // If the response is not ok, return an error
  if (!response.ok) {
    return <h1>Error fetching property</h1>;
  }

  // Parse the response
  const data = await response.json();

  // Return the data
  return (
    <Box p={2}>
      {data ? <ConfirmationPage property={data} /> : <>Not Found</>}
    </Box>
  );
}
