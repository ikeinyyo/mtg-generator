import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING || "";
const CONTAINER_NAME = process.env.AZURE_STORAGE_CARDS_CONTAINER_NAME || "";

export async function POST(request: Request) {
  try {
    const { cardUrl } = await request.json();
    if (!cardUrl || !cardUrl.startsWith("data:image/png;base64,")) {
      throw new Error("Invalid cardUrl format");
    }

    const base64Data = cardUrl.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient =
      blobServiceClient.getContainerClient(CONTAINER_NAME);

    const blobName = `${uuidv4()}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: "image/png" },
    });

    return new Response(JSON.stringify({ url: blockBlobClient.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error uploading blob", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
