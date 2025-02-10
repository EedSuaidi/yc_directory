import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut, signIn } from '@/auth';
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white px-5 py-3 font-work-sans shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  'use server';

                  await signOut({ redirectTo: '/' });
                }}
              >
                <span className="max-sm:hidden">Logout</span>
                <LogOut className="size-6 text-red-500 sm:hidden" />
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ''}
                    alt={session?.user?.name || ''}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';

                await signIn('github');
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
