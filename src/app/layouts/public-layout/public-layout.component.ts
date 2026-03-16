import { Component } from '@angular/core';

@Component({
  selector: 'app-public-layout',
  template: `
    <div class="public-layout">
      <header class="public-header">
        <div class="container">
          <div class="logo">
            <h1>City Air Cooling Services</h1>
          </div>
          <nav class="public-nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
            <a routerLink="/services" routerLinkActive="active">Services</a>
            <a routerLink="/service-areas" routerLinkActive="active">Service Areas</a>
            <a routerLink="/about" routerLinkActive="active">About</a>
            <a routerLink="/faq" routerLinkActive="active">FAQ</a>
            <a routerLink="/contact" routerLinkActive="active">Contact</a>
<a routerLink="/book-service" class="btn-book-now">Book Now</a>
          </nav>
        </div>
      </header>
      <main class="public-content">
        <router-outlet></router-outlet>
      </main>
      <footer class="public-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>City Air Cooling Services</h3>
              <p>Professional AC repair and maintenance services</p>
            </div>
            <div class="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a routerLink="/services">Services</a></li>
<li><a routerLink="/book-service">Book Service</a></li>
                <li><a routerLink="/contact">Contact Us</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Contact Info</h4>
              <p>Phone: +91 98765 43210</p>
<p>Email: info&#64;cityaircooling.com</p>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 City Air Cooling Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
.public-layout {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    /* Background handled by MainLayout */
    
    .public-header {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
      backdrop-filter: blur(10px);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .public-header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
    }
    .logo h1 {
      font-size: 20px;
      color: #16213e;
      margin: 0;
    }
    .public-nav {
      display: flex;
      align-items: center;
      gap: 25px;
    }
    .public-nav a {
      text-decoration: none;
      color: #333;
      font-weight: 500;
      transition: color 0.3s;
    }
    .public-nav a:hover,
    .public-nav a.active {
      color: #007bff;
    }
    .btn-book-now {
      background: #007bff;
      color: white !important;
      padding: 10px 20px;
      border-radius: 5px;
    }
    .btn-book-now:hover {
      background: #0056b3;
    }
    .public-content {
      flex: 1;
      background: rgba(255, 255, 255, 0.95);
      margin-top: 20px;
      border-radius: 16px 16px 0 0;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
      position: relative;
      z-index: 10;
    }
    .public-footer {
      background: linear-gradient(180deg, #16213e 0%, #0f3460 100%);
      color: white;
      padding: 50px 0 20px;
      margin-top: auto;
    }
    .footer-content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-bottom: 30px;
    }
    .footer-section h3 {
      margin: 0 0 10px;
      font-size: 18px;
    }
    .footer-section h4 {
      margin: 0 0 15px;
      font-size: 16px;
    }
    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .footer-section ul li {
      margin-bottom: 8px;
    }
    .footer-section a {
      color: #aaa;
      text-decoration: none;
    }
    .footer-section a:hover {
      color: white;
    }
    .footer-bottom {
      border-top: 1px solid #333;
      padding-top: 20px;
      text-align: center;
      color: #888;
    }
  `]
})
export class PublicLayoutComponent {}

