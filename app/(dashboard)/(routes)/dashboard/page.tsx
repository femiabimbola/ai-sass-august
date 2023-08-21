"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import { MessageSquare } from "lucide-react";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
    href: '/conversation'
  }
]

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text=2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat with the Tush AI - Explore what Tush AI offers
        </p>
      </div>
      <div className="px-4 md:px-29 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card key={tool.href} className="tool-card">

          </Card>
        )
        )}
      </div>
    </div>
  )
}

export default Dashboard;
