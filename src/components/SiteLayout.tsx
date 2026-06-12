import { type ReactNode } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { MobileBuyBar } from './MobileBuyBar';

/**
 * Wrapper for the explorable content pages (chapters, future gear/photos/blog).
 * Adds the shared nav + per-route SEO <Head> (prerendered by vite-react-ssg).
 * The ad lander at "/" deliberately does NOT use this — it stays focused.
 */
export function SiteLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col pb-24 lg:pb-0">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <MobileBuyBar />
        <footer className="border-t border-slate-200 mt-16">
          <div className="container mx-auto px-4 py-8 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© {`${new Date().getFullYear()} `}Greg Buenzli · And Then We Hit a Rock</span>
            <Link to="/" className="text-blue-700 hover:text-blue-900">Get the book →</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
