import Chat from '@/components/Chat';
import { auth } from '/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const res: any = await auth();

  if (res?.user) {
    return (
      <main className='-mobile-wrapper'>
        <Chat />
      </main>
    );
  } else {
    redirect('/api/auth/signin');
  }
}
