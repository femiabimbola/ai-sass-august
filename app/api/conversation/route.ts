import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import OpenAI from "openai";

import {increaseApiLimit, checkApiLimit} from "@/lib/api-limit";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// });

// const openai = new OpenAIApi(configuration)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const {userId} = auth();
    const body = await req.json();
    const {messages} = body;

    if (!userId) return new NextResponse("Unathorized", {status: 401});

    // if (!configuration.apiKey) return new NextResponse("OpenAI API key not configured", { status: 500 })

    if (!messages)
      return new NextResponse("Messages are required", {status: 400});

    const freeTrial = await checkApiLimit();

    if (!freeTrial)
      return new NextResponse("No more free trial", {status: 403});

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    // const completion: OpenAI.Chat.ChatCompletion =
    //   await openai.chat.completions.create(messages);

    await increaseApiLimit();
    // return NextResponse.json(response.data.choices[0].message);
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log("there is error");
    console.log("[conversation-error]", error);
    return new NextResponse("internal error", {status: 500});
  }
}
