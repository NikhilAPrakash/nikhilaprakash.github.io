import React, { useState, useRef, useEffect, useCallback } from "react";
import "./ChatWidget.css";

const API_BASE = import.meta.env.VITE_CHAT_API_URL || "http://localhost:8000";

// ── Simple markdown-ish formatter ─────────────────────────────
function formatMessage(text) {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks (protect from other replacements)
  const codeBlocks = [];
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, _lang, code) => {
    codeBlocks.push(`<pre><code>${code.trim()}</code></pre>`);
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`;
  });

  // Inline code (protect from other replacements)
  const inlineCodes = [];
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    inlineCodes.push(`<code>${code}</code>`);
    return `%%INLINE_${inlineCodes.length - 1}%%`;
  });

  // Lists — process BEFORE inline formatting so line structure is intact
  // Unordered: lines starting with - or • or *  (but not ** which is bold)
  html = html.replace(/^[-•] (.+)/gm, "<li>$1</li>");
  html = html.replace(/^\* (?!\*)(.+)/gm, "<li>$1</li>");
  // Numbered lists
  html = html.replace(/^\d+\.\s(.+)/gm, "<li>$1</li>");
  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>[\s\S]*?<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Now apply inline formatting (inside list items and paragraphs)
  // Bold + italic (***text***)
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  // Bold (**text**) — must come before italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic (*text*) — only single * not part of **
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");

  // Citation markers [1] or [1, 2]
  html = html.replace(/\[(\d+(?:,\s*\d+)*)\]/g, '<span class="cw-citation">[$1]</span>');

  // Paragraphs (double newlines)
  html = html.replace(/\n\n+/g, "</p><p>");
  html = "<p>" + html + "</p>";
  html = html.replace(/<p>\s*<\/p>/g, "");

  // Don't wrap lists or code blocks in <p>
  html = html.replace(/<p>(<ul>)/g, "$1");
  html = html.replace(/(<\/ul>)<\/p>/g, "$1");
  html = html.replace(/<p>(%%CODEBLOCK)/g, "$1");
  html = html.replace(/(%%)<\/p>/g, "$1");

  // Single newlines → <br> inside paragraphs (not inside lists)
  html = html.replace(/([^>])\n([^<])/g, "$1<br>$2");

  // Restore code blocks and inline code
  codeBlocks.forEach((block, i) => {
    html = html.replace(`%%CODEBLOCK_${i}%%`, block);
  });
  inlineCodes.forEach((code, i) => {
    html = html.replace(`%%INLINE_${i}%%`, code);
  });

  return html;
}

// ── Suggestion prompts ────────────────────────────────────────
const SUGGESTIONS = [
  { icon: "💡", text: "What are Nikhil's strongest technical skills?" },
  { icon: "🔧", text: "Tell me about the MLOps RAG Assistant project" },
  { icon: "🎓", text: "What's Nikhil's educational background?" },
  { icon: "🚀", text: "Why should I consider Nikhil for an ML role?" },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-dismiss tooltip after 8 seconds
  useEffect(() => {
    if (!showTooltip) return;
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, [showTooltip]);

  // Hide tooltip when chat opens
  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || input).trim();
      if (!trimmed || isLoading) return;

      // Build history from existing messages (before adding the new one)
      const history = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));

      // Add user message to UI
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch(`${API_BASE}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: trimmed,
            history: history.slice(-10),
          }),
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.answer,
            sources: data.sources,
          },
        ]);
      } catch (err) {
        console.error("Chat error:", err);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const showWelcome = messages.length === 0;

  return (
    <>
      {/* Tooltip bubble */}
      {showTooltip && !isOpen && (
        <div
          className="cw-tooltip"
          onClick={() => { setShowTooltip(false); setIsOpen(true); }}
        >
          <span>Ask my AI assistant anything</span>
          <button
            className="cw-tooltip-close"
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        className={`cw-fab ${isOpen ? "cw-fab-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <div className={`cw-panel ${isOpen ? "cw-panel-open" : ""}`}>
        {/* Header */}
        <div className="cw-header">
          <div className="cw-header-left">
            <div className="cw-avatar">NA</div>
            <div>
              <div className="cw-header-name">Nikhil's AI Assistant</div>
              <div className="cw-header-sub">
                Ask about skills, projects & experience
              </div>
            </div>
          </div>
          <div className="cw-status">
            <span className="cw-status-dot" />
            online
          </div>
        </div>

        {/* Body */}
        <div className="cw-body">
          {showWelcome ? (
            <div className="cw-welcome">
              <div className="cw-welcome-icon">🤖</div>
              <p className="cw-welcome-text">
                Hi! I can answer questions about Nikhil's background, projects,
                and skills — all grounded in real portfolio data.
              </p>
              <div className="cw-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.text}
                    className="cw-suggestion"
                    onClick={() => {
                      sendMessage(s.text);
                    }}
                  >
                    <span className="cw-suggestion-icon">{s.icon}</span>
                    {s.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="cw-messages">
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="cw-input-area">
          <div className="cw-input-wrap">
            <textarea
              ref={inputRef}
              className="cw-input"
              placeholder="Ask me anything..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 100) + "px";
              }}
            />
            <button
              className="cw-send"
              disabled={!input.trim() || isLoading}
              onClick={() => sendMessage()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <div className="cw-input-footer">
            <span>Powered by RAG + Gemini</span>
            {messages.length > 0 && (
              <button className="cw-clear" onClick={clearChat}>
                clear chat
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Message bubble ────────────────────────────────────────────
function Message({ msg }) {
  const [sourcesOpen, setSourcesOpen] = useState(false);

  return (
    <div className={`cw-msg cw-msg-${msg.role}`}>
      <div className="cw-msg-avatar">
        {msg.role === "assistant" ? "NA" : "?"}
      </div>
      <div className="cw-msg-body">
        <div
          className="cw-msg-content"
          dangerouslySetInnerHTML={{
            __html:
              msg.role === "assistant"
                ? formatMessage(msg.content)
                : msg.content
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;"),
          }}
        />
        {msg.sources?.length > 0 && (
          <div className="cw-sources">
            <button
              className={`cw-sources-toggle ${sourcesOpen ? "open" : ""}`}
              onClick={() => setSourcesOpen(!sourcesOpen)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              {msg.sources.length} source{msg.sources.length > 1 ? "s" : ""}
            </button>
            {sourcesOpen && (
              <div className="cw-sources-list">
                {msg.sources.map((s) => (
                  <div key={s.source_id} className="cw-source-item">
                    <span
                      className={`cw-score ${
                        s.score >= 0.7
                          ? "high"
                          : s.score >= 0.4
                          ? "mid"
                          : "low"
                      }`}
                    >
                      {s.score.toFixed(2)}
                    </span>
                    <span>
                      [{s.source_id}] {s.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Typing dots ───────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="cw-msg cw-msg-assistant">
      <div className="cw-msg-avatar">NA</div>
      <div className="cw-msg-body">
        <div className="cw-msg-content">
          <div className="cw-typing">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}