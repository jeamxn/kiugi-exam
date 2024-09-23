// getTests.ts - EBS 시험지 다운로드 링크를 가져오는 함수

import axios from "axios";
import { load } from "cheerio";

/**
 * EBSi의 과목 매핑
 * @property {Subject} key 과목명
 * @property {number} value 과목 코드
 * @example
 * const subject = subjectMap["국어"]; // 1
 */
export const subjectMap = {
  "국어": 1,
  "수학": 2,
  "영어": 3,
  "한국사": 4,
  "사회탐구": 5,
  "과학탐구": 6,
  "직업탐구": 7,
  "제2외국어": 8,
};
export type Subject = keyof typeof subjectMap;

/**
 * EBSi의 과목 이미지 URL 매핑
 * @property {string} key 이미지 URL
 * @property {Subject} value 과목명
 */
export const subjectUrlMap: {
  [key: string]: Subject;
} = {
  "/ebs/public_hsp/images/temp/thumb_book_korean.png": "국어",
  "/ebs/public_hsp/images/temp/thumb_book_math.png": "수학",
  "/ebs/public_hsp/images/temp/thumb_book_english.png": "영어",
  "/ebs/public_hsp/images/temp/thumb_book_history.png": "한국사",
  "/ebs/public_hsp/images/temp/thumb_book_social.png": "사회탐구",
  "/ebs/public_hsp/images/temp/thumb_book_science.png": "과학탐구",
  "/ebs/public_hsp/images/temp/thumb_book_job.png": "직업탐구",
  "/ebs/public_hsp/images/temp/thumb_book_langeage.png": "제2외국어",
};

/**
 * 시험지 검색 조건
 * @property {number} grade 학년
 * @property {number[]} monthList 검색할 시험지 월
 * @property {Subject[]} subjList 검색할 과목 리스트
 * @property {number} beginYear 검색할 시작 년도
 * @property {number} endYear 검색할 끝 년도
 * @property {number} [page] 페이지(EBSi 검색 결과, 기본값: 1)
 */
export type Test = {
  grade: number;
  monthList: number[];
  subjList: Subject[];
  beginYear: number;
  endYear: number;
  page?: number;
};

/**
 * 시험지 정보
 * @property {string} title 시험지 제목
 * @property {Subject} subject 시험지 과목
 * @property {number} questions 시험지 문항 수
 * @property {Array<{label: string, url: string}>} buttons PDF 다운로드 버튼 리스트
 * @property {{year: number, month: number, day: number}} date 시험 시행일
 */
export type TestResponse = {
  title: string;
  subject: Subject;
  questions: number;
  buttons: {
    label: string;
    url: string;
  }[];
  date: {
    year: number;
    month: number;
    day: number;
  };
};

/**
 * EBSi 시험지 다운로드 링크를 가져오는 함수
 * @param {Test} test 시험지 검색 조건
 * @param {number} test.grade 학년
 * @param {number[]} test.monthList 검색할 시험지 월
 * @param {Subject[]} test.subjList 검색할 과목 리스트
 * @param {number} test.beginYear 검색할 시작 년도
 * @param {number} test.endYear 검색할 끝 년도
 * @param {number} [test.page] 페이지(EBSi 검색 결과, 기본값: 1)
 * @returns {Promise<TestResponse[]>} 시험지 정보 리스트
 * @example
 */
export const getTests = async ({
  grade,
  monthList,
  subjList,
  beginYear,
  endYear,
  page = 1,
}: Test) => {
  // EBSi 기출문제 페이지를 POST로 요청
  const response = await axios.post(
    "https://www.ebsi.co.kr/ebs/xip/xipc/previousPaperListAjax.ajax",
    new URLSearchParams([
      ["targetCd", `D${grade}00`],
      ["monthList", monthList.map(p => String(p).padStart(2, "0")).join(",")],
      ["subjList", subjList.map(p => String(subjectMap[p])).join(",")],
      ["sort", "recent"],
      ["beginYear", String(beginYear)],
      ["endYear", String(endYear)],
      ["pageSize", "100"],
      ["currentPage", String(page)],
    ])
  );
  const $ = load(response.data);
  const rowsLength = $("#pagingForm > div.board_qusesion > ul > li").length;
  const json: TestResponse[] = [];
  for(let i = 1; i <= rowsLength; i++) {
    const rows = $(`#pagingForm > div.board_qusesion > ul > li:nth-child(${i})`)[0];
    
    // 이미지 URL을 통해 과목을 매핑
    const imgSrc = $(rows).find("img").attr("src");
    const thisSubject = subjectUrlMap[imgSrc || ""];

    // 시험 일자를 JSON으로 변환
    const testDate = $($(rows).find(".btn_L_col2")[1]).attr("onclick")?.split("'")[5].slice(0, 8);
    const dateJson: TestResponse["date"] = {
      year: Number(testDate?.slice(0, 4) || 0),
      month: Number(testDate?.slice(4, 6) || 0),
      day: Number(testDate?.slice(6, 8) || 0),
    };

    // 시험지 제목
    const textInfo =$(rows).find(".txt_info > li").map((_, info) => $(info).text().replace(/\s+/g, " ").trim().replace(/\D/g, "")).get();

    // 시험지 정보를 JSON으로 변환
    const buttons = $(rows).find(".btn_L_col2").map((_, button) => {
      const label = $(button).text().replace(/\s+/g, " ").trim();
      const link = $(button).attr("onclick")?.split("'")[1];
      return {
        label,
        url: link?.includes("://") ? link : `https://wdown.ebsi.co.kr/W61001/01exam${link}`,
      };
    }).get();
    json.push({
      title: $(rows).find(".tit").text().replace(/\s+/g, " ").trim(),
      subject: thisSubject,
      questions: Number(textInfo[0]),
      buttons,
      date: dateJson,
    });
  }
  return json;
};
