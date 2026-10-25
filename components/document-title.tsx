"use client";

import { useEffect } from "react";

/*
  The 404's title is right in the server's HTML, but once the page hydrates in
  the browser the root layout's default title comes back. This keeps the tab
  saying what the page is.
*/
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}
