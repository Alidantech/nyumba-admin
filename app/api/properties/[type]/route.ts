import { DATABASE_NAME } from "@/lib/config";
import client from "@/lib/mongodb";

export async function GET(
  request: Request,
  context: { params: { type: string } }
) {
  // Get the property type from the request params
  const { type: propertyType } = context.params;

  // Fetch the property details by property ID
  const properties = await client
    .db(DATABASE_NAME)
    .collection("properties")
    .find({ propertyType, status: "pending_Approval" })
    .toArray();

  // Fetch user data for each property
  const propertiesWithUserData = await Promise.all(
    properties.map(async (property: any) => {
      const user = await client
        .db(DATABASE_NAME)
        .collection("users")
        .findOne(
          { walletAddress: property.ownerAddress },
          { projection: { firstName: 1, lastName: 1, avatar: 1 } } // Fetch only necessary fields
        );

      return { ...property, owner: user || {} };
    })
  );

  // Return response
  return new Response(JSON.stringify(propertiesWithUserData), {
    status: 200,
  });
}
