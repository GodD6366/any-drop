'use client';
import { useEffect } from 'react';

export default function SetDocHeight() {
  useEffect(() => {
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', documentHeight);
    documentHeight();
  });
  return <></>;
}
