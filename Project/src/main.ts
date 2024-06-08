import wpItaly from './assets/wp_italy.jpg'
import './style.css'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Vite + TypeScript</h1>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${wpItaly}" class="logo-italy" alt="TypeScript logo" />
    </a>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`
