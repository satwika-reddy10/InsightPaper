import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { UploadCloud, Send, Plus, FileText, X } from "lucide-react";
import "./Mainpage.css";

function Mainpage() {
  const [chats, setChats] = useState([{ id: 1, history: [] }]);
  const [currentChat, setCurrentChat] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const inputRef = useRef(null);

  const getCurrentChat = () => chats.find((chat) => chat.id === currentChat);

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleQuerySubmit = () => {
    if (query.trim() !== "" || selectedFile) {
      updateHistory({
        type: "query-doc",
        query: query.trim(),
        file: selectedFile,
      });
      setQuery("");
      setSelectedFile(null);
    }
  };

  const updateHistory = (entry) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChat
          ? { ...chat, history: [...chat.history, entry] }
          : chat
      )
    );
  };

  const handleNewChat = () => {
    const newChatId = chats.length + 1;
    setChats([...chats, { id: newChatId, history: [] }]);
    setCurrentChat(newChatId);
  };

  const openDocument = (file) => {
    const fileType = file.name.split(".").pop().toLowerCase();
    if (fileType === "txt") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedDoc({ name: file.name, content: e.target.result });
      };
      reader.readAsText(file);
    } else {
      setSelectedDoc({ name: file.name, content: `Preview not available for .${fileType} files` });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleQuerySubmit();
    } else if (e.key === "Enter" && e.shiftKey) {
      setQuery((prev) => prev + "\n");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="Mainpage">
      <div className="Sidebar">
        <button className="NewChatButton" onClick={handleNewChat}>
          <Plus size={20} /> New Chat
        </button>
        <h2 className="SidebarTitle">History</h2>
        <ul className="HistoryList">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`HistoryItem ${chat.id === currentChat ? "active" : ""}`}
              onClick={() => setCurrentChat(chat.id)}
            >
              Chat {chat.id}
            </li>
          ))}
        </ul>
      </div>

      <div className="RightPanel">
        <div className="ChatContainer">
          <div className="ChatArea">
            {getCurrentChat().history.length > 0 ? (
              getCurrentChat().history.map((item, index) => (
                <div key={index} className="ChatBubble">
                  {item.query && <p className="QueryBubble">💬 {item.query}</p>}
                  {item.file && (
                    <div
                      className="FileBubble"
                      onClick={() => openDocument(item.file)}
                    >
                      <FileText size={18} /> {item.file.name}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="NoMessages">Start a new conversation...</p>
            )}
          </div>

          <div className="QueryBox">
            <label className="UploadLabel">
              <UploadCloud size={22} className="UploadIcon" />
              <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileSelection} hidden />
            </label>
            <textarea
              ref={inputRef}
              placeholder="Upload a document or send a query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="QueryInput"
            />
            <button className="SendButton" onClick={handleQuerySubmit}>
              <Send size={22} />
            </button>
          </div>
          {selectedFile && (
            <p className="SelectedFile">📎 {selectedFile.name} (Will be sent with query)</p>
          )}
        </div>
      </div>

      {selectedDoc && (
        <div className="DocumentViewer">
          <div className="DocHeader">
            <h3>{selectedDoc.name}</h3>
            <button className="CloseButton" onClick={() => setSelectedDoc(null)}>
              <X size={22} />
            </button>
          </div>
          <div className="DocContent">{selectedDoc.content}</div>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Mainpage />);

export default Mainpage;
