import { useEffect, useState } from "react";
import { api } from "../utils/api";

function Messages() {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await api.getMessages();

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil messages");
      }

      setMessages(data);
    } catch (error) {
      console.error("Error messages:", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="messages-page">
      <div className="page-header">
        <div>
          <p className="page-subtitle">CONTACT MESSAGES</p>

          <h1>Messages</h1>

          <p>Pesan yang dikirim melalui contact form.</p>
        </div>
      </div>

      <div className="message-list">
        {messages.length === 0 ? (
          <p>Belum ada pesan.</p>
        ) : (
          messages.map((item) => (
            <div className="message-card" key={item.id}>
              <div>
                <h3>{item.name}</h3>

                <p className="message-email">{item.email}</p>

                <p className="message-content">{item.message}</p>
              </div>

              <small>{new Date(item.created_at).toLocaleString("id-ID")}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Messages;
