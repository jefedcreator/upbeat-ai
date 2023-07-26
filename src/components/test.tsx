"use client";
// import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const Test = () => {
  const { data: session, status } = useSession() as any;

  //   const session = await getServerSession();


  const getData = async () => {
    try {
      const response: any = await Promise.race([
        fetch(
          `https://api.spotify.com/v1/search?q=artist:Seyi%20Vibez&type=track`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Network Timeout")), 10000)
        ),
      ]);
      const res = await response.json();
      console.log("response", res);

      //   if (res.statusCode === 200) {
      //     // const { result, count } = res;
      //     // return {
      //     //   extrasResult: result,
      //     //   extrasCount: count,
      //     // };
      //   } else {
      //     console.log(res.message);
      //   }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-blue-500 cursor-pointer" onClick={getData}>
      Test
    </div>
  );
};

export default Test;
