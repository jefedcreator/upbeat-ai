import Image from "next/image";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Link from "next/link";

const page = () => {
  return (
    <section className="h-[80%] flex md:flex-row flex-col-reverse md:justify-between justify-end gap-3 items-start text-white">
      <div className="flex flex-col gap-3 md:w-1/2 w-full md:h-[50%]">
        <h1 className="text-4xl font-extrabold">Upbeat AI </h1>
        <p>
          Unleash personalized playlists based on your mood. Experience the
          fusion of ChatGPT and Spotify
        </p>
        <Link
          className="flex cursor-pointer items-center justify-center gap-1 text-white bg-[#1DB954] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[40%] px-5 py-2.5 text-center md:mt-auto mt-0"
          href="/chat"
        >
          Open
          <BsBoxArrowUpRight />
        </Link>
      </div>
      <Image
        src={
          "https://res.cloudinary.com/hemi/image/upload/v1690849269/ben-blennerhassett-LR5eS1C9IUU-unsplash_yoarqv.png"
        }
        height={1000}
        width={1000}
        alt="Banner Image"
        className="md:w-1/2 w-full md:h-[80%] h-1/2 object-cover"
      />
    </section>
  );
};

export default page;
