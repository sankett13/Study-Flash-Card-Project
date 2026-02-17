import Link from "next/link";
import React from "react";

export default function Button({
  btnName,
  location,
}: {
  btnName: string;
  location: string;
}) {
  return (
    <Link href={location}>
      <button className="ml-4 rounded-full bg-gradient-to-b from-blue-700 to-blue-400 text-white px-4 py-2 font-medium">
        {btnName}
      </button>
    </Link>
  );
}
