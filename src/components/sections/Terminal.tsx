"use client";

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

interface HistoryEntry {
  command: string;
  output: string;
  type?: "success" | "error" | "info";
}

// Colorize terminal output: wrap patterns in <span> elements
function colorizeOutput(text: string): React.ReactNode {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Lines with year prefix (YYYY or YYYY-YYYY)
    const yearMatch = line.match(/^(\d{4}(?:-\d{4})?)\s{2,}(.*?)\s{2,}(.*)/);
    if (yearMatch) {
      return (
        <div key={i}>
          <span style={{ color: "#a855f7", fontWeight: 500 }}>{yearMatch[1].padEnd(10)}</span>
          <span style={{ color: "#00f0ff" }}>{yearMatch[2].padEnd(22)}</span>
          <span style={{ color: "#a0a0a0" }}>{yearMatch[3]}</span>
        </div>
      );
    }
    // Lines with → arrows
    if (line.includes("→")) {
      const parts = line.split("→");
      return (
        <div key={i}>
          <span style={{ color: "#a0a0a0" }}>{parts[0]}</span>
          <span style={{ color: "#00f0ff" }}>{"→"}</span>
          <span style={{ color: "#f0f0f0" }}>{parts.slice(1).join("→")}</span>
        </div>
      );
    }
    // Bold first word for labels (word:) — only short lines
    const labelMatch = line.match(/^(\w+)\s*:\s*(.*)/);
    if (labelMatch && line.length < 60) {
      return (
        <div key={i}>
          <span style={{ color: "#a855f7" }}>{labelMatch[1]}</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>{": "}</span>
          <span style={{ color: "#f0f0f0" }}>{labelMatch[2]}</span>
        </div>
      );
    }
    // Default
    return (
      <div key={i} style={{ color: "#a0a0a0" }}>
        {line || "\u00A0"}
      </div>
    );
  });
}

export default function Terminal() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(true);
  const [welcomeText, setWelcomeText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Typewriter effect for welcome message
  useEffect(() => {
    setWelcomeText("");
    setIsTyping(true);
    const full = t.terminal.welcome;
    let i = 0;
    const timer = setInterval(() => {
      if (i < full.length) {
        setWelcomeText(full.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 18);
    return () => clearInterval(timer);
  }, [t.terminal.welcome]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, welcomeText]);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      if (trimmed === "clear") {
        setHistory([]);
        setCommandHistory([]);
        return;
      }
      const commands = t.terminal.commands as Record<string, string>;
      const output = commands[trimmed] ?? t.terminal.notFound;
      const type: HistoryEntry["type"] = commands[trimmed] ? "success" : "error";
      setHistory((prev) => [...prev, { command: cmd, output, type }]);
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    },
    [t]
  );

  const runCommand = (cmd: string) => {
    processCommand(cmd);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = [
        ...Object.keys(t.terminal.commands as Record<string, string>),
        "clear",
      ];
      const match = cmds.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const quickCommands = Object.keys(
    t.terminal.commands as Record<string, string>
  ).filter((k) => k !== "help");

  return (
    <section id="terminal" className="section-padding bg-bg-secondary">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <ScrollReveal className="text-center mb-10 md:mb-16">
          <SectionLabel text={t.terminal.label} />
          <h2 className="section-title font-display mt-4 mb-4">
            {t.terminal.title}
          </h2>
          <p
            style={{
              fontSize: "clamp(13px, 2vw, 16px)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-mono)",
              padding: "0 8px",
            }}
          >
            {t.terminal.hint}
          </p>
        </ScrollReveal>

        {/* Two-panel layout */}
        <ScrollReveal delay={0.2}>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            {/* Terminal window */}
            <div
              style={{
                flex: 1,
                background: "rgba(6,6,6,0.97)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
                cursor: "text",
              }}
              onClick={() => inputRef.current?.focus()}
            >
              {/* macOS title bar */}
              <div
                data-terminal="titlebar"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 20px",
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
                aria-hidden="true"
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#ff5f57",
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#febc2e",
                  }}
                />
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#28c840",
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {t.terminal.prompt} — zsh
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.15)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {lang === "fr" ? "FR" : "EN"}
                </div>
              </div>

              {/* Terminal body */}
              <div
                ref={terminalRef}
                role="log"
                aria-live="polite"
                aria-label="Terminal output"
                data-terminal="body"
                style={{
                  padding: isMobile ? "14px 14px" : "24px 28px",
                  height: isMobile ? "300px" : "440px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  fontFamily: "var(--font-mono)",
                  fontSize: isMobile ? "12px" : "13.5px",
                  lineHeight: "1.75",
                }}
              >
                {/* Welcome typewriter */}
                <div style={{ marginBottom: "20px" }}>
                  <span style={{ color: "#00f0ff" }}>{welcomeText}</span>
                  {isTyping && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "14px",
                        background: "#00f0ff",
                        marginLeft: "2px",
                        verticalAlign: "middle",
                        animation: "blink 1s step-end infinite",
                      }}
                    />
                  )}
                </div>

                {/* Command history */}
                {history.map((entry, i) => (
                  <div key={i} style={{ marginBottom: "14px" }}>
                    {entry.command && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: isMobile ? "4px" : "8px",
                          marginBottom: "6px",
                          flexWrap: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {!isMobile && (
                          <>
                            <span
                              style={{
                                color: "#22c55e",
                                fontWeight: 700,
                                fontSize: "12px",
                                flexShrink: 0,
                              }}
                            >
                              anderson
                            </span>
                            <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>@</span>
                            <span
                              style={{
                                color: "#00f0ff",
                                fontWeight: 600,
                                fontSize: "12px",
                                flexShrink: 0,
                              }}
                            >
                              portfolio
                            </span>
                          </>
                        )}
                        {isMobile && (
                          <span
                            style={{
                              color: "#22c55e",
                              fontWeight: 700,
                              fontSize: "11px",
                              flexShrink: 0,
                            }}
                          >
                            ~
                          </span>
                        )}
                        <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>$</span>
                        <span style={{ color: "#f0f0f0", wordBreak: "break-word" }}>{entry.command}</span>
                      </div>
                    )}
                    <div
                      style={{
                        paddingLeft: "8px",
                        borderLeft:
                          entry.type === "error"
                            ? "2px solid #ff5f57"
                            : "2px solid rgba(0,240,255,0.15)",
                      }}
                    >
                      {colorizeOutput(entry.output)}
                    </div>
                  </div>
                ))}

                {/* Input line */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: isMobile ? "4px" : "8px" }}
                >
                  {!isMobile && (
                    <>
                      <span
                        style={{
                          color: "#22c55e",
                          fontWeight: 700,
                          fontSize: "12px",
                          flexShrink: 0,
                        }}
                      >
                        anderson
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>@</span>
                      <span
                        style={{
                          color: "#00f0ff",
                          fontWeight: 600,
                          fontSize: "12px",
                          flexShrink: 0,
                        }}
                      >
                        portfolio
                      </span>
                    </>
                  )}
                  {isMobile && (
                    <span
                      style={{
                        color: "#22c55e",
                        fontWeight: 700,
                        fontSize: "11px",
                        flexShrink: 0,
                      }}
                    >
                      ~
                    </span>
                  )}
                  <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#f0f0f0",
                      fontFamily: "var(--font-mono)",
                      fontSize: "13.5px",
                      caretColor: "#00f0ff",
                    }}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoComplete="off"
                    aria-label="Terminal input"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar — quick commands */}
            <div
              className="hidden lg:flex"
              style={{
                width: "220px",
                flexShrink: 0,
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "10px 14px",
                  fontSize: "10px",
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {t.terminal.quickAccess}
              </div>

              {quickCommands.map((cmd) => (
                <motion.button
                  key={cmd}
                  onClick={() => runCommand(cmd)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.5)",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.background = "rgba(0,240,255,0.05)";
                    btn.style.borderColor = "rgba(0,240,255,0.2)";
                    btn.style.color = "#00f0ff";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.background = "rgba(255,255,255,0.03)";
                    btn.style.borderColor = "rgba(255,255,255,0.06)";
                    btn.style.color = "rgba(255,255,255,0.5)";
                  }}
                  aria-label={`Run command: ${cmd}`}
                >
                  <span
                    style={{ color: "rgba(0,240,255,0.4)", fontSize: "10px" }}
                  >
                    $
                  </span>
                  {cmd}
                </motion.button>
              ))}

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                  margin: "4px 0",
                }}
              />

              {/* Clear */}
              <motion.button
                onClick={() => runCommand("clear")}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.3)",
                  width: "100%",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.color = "#ff5f57";
                  btn.style.borderColor = "rgba(255,95,87,0.3)";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.color = "rgba(255,255,255,0.3)";
                  btn.style.borderColor = "rgba(255,255,255,0.04)";
                }}
                aria-label="Clear terminal"
              >
                <span
                  style={{ color: "rgba(255,95,87,0.5)", fontSize: "10px" }}
                >
                  $
                </span>
                clear
              </motion.button>

              {/* Keyboard hint */}
              <div
                style={{
                  marginTop: "8px",
                  padding: "10px 14px",
                  fontSize: "10px",
                  fontFamily: "var(--font-mono)",
                  color: "rgba(255,255,255,0.2)",
                  lineHeight: 1.8,
                }}
              >
                <div>{"↑↓ "}{lang === "fr" ? "historique" : "history"}</div>
                <div>{"Tab "}{lang === "fr" ? "complétion" : "completion"}</div>
                <div>{"Enter "}{lang === "fr" ? "exécuter" : "execute"}</div>
              </div>
            </div>
          </div>

          {/* Mobile quick-command chips — horizontal scroll strip, below terminal */}
          {isMobile && (
            <div
              style={{
                marginTop: "12px",
                overflowX: "auto",
                paddingBottom: "4px",
              }}
            >
              <div style={{ display: "flex", gap: "8px", width: "max-content" }}>
                {quickCommands.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => runCommand(cmd)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "8px 12px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.6)",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                    aria-label={`${lang === "fr" ? "Exécuter" : "Run"}: ${cmd}`}
                  >
                    <span style={{ color: "rgba(0,240,255,0.5)", fontSize: "10px" }}>$</span>
                    {cmd}
                  </button>
                ))}
                <button
                  onClick={() => runCommand("clear")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "8px 12px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "rgba(255,95,87,0.7)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  aria-label={lang === "fr" ? "Effacer le terminal" : "Clear terminal"}
                >
                  <span style={{ fontSize: "10px" }}>$</span>
                  clear
                </button>
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
