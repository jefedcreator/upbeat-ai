import Image from "next/image";

const page = () => {
  return (
    <section className="h-[90%] flex justify-between items-start text-white">
      <div className="w-1/2">
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
        className="w-1/2 h-full object-contain"
      />
    </section>
  );
};

export default page;
