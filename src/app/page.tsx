import Image from "next/image";

const page = () => {
  return (
    <section className="h-[80%] flex md:flex-row flex-col-reverse md:justify-between justify-end gap-3 items-start text-white">
      <div className="md:w-1/2 w-full">
        <h1 className="text-4xl font-extrabold">Upbeat AI </h1>
        <p>
          Unleash personalized playlists based on your mood. Experience the
          fusion of ChatGPT and Spotify
        </p>
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
