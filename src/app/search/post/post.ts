import { NextRequest, NextResponse } from "next/server";

import { getTests, Test } from "@/utils/getTests";

const POST = async (
  req: NextRequest,
) => {
  try {
    const {
      grade,
      monthList,
      subjList,
      beginYear,
      endYear,
    }: Test = await req.json();
    const find = await getTests({
      grade,
      monthList,
      subjList,
      beginYear,
      endYear,
    });
    const response = NextResponse.json(find);
    return response;
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