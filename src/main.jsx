import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </>
)

// {
//   "name": "daisy",
//   "private": true,
//   "version": "0.0.0",
//   "type": "module",
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "preview": "vite preview"
//   },
//   "dependencies": {
//     "@emotion/react": "^11.11.1",
//     "@mantine/core": "^6.0.20",
//     "@mantine/hooks": "^6.0.20",
//     "@reduxjs/toolkit": "^1.9.5",
//     "axios": "^1.3.2",
//     "chart.js": "^4.4.0",
//     "filepond-plugin-image-exif-orientation": "^1.0.11",
//     "filepond-plugin-image-preview": "^4.6.11",
//     "flowbite": "^1.8.1",
//     "flowbite-react": "^0.5.0",
//     "framer-motion": "^10.16.1",
//     "react": "^18.2.0",
//     "react-chartjs-2": "^5.2.0",
//     "react-daisyui": "^4.1.1",
//     "react-dom": "^18.2.0",
//     "react-filepond": "^7.1.2",
//     "react-icons": "^4.10.1",
//     "react-redux": "^8.1.2",
//     "react-router-dom": "^6.8.0",
//     "sweetalert2": "^11.7.27"
//   },
//   "devDependencies": {
//     "@faker-js/faker": "^8.0.2",
//     "@types/react": "^18.0.24",
//     "@types/react-dom": "^18.0.8",
//     "@vitejs/plugin-react": "^2.2.0",
//     "autoprefixer": "^10.4.13",
//     "daisyui": "^3.5.1",
//     "postcss": "^8.4.21",
//     "tailwindcss": "^3.2.4",
//     "vite": "^3.2.3"
//   }
// }
