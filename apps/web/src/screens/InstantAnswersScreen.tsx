import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserPrefsStore } from "../stores/useUserPrefsStore";
import { getSuggestedQuestions } from "../lib/suggestedQuestions";
import { buildAnswerContext } from "../lib/buildAnswerContext";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function InstantAnswersScreen() {
  const navigate = useNavigate();
  const { housingType, housingAgency, baseId, villageId } = useUserPrefsStore();

  const userCtx = { housingType, housingAgency, baseId, villageId };
  const suggested = getSuggestedQuestions(userCtx);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleAsk(question: string) {
    if (!question.trim() || loading) return;

    const userMessage: Message = { role: "user", content: question };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setShowInput(false);
    setLoading(true);

    const context = buildAnswerContext(question, userCtx);

    const systemPrompt = `You are the BaseLine assistant — a helpful guide for US military families arriving in Okinawa, Japan.

Your job is to give direct, accurate, practical answers about life in Okinawa. You are friendly but efficient — families are often stressed and need quick answers, not long explanations.

Use the following BaseLine content and user profile to personalize your answer. If the answer is covered by BaseLine content, answer from that. If not, answer from your general knowledge about Okinawa and military life there.

${context}

Guidelines:
- Keep answers concise and actionable
- Use bullet points for lists of steps or items
- If you mention a phone number, format it clearly
- If you don't know something specific, say so honestly
- Never make up specific details like phone numbers or dates
- Always consider the user's housing situation when relevant`;

    try {
      const response = await fetch("/api/ask", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    systemPrompt,
    messages: newMessages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  }),
});

const data = await response.json();
const reply = data.text ?? "Sorry, I couldn't get an answer. Please try again.";

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong. Please check your connection and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* Header */}
      <div
        className="px-5 pt-12 pb-5"
        style={{
          background: "linear-gradient(135deg, var(--color-brand-dark) 0%, var(--color-brand) 100%)",
        }}
      >
        <button
          onClick={() => navigate("/")}
          className="text-blue-200 text-sm mb-2 active:opacity-70"
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Instant Answers</h1>
        <p className="text-blue-200 text-sm mt-1">Ask anything about life in Okinawa</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 pb-48">

        {/* Welcome state */}
        {messages.length === 0 && (
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">
                <span aria-hidden="true">✨</span> What do you need help with?
              </p>
              <p className="text-gray-500 text-sm">
                Tap a question below or type your own.
              </p>
            </div>

            {/* Suggested questions */}
            <div className="flex flex-col gap-2" role="list">
              {suggested.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleAsk(q)}
                  className="w-full text-left px-4 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
                  role="listitem"
                >
                  <span className="text-gray-800 text-sm font-medium">{q}</span>
                </button>
              ))}
              <button
                onClick={() => setShowInput(true)}
                className="w-full text-left px-4 py-4 rounded-2xl border border-dashed border-gray-300 active:scale-95 transition-transform"
                style={{ color: "var(--color-text-muted)" }}
              >
                <span className="text-sm">Something else...</span>
              </button>
            </div>
          </div>
        )}

        {/* Conversation */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "text-white rounded-br-sm"
                  : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
              }`}
              style={
                msg.role === "user"
                  ? { backgroundColor: "var(--color-brand)" }
                  : {}
              }
            >
              {msg.content.split("\n").map((line, j) => (
                <p key={j} className={line === "" ? "mt-2" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm rounded-bl-sm">
              <div className="flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "var(--color-brand)", animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "var(--color-brand)", animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "var(--color-brand)", animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Follow-up suggestions after first answer */}
        {messages.length >= 2 && !loading && (
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => setShowInput(true)}
              className="w-full text-left px-4 py-3 rounded-2xl border border-dashed border-gray-300 active:scale-95 transition-transform text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Ask another question...
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {showInput && (
        <div
          className="fixed bottom-0 left-0 right-0 px-4 py-4 bg-white border-t border-gray-200 shadow-lg"
          style={{ maxWidth: 430, margin: "0 auto" }}
        >
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk(input)}
              autoFocus
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "var(--color-brand)" } as React.CSSProperties}
              aria-label="Ask a question"
            />
            <button
              onClick={() => handleAsk(input)}
              disabled={!input.trim() || loading}
              className="px-4 py-3 rounded-xl text-white font-medium disabled:opacity-50 active:scale-95 transition-transform"
              style={{ backgroundColor: "var(--color-brand)" }}
              aria-label="Send question"
            >
              →
            </button>
          </div>
          <button
            onClick={() => setShowInput(false)}
            className="w-full text-center text-xs mt-2 py-1 active:opacity-70"
            style={{ color: "var(--color-text-muted)" }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}