'use client';

import * as React from 'react';
import { cn } from '@/utils';
import { Input, Button } from '@nextui-org/react';
import Message from './Message';
import { addDropMessage } from '@/server';

const Chat = () => {
  const [newMessages, setNewMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (inputValue.trim() !== '') {
      const res = await addDropMessage(inputValue);
      newMessages.push(res);

      setNewMessages(newMessages);
      setInputValue('');

      // @ts-ignore
      // messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className='flex flex-col overflow-hidden p-2 h-full'>
      <Message newMessages={newMessages} />
      <section className='w-[95vw] pb-2'>
        <form
          className={cn(
            'w-full flex flex-row overflow-hidden justify-center items-center',
          )}
          onSubmit={handleSubmit}
        >
          <Input
            classNames={{
              inputWrapper: ['bg-white'],
            }}
            color='primary'
            type='text'
            variant='bordered'
            placeholder='输入你要传递的内容'
            value={inputValue}
            onChange={handleInputChange}
          ></Input>

          <Button
            color='primary'
            className={cn('ml-2')}
            type='submit'
            isLoading={loading}
          >
            Drop
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Chat;
