import axios from "axios";
import { load } from "cheerio";

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

export type Test = {
  grade: number;
  monthList: number[];
  subjList: Subject[];
  beginYear: number;
  endYear: number;
  page?: number;
};

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

export const getTests = async ({
  grade,
  monthList,
  subjList,
  beginYear,
  endYear,
  page = 1,
}: Test) => {
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
    const imgSrc = $(rows).find("img").attr("src");
    const thisSubject = subjectUrlMap[imgSrc || ""];
    const testDate = $($(rows).find(".btn_L_col2")[1]).attr("onclick")?.split("'")[5].slice(0, 8);
    const dateJson: TestResponse["date"] = {
      year: Number(testDate?.slice(0, 4) || 0),
      month: Number(testDate?.slice(4, 6) || 0),
      day: Number(testDate?.slice(6, 8) || 0),
    };
    const textInfo =$(rows).find(".txt_info > li").map((_, info) => $(info).text().replace(/\s+/g, " ").trim().replace(/\D/g, "")).get();
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
