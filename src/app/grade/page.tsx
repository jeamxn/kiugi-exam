"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React from "react";

const OOEgradePage = ({
  searchParams,
}: {
  searchParams: {
    type: string;
    grade: string;
    subject: string;
    subSubject: string;
  }
}) => {
  const { type, grade, subject, subSubject } = searchParams;

  const { isFetching, data, isError } = useQuery({
    queryKey: ["get_grade", type, grade, subject, subSubject],
    queryFn: async () => {
      const { data } = await axios.post("/grade/post", { 
        type,
        grade,
        subject,
        subSubject 
      });
      return data.html as string;
    },
    initialData: "",
  });

  return (
    <div className="w-full h-full flex flex-col gap-5 px-4 py-5">
      <Link href="/" className="flex flex-row items-center justify-start gap-2 w-fit p-4 -m-4" prefetch>
        <svg width="24" height="24" viewBox="0 0 208 211" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_147_2)">
            <path className="fill-slate-600" d="M0.5 123.608C0.5 121.667 1.63286 119.892 3.40017 119.089C41.1459 101.937 63.6364 101.921 101.675 119.093C103.448 119.893 104.587 121.672 104.587 123.617V169.496C104.587 173.152 100.786 175.572 97.4281 174.126C63.4256 159.474 41.6032 159.467 7.66255 174.118C4.3043 175.567 0.5 173.147 0.5 169.489V123.608Z" />
            <path className="fill-slate-600" d="M157.523 23.7148C159.206 24.7026 160.163 26.5911 159.949 28.5304C155.426 69.548 144.081 88.9242 110.333 113.122C108.743 114.262 106.62 114.35 104.932 113.36L66.1568 90.5943C63.0156 88.7501 62.8405 84.2688 65.7647 82.0968C95.3835 60.0965 106.415 41.3015 111.136 4.75645C111.603 1.14059 115.605 -0.895552 118.749 0.950352L157.523 23.7148Z" />
            <path className="fill-slate-600" d="M165.461 209.435C163.758 210.389 161.643 210.26 160.077 209.094C126.992 184.455 116.019 164.865 112.212 123.499C112.032 121.552 113.028 119.677 114.735 118.721L153.966 96.7582C157.145 94.9781 161.103 97.0932 161.498 100.716C165.498 137.405 176.131 156.428 205.261 178.979C208.143 181.209 207.877 185.689 204.697 187.469L165.461 209.435Z" />
          </g>
          <defs>
            <clipPath id="clip0_147_2">
              <rect width="208" height="211" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <p className="text-slate-600 font-semibold text-2xl">모의고사 키우기</p>
      </Link>
      <div className="flex flex-col gap-1 p-3 rounded-xl border border-slate-300 w-full max-w-96">
        <p className="text-slate-700 font-medium">모의고사 등급컷</p>
        <table>
          <tbody>
            <tr>
              <td className="text-slate-500 pt-1 w-16">주관</td>
              <td className="text-slate-700 pt-1">{
                type === "ooe" ? "교육청" : 
                  type === "kice" ? "한국교육과정평가원" : "알 수 없음"
              }</td>
            </tr>
            <tr>
              <td className="text-slate-500 pt-1 w-16">학년</td>
              <td className="text-slate-700 pt-1">{grade}학년</td>
            </tr>
            <tr>
              <td className="text-slate-500 pt-1 w-16">과목</td>
              <td className="text-slate-700 pt-1">{subject}</td>
            </tr>
            {
              subSubject ? (
                <tr>
                  <td className="text-slate-500 pt-1 w-16">부과목</td>
                  <td className="text-slate-700 pt-1">{subSubject}</td>
                </tr>
              ) : null
            }
          </tbody>
        </table>
      </div>
      {
        isFetching ? (
          <p className="text-slate-400">등급 컷을 불러오는 중...</p>
        ) : isError ? (
          <p className="text-slate-400">등급 컷을 불러오는 중 오류가 발생했습니다.</p>
        ) : (
          <table
            className="w-full flex flex-col gap-4"
            dangerouslySetInnerHTML={{
              __html: data,
            }} 
          />
        )
      }
      <div className="pb-5" />
    </div>
  );
};

export default OOEgradePage;