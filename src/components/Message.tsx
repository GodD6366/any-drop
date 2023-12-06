'use client';

import { getDropMessage } from '@/server';
import type { Message } from '@prisma/client';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

const Message = (props: { newMessages: Message[] }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = useRef(null);

  const { newMessages = [] } = props;

  const scrollBottom = () => {
    if (listRef.current) {
      (listRef.current as any).scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  };

  useEffect(() => {
    getDropMessage().then((messages) => {
      setMessages(messages);
      scrollBottom();
    });
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [props.newMessages.length]);

  return (
    <ul className='overflow-auto flex-1'>
      {messages.concat(newMessages).map((message) => (
        <li
          key={message.id}
          className='flex flex-col shadow-sm w-fit min-w-[30%] max-w-[80%] bg-white p-2 mb-2'
        >
          <p className='text-gray-400 text-[12px] text-left'>
            {dayjs(message.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </p>
          <p className='text-black  break-words'>{message.value}</p>
        </li>
      ))}
      <li ref={listRef}></li>
    </ul>
  );
};

export default Message;
