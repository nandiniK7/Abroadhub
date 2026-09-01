import React, { useState, useEffect, useRef } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageHeader from '../../components/layout/PageHeader';
import { Send } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { useRealtime } from '../../hooks/useRealtime';
import { RT } from '../../services/realtime';

export default function ChatPage() {
  const { cid } = useParams();
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [name, setName] = useState('Chat');
  const boxRef = useRef(null);

  useEffect(() => {
    (async () => {
      const list = await api.getMessages(cid);
      setMessages(list);
      const convos = await api.getConversations();
      const c = convos.find((x) => x.id === cid);
      if (c) setName(c.name);
    })();
  }, [cid]);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  // Live: pick up messages sent from other tabs for this conversation.
  useRealtime(RT.MESSAGE_NEW, (evt) => {
    if (!evt || evt.cid !== cid) return;
    setMessages((cur) => (cur.some((m) => m.id === evt.msg.id) ? cur : [...cur, evt.msg]));
  });

  const send = async () => {
    if (!draft.trim()) return;
    const msg = await api.sendMessage(cid, draft.trim());
    setMessages((cur) => [...cur, msg]);
    setDraft('');
  };

  return (
    <AppShell hideBottomNav topBar={<PageHeader testId="chat-header" title={name} />}>
      <div ref={boxRef} data-testid="chat-messages" className="bg-white px-4 py-4 space-y-3 min-h-[60vh]">
        {messages.length === 0 && (
          <p className="text-center text-[13px] text-[color:var(--ah-ink-3)] mt-16">No messages yet — say hi 👋</p>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-[14px] ${
              m.from === 'me' ? 'bg-[color:var(--ah-coral)] text-white rounded-br-sm' : 'bg-[color:var(--ah-line-2)] text-[color:var(--ah-ink)] rounded-bl-sm'
            }`}>
              {m.text}
              <div className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-white/80' : 'text-[color:var(--ah-ink-3)]'}`}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 inset-x-0 lg:pl-[260px] xl:pl-[280px] bg-white border-t border-[color:var(--ah-line)] pb-safe z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-2 p-3">
          <input
            data-testid="chat-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
            placeholder="Message…"
            className="flex-1 h-11 px-4 rounded-full bg-[color:var(--ah-line-2)] outline-none text-[14px]"
          />
          <button data-testid="chat-send" onClick={send} aria-label="Send" className="w-11 h-11 rounded-full bg-[color:var(--ah-coral)] text-white grid place-items-center ah-tap">
            <Send size={18} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
