"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getChoseong } from "es-hangul";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { useRecoilValue } from "recoil";

import { Test, TestResponse } from "@/utils/getTests";
import { beginYearAtom, endYearAtom, gradeAtom, monthAtom, subjectAtom } from "@/utils/states";

const SearchPage = () => {
  const [isLast, setIsLast] = React.useState(false);
  const [find, setFind] = React.useState<TestResponse[]>([]);
  const [page, setPage] = React.useState(1);
  const [isBottom, setIsBottom] = React.useState(false);
  const bottomRef = React.useRef(null);
  const grade = useRecoilValue(gradeAtom);
  const subjList = useRecoilValue(subjectAtom);
  const monthList = useRecoilValue(monthAtom);
  const beginYear = useRecoilValue(beginYearAtom);
  const endYear = useRecoilValue(endYearAtom);
  const [search, setSearch] = React.useState("");

  const { isFetching, refetch } = useQuery({
    queryKey: ["get_data", grade, subjList, monthList, beginYear, endYear, page],
    queryFn: async () => {
      const searchData: Test = {
        grade,
        monthList,
        subjList,
        beginYear,
        endYear,
        page,
      };
      const { data } = await axios.post("/search/post", searchData);
      localStorage.setItem("find", JSON.stringify(searchData));
      if(!data.length) {
        setIsLast(true);
        return [];
      }
      setFind(p => [...p, ...data]);
      setPage(p => p + 1);
      return data as TestResponse[];
    },
    initialData: [],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if(!isBottom || isFetching || isLast) return;
    refetch();
  }, [isBottom]);

  return (
    <div className="w-full h-full flex flex-col gap-5 px-4 py-5">
      <Link href="/" className="flex flex-row items-center justify-start gap-2 w-fit p-4 -m-4" prefetch>
        <svg width="24" height="24" viewBox="0 0 208 211" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_147_2)">
            <path className="fill-slate-600 dark:fill-slate-400" d="M0.5 123.608C0.5 121.667 1.63286 119.892 3.40017 119.089C41.1459 101.937 63.6364 101.921 101.675 119.093C103.448 119.893 104.587 121.672 104.587 123.617V169.496C104.587 173.152 100.786 175.572 97.4281 174.126C63.4256 159.474 41.6032 159.467 7.66255 174.118C4.3043 175.567 0.5 173.147 0.5 169.489V123.608Z" />
            <path className="fill-slate-600 dark:fill-slate-400" d="M157.523 23.7148C159.206 24.7026 160.163 26.5911 159.949 28.5304C155.426 69.548 144.081 88.9242 110.333 113.122C108.743 114.262 106.62 114.35 104.932 113.36L66.1568 90.5943C63.0156 88.7501 62.8405 84.2688 65.7647 82.0968C95.3835 60.0965 106.415 41.3015 111.136 4.75645C111.603 1.14059 115.605 -0.895552 118.749 0.950352L157.523 23.7148Z" />
            <path className="fill-slate-600 dark:fill-slate-400" d="M165.461 209.435C163.758 210.389 161.643 210.26 160.077 209.094C126.992 184.455 116.019 164.865 112.212 123.499C112.032 121.552 113.028 119.677 114.735 118.721L153.966 96.7582C157.145 94.9781 161.103 97.0932 161.498 100.716C165.498 137.405 176.131 156.428 205.261 178.979C208.143 181.209 207.877 185.689 204.697 187.469L165.461 209.435Z" />
          </g>
          <defs>
            <clipPath id="clip0_147_2">
              <rect width="208" height="211" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <p className="text-slate-600 dark:text-slate-400 font-semibold text-2xl">모의고사 키우기</p>
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1 p-3 rounded-xl border border-slate-300 dark:border-slate-600 w-full max-w-96">
          <p className="text-slate-700 font-medium dark:text-slate-200">선택된 검색 조건</p>
          <table>
            <tbody>
              <tr>
                <td className="text-slate-500 w-16 pt-1">학년</td>
                <td className="text-slate-700 pt-1 dark:text-slate-200">{grade}학년</td>
              </tr>
              <tr>
                <td className="text-slate-500 w-16 pt-1">과목</td>
                <td className="text-slate-700 pt-1 dark:text-slate-200">{subjList.length ? subjList.join(", ") : "선택되지 않음"}</td>
              </tr>
              <tr>
                <td className="text-slate-500 w-16 pt-1">시행월</td>
                <td className="text-slate-700 pt-1 dark:text-slate-200">
                  {
                    monthList.length ? 
                      [...monthList]
                        .sort((a, b) => a - b)
                        .map(e => e + "월")
                        .join(", ") 
                      : "선택되지 않음"
                  }
                </td>
              </tr>
              <tr>
                <td className="text-slate-500 w-16 pt-1">학년도</td>
                <td className="text-slate-700 pt-1 dark:text-slate-200">{beginYear}년 ~ {endYear}년</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link 
          href="/"
          className="px-4 h-9 rounded-xl bg-slate-200 max-w-96 flex flex-row items-center justify-center gap-2 dark:bg-slate-600"
          prefetch
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-slate-950 dark:fill-slate-200" d="M3.10483 8.74476L8.27408 13.914C8.42274 14.0627 8.49616 14.2367 8.49433 14.436C8.49233 14.6353 8.41383 14.8126 8.25883 14.9678C8.10366 15.1126 7.92799 15.1876 7.73183 15.1928C7.53566 15.1979 7.35999 15.1229 7.20483 14.9678L0.864576 8.62751C0.770909 8.53384 0.704909 8.43509 0.666576 8.33126C0.628076 8.22743 0.608826 8.11526 0.608826 7.99476C0.608826 7.87426 0.628076 7.76209 0.666576 7.65826C0.704909 7.55443 0.770909 7.45568 0.864576 7.36201L7.20483 1.02176C7.34333 0.88326 7.51483 0.812427 7.71933 0.80926C7.92383 0.806093 8.10366 0.876927 8.25883 1.02176C8.41383 1.17693 8.49133 1.35509 8.49133 1.55626C8.49133 1.75759 8.41383 1.93584 8.25883 2.09101L3.10483 7.24476H14.4818C14.6947 7.24476 14.8728 7.31659 15.0163 7.46026C15.16 7.60376 15.2318 7.78193 15.2318 7.99476C15.2318 8.20759 15.16 8.38576 15.0163 8.52926C14.8728 8.67293 14.6947 8.74476 14.4818 8.74476H3.10483Z" />
          </svg>
          <p className="text-slate-950 text-sm dark:text-slate-200">다시 검색하기</p>
        </Link>
      </div>
      <div className="flex flex-col gap-0 p-3 pb-2 rounded-xl border border-slate-300 dark:border-slate-600 w-full max-w-96">
        <p className="text-slate-700 dark:text-slate-500 font-medium">검색 결과 중 검색하기</p>
        <input 
          type="text"
          placeholder="검색어를 입력하세요."
          className="w-full py-2 border-slate-250 focus:outline-none bg-transparent text-slate-950 dark:text-slate-200"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {
        find.length ? find
          .filter(e => 
            getChoseong(e.title.replace(/\s/g, ""))
              .includes(getChoseong(search.replace(/\s/g, "")))
          )
          .map((e, i) => {
            const type = grade !== 3 ? "ooe" : 
              e.date.month === 6 || e.date.month === 9 || e.date.month === 11 ? "kice" : "ooe";
            return (
              <React.Fragment key={i}>
                <div className="w-full border-b border-slate-250 dark:border-slate-600" />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0">
                    <p
                      className="text-lg font-medium text-slate-700 dark:text-slate-200"
                    >{e.title}</p>
                    <p className="text-sm text-slate-400">{e.date.year}.{e.date.month}.{e.date.day} 시행 | {e.questions}문항 | {e.subject}</p>
                  </div>
                  <div
                    className="flex flex-row gap-1 flex-wrap"
                  >
                    {
                      e.buttons.map((e1, i1) => (
                        <Link 
                          key={i1} 
                          href={e1.url} 
                          target="_blank"
                          className="px-4 py-1.5 text-sm rounded-xl bg-slate-200 text-slate-950 dark:bg-slate-600 dark:text-slate-200"
                          prefetch
                        >
                          {e1.label}
                        </Link>
                      ))
                    }
                    {/* {
                    type === "ooe" && !e.subject.includes("탐구") && e.subject !== "제2외국어" ? (
                      <Link 
                        href={`/grade?type=${type}&grade=${grade}&subject=${e.subject}`}
                        target="_blank"
                        className="px-4 py-1.5 text-sm rounded-xl bg-slate-200 text-slate-950"
                        prefetch
                      >
                        등급
                      </Link>
                    ) : null
                  } */}
                  </div>
                </div>
              </React.Fragment>
            );
          }) : isFetching ? null : (
          <>
            <div className="w-full border-b border-slate-250 dark:border-slate-600" />
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium text-slate-700 dark:text-slate-500">검색 결과가 없습니다.</p>
            </div>
          </>
        )
      }
      {
        isFetching ? Array(5).fill(0).map((e, i) => (
          <React.Fragment key={i}>
            <div className="w-full border-b border-slate-250 dark:border-slate-600" />
            <div className="flex flex-col gap-2">
              <div className="loader-light bg-gradient-to-br from-slate-300 via-white to-slate-300 dark:from-slate-700 dark:via-black dark:to-slate-700 h-7 w-full max-w-80 rounded-xl" />
              <div className="h-9 w-full max-w-72 loader-light bg-gradient-to-br from-slate-300 via-white to-slate-300 dark:from-slate-700 dark:via-black dark:to-slate-700 rounded-xl" />
            </div>
          </React.Fragment>
        )) : null
      }
      <div className="w-full border-b border-slate-250 dark:border-slate-600" />
      <div className="flex flex-col gap-1">
        <p className="text-sm text-slate-500">본 사이트는 수험생의 편의를 위한 바로가기 사이트입니다.</p>
        <p className="text-sm text-slate-500">재배포가 아닌 EBSi로 바로가는 링크를 제공합니다.</p>
      </div>
      <div className="pb-2.5" ref={bottomRef} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(SearchPage), {
  ssr: false,
});