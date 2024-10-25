"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findHackerById } from "@/app/db/controllers";
import { hackerFormData } from "@/app/db/controllers";

interface Hacker extends hackerFormData {
  checked_in: boolean;
}

const HackerProfileAdminView = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [user, setUser] = useState<Hacker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the hacker data from the database
  const fetchHacker = async () => {
    try {
      const hacker = await findHackerById(params.id);
      setUser(hacker);
    } catch (err) {
      setError("Hacker not found or error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the hacker data when the component mounts
  useEffect(() => {
    fetchHacker();
  }, [params.id]);

  // While loading, show a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there was an error, show the error message
  if (error) {
    return <p>{error}</p>;
  }

  // If no user was found, display a message
  if (!user) {
    return <p>Hacker not found</p>;
  }

  // Handle button click to go back
  const handleGoBack = () => {
    router.back();
  };

  // Handle check-in request
  const handleCheckIn = async () => {
    try {
      const response = await fetch(`/api/checkin/${params.id}`, {
        method: "POST",
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // Optional success message
        await fetchHacker(); // Re-fetch the hacker data after checking in
      } else {
        alert(result.message || "Failed to check in");
      }
    } catch (error) {
      console.error("Error checking in:", error);
      alert("An error occurred while checking in");
    }
  };

  // Once the user data is loaded, display the profile
  return (
    <div className="w-screen flex flex-col mt-32 items-center text-lg gap-4">
      <div>
        <p>
          <span className="underline text-gray-200 text-sm uppercase">
            Name:
          </span>{" "}
          {user.firstName + " " + user.lastName}
        </p>
        <p>
          <span className="underline text-gray-200 text-sm uppercase">
            Email:
          </span>{" "}
          {user.email}
        </p>
        <p>
          <span className="underline text-gray-200 text-sm uppercase">
            Phone Number:
          </span>{" "}
          {user.phoneNumber}
        </p>
        <p>
          <span className="underline text-gray-200 text-sm uppercase">
            Dietary Restriction:
          </span>{" "}
          {user.diet}
        </p>
        <p>
          <span className="underline text-gray-200 text-sm uppercase">
            Status:
          </span>{" "}
          {user.checked_in ? ` Checked In` : ""}
        </p>
      </div>

      <div className="flex flex-col w-48 mt-5">
        {user.checked_in ? (
          <div className="btn bg-zinc-800 mt-10 disabled:btn">Check In</div>
        ) : (
          <button
            type="button"
            onClick={handleCheckIn}
            className="btn bg-green-800 mt-10"
          >
            Check In
          </button>
        )}

        <button
          type="button"
          onClick={handleGoBack}
          className="btn bg-red-800 mt-5"
        >
          New Scan
        </button>
      </div>
    </div>
  );
};

export default HackerProfileAdminView;
