"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import data from "./new_buddy.json";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getStudentId = async () => {
      setLoading(true);
      const temp_uid = localStorage.getItem("uid");
      if (temp_uid) {
        const docRef = doc(db, "user-profiles", temp_uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudentId(docSnap.data().studentId);
        } else {
          console.log("Data not found!");
        }
      } else {
        router.push("/phase2/login");
      }
      setLoading(false);
    };
    getStudentId();
  }, []);

  return (
    <main className="flex min-h-[932px] max-h-fit items-center flex-col sm:max-w-[360px] sm:mx-auto relative bg-[#F1EDD9] overflow-hidden ">
      <div className="hidden sm:block fixed top-0 bottom-0 right-0 left-0 bg-black z-50 ">
        <div className="text-white w-full text-3xl font-mitr absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="w-full flex items-center justify-center h-auto overflow-visible mb-4 ">
            <Image
              src="/phase2/Merge_CP50.png"
              height={100}
              width={400}
              alt="merge cp text"
            />
          </div>
          <h1>
            กรุณาเข้าใช้งานผ่านมือถือเท่านั้นนะ!
            <br />
            <span className="text-2xl">
              For optimal experience, please use a mobile.
            </span>
          </h1>
        </div>
      </div>
      <p className="text-gray-400 font-semibold text-center mt-5 ">
        Merge CP50 | Buddy & Budder
      </p>

      {loading ? (
        <h1 className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full flex justify-center items-center font-mitr text-[32px] text-[#DC6B19] ">
          Loading...
        </h1>
      ) : (
        <>
          {open ? (
            <>
              <Image
                src="/phase4/yourbuddy.png"
                height={74}
                width={314}
                quality={100}
                alt="your buddy text"
                className="mt-16 fade-in"
              />
              {[0].map(() => {
                const studentData = data.filter((item, index) => {
                  return item.student_id + "" === studentId;
                })[0];
                let budderData, buddyData;
                if (studentData) {
                  budderData = data[studentData.budder_index - 1];
                  buddyData = data[studentData.buddy_index - 1];
                }
                return !studentData ? (
                  <div>
                    Your data not found <br /> Please contact support
                  </div>
                ) : (
                  <div className="ml-4 w-[298px] h-[518px] bg-[url('/phase4/buddydetails.svg')]  bg-contain bg-no-repeat bg-top fade-in">
                    <p className="font-mitr font-normal text-2xl text-black text-center mt-[6.5rem] mr-4">
                      {budderData?.nickname} !
                    </p>
                    <p className="font-mitr font-semibold text-[15px] text-black text-center mt-[17rem] mr-4">
                      IG : {budderData?.instagram_facebook}
                      <br />
                      Line Id : {budderData?.line_id}
                    </p>
                  </div>
                );
              })}
              <p className="text-center mt-20 font-mitr text-xl text-gray-400 fade-in px-4">
                Feedback Form for Merge CP50 <br /> {"--> "}
                <a
                  className="text-blue-500 hover:text-blue-700"
                  href="https://forms.gle/1MM5WRuCu61CBJRf8"
                >
                  Feedback Form
                </a>{" "}
                {"<--"}
                <br />{" "}
                <span className="text-sm">
                  ขอเวลาสักนิดกรอก Feedback <br />
                  เพื่อพัฒนากิจกรรมต่อไปให้ดีขึ้น 🫠
                </span>
              </p>
            </>
          ) : (
            <div
              onClick={(e) => {
                setOpen(true);
              }}
            >
              <Image
                src="/phase4/mail.svg"
                height={300}
                width={384}
                alt="mailbox"
                className="bottom-0 right-0 absolute "
              />
              <Image
                src="/phase4/textbubble.svg"
                height={178}
                width={221}
                alt="textbubble"
                className="bottom-[325px] left-0 absolute animate-rotate-left-right"
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}
