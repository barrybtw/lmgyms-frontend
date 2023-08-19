'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Moon from './moon';
import Sun from './sun';
import System from './system';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import useSession from '@/lib/use-auth';

const main_routes = [
  { name: 'Home', path: '/', private_route: false },
] as const;

export default function Nav({
  className,
  ...rest
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { setTheme, systemTheme } = useTheme();

  const session = useSession();
  console.log(session);

  return (
    <nav
      className={cn(
        className,
        'h-16 container flex justify-between items-center',
      )}
      {...rest}
    >
      <ul aria-label='links'>
        {main_routes.map(({ name, path, private_route }) => {
          return (
            <Link
              href={path}
              className={cn(private_route && 'hidden')}
              key={name + path}
            >
              {name}
            </Link>
          );
        })}
      </ul>
      <div className='flex flex-row items-center space-x-8'>
        <ul aria-label='auth actions' className='flex items-center space-x-4'>
          <Link href={'/login'} className={cn(false && 'hidden')}>
            Login
          </Link>
          <Link href={'/register'} className={cn(false && 'hidden')}>
            Register
          </Link>
        </ul>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'} size={'sm'}>
              <Moon className='hidden dark:inline-block' />
              <Sun className='inline-block dark:hidden' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='flex flex-row gap-2 cursor-pointer'
              onClick={() => {
                setTheme('dark');
              }}
            >
              <Moon /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              className='flex flex-row gap-2 cursor-pointer'
              onClick={() => {
                setTheme('light');
              }}
            >
              <Sun /> Light
            </DropdownMenuItem>
            <DropdownMenuItem
              className='flex flex-row gap-2 cursor-pointer'
              onClick={() => {
                setTheme(systemTheme || 'light');
              }}
            >
              <System /> System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
