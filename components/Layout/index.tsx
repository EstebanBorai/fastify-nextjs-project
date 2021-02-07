import React from 'react';
import Link from 'next/link';

const Layout = ({ children }: { children: JSX.Element }): JSX.Element => (
  <div>
    <header>
      <Link href="/">
        <h1>Home</h1>
      </Link>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </header>
    <main>{children}</main>
    <footer>
      <small>This is my footer</small>
    </footer>
  </div>
);

export default Layout;
