import { NextResponse } from "next/server";
import { checkInHackerById } from "@/app/db/controllers";

// Export POST method as a named export
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { message: "Invalid or missing hacker ID" },
      { status: 400 }
    );
  }

  try {
    // Call the controller to check in the hacker
    await checkInHackerById(id);

    // If successful, return a success response
    return NextResponse.json(
      { message: "Hacker checked in successfully", checkedIn: true },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.error(err);
    // Return an error response if something goes wrong
    return NextResponse.json(
      { message: err.message, checkedIn: false },
      { status: 500 }
    );
  }
}
