"use client";
import { SignInFunction, auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Cloud } from "@/components/ui/cloud";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          localStorage.setItem("uid", user.uid);
          toast({
            className: "bg-green-500 text-white font-mitr",
            title: "Login Success",
            description:
              "Your Login in Web Complete -> Continue to see more detail",
          });
          setLoginStatus(true);
        } else {
          setLoginStatus(false);
          if (!firstTime) {
            toast({
              className: "font-mitr",
              variant: "destructive",
              title: "Login Fail",
              description: "Please Try Again or Contact Support",
            });
          }
        }
        setFirstTime(false);
        setLoading(false);
      });
    };
    checkLogin();
  }, [auth]);

  return (
    <main className="flex min-h-[900px] h-screen flex-col sm:max-w-[360px] sm:mx-auto  bg-[#F1EDD9] overflow-hidden ">
      <div className="hidden sm:block fixed top-0 bottom-0 right-0 left-0 bg-black z-50 ">
        <h1 className="text-white w-full text-3xl font-mitr absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          กรุณาเข้าใช้งานผ่านมือถือเท่านั้นนะ!
          <br />
          <span className="text-2xl">
            For optimal experience, please use a mobile.
          </span>
        </h1>
      </div>
      <DecoSession />

      <LoginSection loginStatus={loginStatus} />
      <Toaster />
    </main>
  );
}

const LoginSection = ({ loginStatus }: { loginStatus: boolean }) => {
  return (
    <section className="relative font-mitr text-[#CBCBCB] mt-[15vh] text-center font-semibold w-[300px] mx-auto space-y-[3px]">
      <div className="w-full flex items-center justify-center h-auto overflow-visible">
        <Image
          src="/phase2/Merge_CP50.png"
          height={100}
          width={400}
          alt="merge cp text"
        />
      </div>

      <div className="relative w-[500px] h-[240px]">
        {loginStatus ? (
          <div>
            <Link href="/phase2/envalope">
              <Button
                variant="login"
                className="absolute  z-10 left-[95px] top-[275px]"
              >
                Continue
              </Button>
            </Link>
            <Button
              onClick={() => {
                signOut(auth);
              }}
              className="absolute  z-10 left-[135px] top-[360px] font-mitr font-semibold  bg-red-400 text-white drop-shadow-xl w-auto hover:bg-red-500 "
            >
              LOG OUT
            </Button>
          </div>
        ) : (
          <Button
            variant="login"
            className="absolute z-10 left-[95px] top-[275px]"
            onClick={SignInFunction}
          >
            LOG IN
          </Button>
        )}

        <Image
          src="/phase2/mailbox.svg"
          height={300}
          width={384}
          alt="merge cp text"
          className="absolute left-[20px] -top-[30px]"
        />
      </div>
    </section>
  );
};

const DecoSession = () => {
  return (
    <div className="relative w-full h-[140px]">
      <Cloud />

      <Image
        src="/phase2/star.svg"
        height={60}
        width={30}
        alt="merge cp text"
        className="absolute top-[100px] left-[5%] animate-[up-and-down_2.5s_infinite]"
      />
      <Image
        src="/phase2/star.svg"
        height={60}
        width={34}
        alt="merge cp text"
        className="absolute  top-[70px] left-[20%] animate-[up-and-down_3s_infinite]"
      />
      <Image
        src="/phase2/star.svg"
        height={60}
        width={30}
        alt="merge cp text"
        className="absolute  top-[40px] left-[45%] animate-[up-and-down_2s_infinite]"
      />

      <Image
        src="/phase2/star.svg"
        height={60}
        width={25}
        alt="merge cp text"
        className="absolute  top-[80px] left-[65%] animate-[up-and-down_2s_infinite]"
      />
      <Image
        src="/phase2/star.svg"
        height={60}
        width={34}
        alt="merge cp text"
        className="absolute top-[37px] left-[80%] animate-[up-and-down_2s_infinite]"
      />
    </div>
  );
};
