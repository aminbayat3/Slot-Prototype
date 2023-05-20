import Home from "./pages/home-page.component";

const home = Home.getInstance();

// function loadContent() {
//     const path = window.location.pathname;
//     const contentElement = document.getElementById('content');
//     contentElement.innerHTML = '';
  
//     if (path === '/') {
//       fetch('home.html')
//         .then(response => response.text())
//         .then(html => {
//           contentElement.innerHTML = html;
//         })
//         .catch(error => {
//           console.error('Error loading home.html:', error);
//         });
//     } else if (path === '/about') {
//       fetch('about.html')
//         .then(response => response.text())
//         .then(html => {
//           contentElement.innerHTML = html;
//         })
//         .catch(error => {
//           console.error('Error loading about.html:', error);
//         });
//     } else if (path === '/contact') {
//       fetch('contact.html')
//         .then(response => response.text())
//         .then(html => {
//           contentElement.innerHTML = html;
//         })
//         .catch(error => {
//           console.error('Error loading contact.html:', error);
//         });
//     } else {
//       const notFoundContent = document.createElement('h1');
//       notFoundContent.textContent = '404 - Page Not Found';
//       contentElement.appendChild(notFoundContent);
//     }
//   }