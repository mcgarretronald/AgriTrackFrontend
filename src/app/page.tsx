"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen animate-pulse ">
      <div className="w-3/4 md:w-1/2 lg:w-1/3">
        <Image 
          src="/longlogo.svg" 
          alt="Logo" 
          width={500} 
          height={500} 
          className="w-full h-auto" // Makes the image responsive
        />
      </div>
    </div>
  );
}
