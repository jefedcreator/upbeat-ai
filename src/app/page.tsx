import React from "react";
import Interaction from "@/components/interaction";
import { Upbeat } from "@/utils/hooks/useChat";
import { SignInButton } from "@/components/buttons";
import Header from "@/components/Header";
import Image from "next/image";

const page = () => {
  return (
    <main className="h-full">
      <Header />
      <section className="flex justify-between items-start text-white">
        <div className="w-1/2">
          <h1 className="text-4xl font-extrabold">Upbeat AI </h1>
          <p>
            Unleash personalized playlists based on your mood. Experience the
            fusion of ChatGPT and Spotify
          </p>
        </div>
        {/* <Image
          src={
            "https://res.cloudinary.com/hemi/image/upload/v1690849269/ben-blennerhassett-LR5eS1C9IUU-unsplash_yoarqv.png"
          }
          height={1000}
          width={1000}
          alt="Banner Image"
          className="w-1/2 h-full object-contain"
        /> */}
      </section>
      {/* <Upbeat>
        <Interaction />
      </Upbeat> */}
    </main>
  );
};

export default page;
