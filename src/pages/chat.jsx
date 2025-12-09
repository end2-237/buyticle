import React from "react";
import Navigation from "../nav";
import {
  Chat as StreamChat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = "2wxhdtxcnb2p"; // ta clé publique Stream
const userId = "user-id"; // identifiant unique de l’utilisateur
const token = "authentication-token"; // token généré côté serveur Stream

// Filtres : on montre uniquement les channels où l'utilisateur est membre
const filters = { members: { $in: [userId] }, type: "messaging" };
const options = { presence: true, state: true };
const sort = { last_message_at: -1 };

export default function ChatApp() {
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: {
      id: userId,
      name: "Mon utilisateur", // optionnel
      image: "https://getstream.io/random_png/?id=user-id&name=User", // optionnel
    },
  });

  if (!client) return <div>Chargement du chat...</div>;

  return (
    <div>
      <Navigation />
      <main className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-full h-[90vh] max-w-5xl border rounded-xl shadow-lg overflow-hidden flex">
          <StreamChat client={client}>
            <ChannelList
              sort={sort}
              filters={filters}
              options={options}
              showChannelSearch
            />
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </StreamChat>
        </div>
      </main>
    </div>
  );
}
