'use client';

import { cn } from '@/utils';
import { Input, Button } from '@nextui-org/react';
import Message from './Message';
import { addDropMessage } from '@/server';
import { useState } from 'react';

const Chat = () => {
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

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
    }
    setTimeout(() => {
      setLoading(false);
    }, 100);
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
