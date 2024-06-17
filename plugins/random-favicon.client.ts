// plugins/random-favicon.client.ts
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  const favicons: string[] = [
    '/favicons/favico-1.ico',
    '/favicons/favico-2.ico',
    '/favicons/favico-3.ico',
    '/favicons/favico-4.ico',
    '/favicons/favico-5.ico',
    '/favicons/favico-6.ico',
    '/favicons/favico-7.ico',
    '/favicons/favico-8.ico',
    '/favicons/favico-9.ico',
    '/favicons/favico-10.ico',
    '/favicons/favico-11.ico',
    '/favicons/favico-12.ico',
  ];

  const randomIndex: number = Math.floor(Math.random() * favicons.length);
  const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
  if (link) {
    link.href = favicons[randomIndex];
  } else {
    const newLink: HTMLLinkElement = document.createElement('link');
    newLink.rel = 'icon';
    newLink.href = favicons[randomIndex];
    document.head.appendChild(newLink);
  }
});
