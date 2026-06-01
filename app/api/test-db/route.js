import { connectToMongoDb } from "@/src/config/connectToMongoDb";

export async function GET() {
  await connectToMongoDb();

  return Response.json({
    success: true,
  });
}