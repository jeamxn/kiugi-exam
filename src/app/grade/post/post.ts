import { NextRequest, NextResponse } from "next/server";

import { getOOEgrade } from "@/utils/getOOEgrade";
import { Subject } from "@/utils/getTests";

const POST = async (
  req: NextRequest,
) => {
  try {
    const {
      type,
      grade, 
      subject, 
      subSubject,
    }: {
      type: string;
      grade: string;
      subject: string;
      subSubject: string;
    } = await req.json();

    if(type === "ooe") {
      const html = await getOOEgrade(Number(grade), subject as Subject, subSubject);
      const response = NextResponse.json({
        html,
      });
      return response;
    }
    else {
      const response = NextResponse.json({
        success: false,
        error: {
          title: "이런!!",
          description: "잘못된 요청입니다.",
        }
      }, {
        status: 400,
      });
      return response;
    }
  }
  catch (e: any) {
    const response = NextResponse.json({
      success: false,
      error: {
        title: "이런!!",
        description: e.message,
      }
    }, {
      status: 400,
    });
    console.error(e.message);
    return response;
  }
};

export default POST;