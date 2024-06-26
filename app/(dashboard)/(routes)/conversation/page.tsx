"use client";

import * as z from "zod";
import axios from "axios";
// import {ChatCompletionRequestMessage} from "openai"; //Typescript error
import OpenAI from "openai";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {MessageSquare} from "lucide-react";
import {useForm} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
// Local Import
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {formSchema} from "./constants";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Heading from "@/components/Heading";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/Loader";
import {cn} from "@/lib/utils";
import {UserAvatar} from "@/components/user-avatar";
import {BotAvatar} from "@/components/bot-avatar";
import {useProModal} from "@/hooks/use-pro-modal";

// Zod is for frontend form validation

interface messageProp {
  role: string;
  content: string;
}

const Conversation = () => {
  const router = useRouter();
  const proModal = useProModal();
  // const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [messages, setMessages] = useState<messageProp[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  // The form has its own state
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const userMessage: ChatCompletionRequestMessage = {
      //   role: "user",
      //   content: values.prompt,
      // };
      const userMessage: OpenAI.Chat.ChatCompletionCreateParams = {
        messages: [{role: "user", content: values.prompt}],
        model: "gpt-3.5-turbo",
      };
      const newMessages = [...messages, userMessage.messages[0]];
      // const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      // The reason for an error 403 // It might happen
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="The conversation with Tush AI"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="form-style"
          >
            <FormField
              name="prompt"
              render={({field}) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="form-input-conversation"
                      disabled={isLoading}
                      placeholder="How do I get better at things"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <div>
            <Empty label=" No conversation started" />
          </div>
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div
              key={message.content}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
