// import { unstable_noStore } from "next/cache";
import { connection } from "next/server";

import Messages from "@/components/Messages";

import { getMessages } from "@/lib/messages";

// export const revalidate = 5;
// export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  await connection();
  // unstable_noStore(); // : for older next
  // const response = await fetch("http://localhost:8080/messages", {
  //   headers: {
  //     "X-ID": "page",
  //   },
  // });
  // const response = await fetch("http://localhost:8080/messages", {
  //   // cache: "no-store",
  //   // next: {
  //   //   revalidate: 5,
  //   // },
  //   next: {
  //     tags: ["msg"],
  //   },
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
