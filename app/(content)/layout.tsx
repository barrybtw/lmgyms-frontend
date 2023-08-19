import Nav from '@/components/nav';

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className='container'>{children}</main>
    </>
  );
}
