import { DATABASE_NAME } from "@/lib/config";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  // Extract the userAddress from the Authorization header

  // Query the requests collection for properties associated with the userAddress
  const requests = await client
    .db(DATABASE_NAME)
    .collection("requests")
    .find({
      status: "approved",
    })
    .sort({ requestedAt: -1 }) // Sort by requestedAt date in descending order
    .toArray();

  // Fetch additional metadata for each request
  const enhancedRequests = await Promise.all(
    requests.map(async (request) => {
      // Fetch the requestedBy user details
      const owner = await client
        .db(DATABASE_NAME)
        .collection("users")
        .findOne(
          { walletAddress: request.ownerAddress },
          { projection: { firstName: 1, lastName: 1, avatar: 1 } }
        );

      // Fetch the property details
      const property = await client
        .db(DATABASE_NAME)
        .collection("properties")
        .findOne(
          { _id: new ObjectId(request.propertyId) },
          {
            projection: {
              name: 1,
              location: 1,
              type: 1,
              price: 1,
              images: 1,
              title: 1,
            },
          }
        );

      return {
        ...request,
        owner: owner || {},
        property: property || {},
      };
    })
  );

  // Return the enhanced response
  return new Response(JSON.stringify(enhancedRequests), {
    status: 200,
  });
}
