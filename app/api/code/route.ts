import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import OpenAI from "openai";
import {increaseApiLimit, checkApiLimit} from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// const instructionMessage: OpenAI.Chat.ChatCompletionCreateParams = {
//   role: "system",
//   content:
//     "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation",
// };

const instructionMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation",
};

export async function POST(req: Request) {
  try {
    const {userId} = auth();
    const body = await req.json();
    const {messages} = body;

    if (!userId) return new NextResponse("Unathorized", {status: 401});

    if (!openai.apiKey)
      return new NextResponse("OpenAI API key not configured", {status: 500});

    if (!messages)
      return new NextResponse("Messages are required", {status: 400});

    const freeTrial = await checkApiLimit();

    if (!freeTrial)
      return new NextResponse("No more free trial", {status: 403});

    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [instructionMessage, ...messages],
    // });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      // messages: [instructionMessage, ...messages],
      messages: [instructionMessage, ...messages],
    });

    await increaseApiLimit();

    // return NextResponse.json(response.data.choices[0].message);
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[GODE_ERROR]", error);
    return new NextResponse("internal error", {status: 500});
  }
}
