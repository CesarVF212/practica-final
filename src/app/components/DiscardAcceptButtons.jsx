import Link from "next/link";

function convertLink(link) {
  return link || "./";
}

export default function DiscardAcceptButtons({ discard_link, accept_link }) {
  return (
    <div className="flex flex-row justify-between">
      <Link href={convertLink(discard_link)}>
        <button
          type="button"
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Discard
        </button>
      </Link>
      <Link href={convertLink(accept_link)}>
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </Link>
    </div>
  );
}
