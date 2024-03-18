import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" /></div>
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (!editor || typeof editor === 'undefined' || !editor.editor) {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
if (workbox) {
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: null },
    { url: '/css/style.css', revision: null },
    { url: '/js/database.js', revision: null },
    { url: '/js/editor.js', revision: null },
    { url: '/js/header.js', revision: null },
    { url: '/js/index.js', revision: null },
    { url: '/js/install.js', revision: null },
    { url: '/images/logo.png', revision: null },

  ]);
}
