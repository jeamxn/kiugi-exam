import Link from "next/link";
import React from "react";

import { getTests, Subject } from "@/utils/getTests";

const Search = async ({
  searchParams
}: {
  searchParams: {
    grade: string;
    subjects: string;
    months: string;
    beginYear: string;
    endYear: string;
  }
}) => {
  const grade = Number(searchParams.grade);
  const subjList = JSON.parse(searchParams.subjects) as Subject[];
  const monthList = JSON.parse(searchParams.months) as number[];
  const beginYear = Number(searchParams.beginYear);
  const endYear = Number(searchParams.endYear);
  const find = await getTests({
    grade,
    monthList,
    subjList,
    beginYear,
    endYear,
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
      {
        find.length ? find.map((e, i) => (
          <React.Fragment key={i}>
            <div className="w-full border-b border-slate-250" />
            <div className="flex flex-col gap-2">
              <p
                className="text-lg font-medium text-slate-700"
              >{e.title}</p>
              <div
                className="flex flex-row gap-1 flex-wrap"
              >
                {
                  e.buttons.map((e1, i1) => (
                    <Link 
                      key={i1} 
                      href={e1.url} 
                      target="_blank"
                      className="border px-4 py-1.5 text-sm rounded-xl bg-slate-200 text-slate-950"
                    >
                      {e1.label}
                    </Link>
                  ))
                }
              </div>
            </div>
          </React.Fragment>
        )) : (
          <>
            <p className="text-lg font-medium text-slate-700">검색 결과가 없습니다.</p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 p-3 rounded-xl border border-slate-300 w-full max-w-96">
                <p className="text-slate-700 font-medium">선택된 검색 조건</p>
                <div className="flex flex-row items-center justify-start gap-1.5">
                  <p className="text-slate-500">학년</p>
                  <p className="text-slate-700">{grade}</p>
                </div>
                <div className="flex flex-row items-center justify-start gap-1.5">
                  <p className="text-slate-500">과목</p>
                  <p className="text-slate-700">{subjList.length ? subjList.join(", ") : "선택되지 않음"}</p>
                </div>
                <div className="flex flex-row items-center justify-start gap-1.5">
                  <p className="text-slate-500">시행월</p>
                  <p className="text-slate-700">{monthList.length ? monthList.join(", ") : "선택되지 않음"}</p>
                </div>
                <div className="flex flex-row items-center justify-start gap-1.5">
                  <p className="text-slate-500">학년도</p>
                  <p className="text-slate-700">{beginYear}년 ~ {endYear}년</p>
                </div>
              </div>
              <Link 
                href="/"
                className="border px-4 py-2 text-sm rounded-xl bg-slate-200 max-w-96 flex flex-row items-center justify-start gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="fill-slate-950" d="M6.63295 13.1572C4.92528 13.1572 3.47912 12.5649 2.29445 11.3804C1.10995 10.1958 0.5177 8.7496 0.5177 7.04193C0.5177 5.33426 1.10995 3.8881 2.29445 2.70343C3.47912 1.51893 4.92528 0.926682 6.63295 0.926682C8.34062 0.926682 9.78678 1.51893 10.9714 2.70343C12.1559 3.8881 12.7482 5.33426 12.7482 7.04193C12.7482 7.7561 12.6284 8.43818 12.3887 9.08818C12.1489 9.73818 11.8289 10.3035 11.4289 10.7842L17.1829 16.5382C17.3214 16.6765 17.3923 16.8505 17.3954 17.0602C17.3986 17.2698 17.3278 17.4471 17.1829 17.5919C17.0381 17.7368 16.8625 17.8092 16.656 17.8092C16.4496 17.8092 16.274 17.7368 16.1292 17.5919L10.3752 11.8379C9.8752 12.2508 9.3002 12.5738 8.6502 12.8072C8.0002 13.0405 7.32778 13.1572 6.63295 13.1572ZM6.63295 11.6574C7.92145 11.6574 9.01278 11.2103 9.90695 10.3159C10.8013 9.42176 11.2485 8.33043 11.2485 7.04193C11.2485 5.75343 10.8013 4.6621 9.90695 3.76793C9.01278 2.8736 7.92145 2.42643 6.63295 2.42643C5.34445 2.42643 4.25312 2.8736 3.35895 3.76793C2.46462 4.6621 2.01745 5.75343 2.01745 7.04193C2.01745 8.33043 2.46462 9.42176 3.35895 10.3159C4.25312 11.2103 5.34445 11.6574 6.63295 11.6574Z" />
                </svg>
                <p className="text-slate-950">다시 검색하기</p>
              </Link>
            </div>
          </>
        )
      }
      <div className="w-full border-b border-slate-250" />
      <div className="flex flex-col gap-1">
        <p className="text-sm text-slate-500">본 사이트는 수험생의 편의를 위한 바로가기 사이트입니다.</p>
        <p className="text-sm text-slate-500">재배포가 아닌 EBSi로 바로가는 링크를 제공합니다.</p>
      </div>
      <div className="pb-2.5" />
    </div>
  );
};

export default Search;