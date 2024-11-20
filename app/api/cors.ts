import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Initialize the CORS middleware
const cors = Cors({
  methods: ["POST", "PATCH", "GET", "DELETE", "HEAD"],
});

// Define a specific type for middleware functions
type MiddlewareFn = (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (err?: Error | null, result?: void) => void
) => void;

// Helper method to wait for middleware to execute
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFn
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Run the middleware
    await runMiddleware(req, res, cors);

    // Rest of the API logic
    res.json({ message: "Hello Everyone!" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
