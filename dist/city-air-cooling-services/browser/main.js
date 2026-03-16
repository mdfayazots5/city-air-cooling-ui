import {
  EventTrackingService,
  LocationService
} from "./chunk-FZMCAFQB.js";
import {
  ApiService,
  BrowserModule,
  CommonModule,
  ConfigService,
  FormsModule,
  HttpClientModule,
  NgForOf,
  ReactiveFormsModule,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  platformBrowser,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵresolveWindow,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-EWJTCRSA.js";

// src/app/app-routing.module.ts
var routes = [
  {
    path: "",
    loadChildren: () => import("./chunk-HRXFD77H.js").then((m) => m.PublicSiteModule)
  },
  {
    path: "admin",
    loadChildren: () => import("./chunk-UQ46O542.js").then((m) => m.AdminModule)
  },
  { path: "**", redirectTo: "" }
];
var AppRoutingModule = class _AppRoutingModule {
  static {
    this.\u0275fac = function AppRoutingModule_Factory(t) {
      return new (t || _AppRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forRoot(routes), RouterModule] });
  }
};

// src/app/core/core.module.ts
var CoreModule = class _CoreModule {
  constructor(parentModule) {
    if (parentModule) {
      throw new Error("CoreModule is already loaded. Import it in the AppModule only.");
    }
  }
  static {
    this.\u0275fac = function CoreModule_Factory(t) {
      return new (t || _CoreModule)(\u0275\u0275inject(_CoreModule, 12));
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _CoreModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ providers: [
      ConfigService,
      ApiService,
      EventTrackingService,
      LocationService
    ], imports: [
      CommonModule,
      HttpClientModule
    ] });
  }
};

// src/app/shared/components/header/header.component.ts
var _c0 = () => ({ exact: true });
var HeaderComponent = class _HeaderComponent {
  constructor(configService) {
    this.configService = configService;
    this.isScrolled = false;
    this.callUrl = "";
    this.whatsAppUrl = "";
  }
  ngOnInit() {
    this.business = this.configService.business;
    this.callUrl = this.configService.getCallUrl();
    this.whatsAppUrl = this.configService.getWhatsAppUrl();
  }
  onScroll() {
    this.isScrolled = window.scrollY > 100;
  }
  onCallClick() {
    console.log("Call button clicked");
  }
  onWhatsAppClick() {
    console.log("WhatsApp clicked");
  }
  static {
    this.\u0275fac = function HeaderComponent_Factory(t) {
      return new (t || _HeaderComponent)(\u0275\u0275directiveInject(ConfigService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], hostBindings: function HeaderComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("scroll", function HeaderComponent_scroll_HostBindingHandler() {
          return ctx.onScroll();
        }, false, \u0275\u0275resolveWindow);
      }
    }, decls: 28, vars: 7, consts: [[1, "header"], [1, "container"], [1, "logo"], ["routerLink", "/"], [1, "navigation"], ["routerLink", "/", "routerLinkActive", "active", 3, "routerLinkActiveOptions"], ["routerLink", "/services", "routerLinkActive", "active"], ["routerLink", "/service-areas", "routerLinkActive", "active"], ["routerLink", "/about", "routerLinkActive", "active"], ["routerLink", "/contact", "routerLinkActive", "active"], [1, "header-actions"], [1, "btn-call", 3, "click", "href"], ["target", "_blank", 1, "btn-whatsapp", 3, "click", "href"]], template: function HeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3)(4, "h1");
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(6, "nav", 4)(7, "ul")(8, "li")(9, "a", 5);
        \u0275\u0275text(10, "Home");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "li")(12, "a", 6);
        \u0275\u0275text(13, "Services");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "li")(15, "a", 7);
        \u0275\u0275text(16, "Service Areas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "li")(18, "a", 8);
        \u0275\u0275text(19, "About");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "li")(21, "a", 9);
        \u0275\u0275text(22, "Contact");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(23, "div", 10)(24, "a", 11);
        \u0275\u0275listener("click", function HeaderComponent_Template_a_click_24_listener() {
          return ctx.onCallClick();
        });
        \u0275\u0275text(25, "Call Now");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "a", 12);
        \u0275\u0275listener("click", function HeaderComponent_Template_a_click_26_listener() {
          return ctx.onWhatsAppClick();
        });
        \u0275\u0275text(27, "WhatsApp");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("scrolled", ctx.isScrolled);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.business.name);
        \u0275\u0275advance(4);
        \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(6, _c0));
        \u0275\u0275advance(15);
        \u0275\u0275property("href", ctx.callUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance(2);
        \u0275\u0275property("href", ctx.whatsAppUrl, \u0275\u0275sanitizeUrl);
      }
    }, dependencies: [RouterLink, RouterLinkActive], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  transition: all 0.3s ease;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n}\n.header.scrolled[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);\n}\n.header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.logo[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: #1a73e8;\n}\n.logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.navigation[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  gap: 2rem;\n}\n.navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: #333;\n  font-weight: 500;\n  transition: color 0.3s;\n}\n.navigation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .navigation[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  color: #1a73e8;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n}\n.btn-call[_ngcontent-%COMP%], .btn-whatsapp[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border-radius: 5px;\n  text-decoration: none;\n  font-weight: 600;\n  transition: all 0.3s;\n}\n.btn-call[_ngcontent-%COMP%] {\n  background: #1a73e8;\n  color: white;\n}\n.btn-call[_ngcontent-%COMP%]:hover {\n  background: #1557b0;\n}\n.btn-whatsapp[_ngcontent-%COMP%] {\n  background: #25d366;\n  color: white;\n}\n.btn-whatsapp[_ngcontent-%COMP%]:hover {\n  background: #1da851;\n}\n/*# sourceMappingURL=header.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src\\app\\shared\\components\\header\\header.component.ts", lineNumber: 122 });
})();

// src/app/shared/components/footer/footer.component.ts
var _c02 = () => ["/service-areas"];
var _c1 = (a0) => ({ area: a0 });
function FooterComponent_li_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "a", 13);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const area_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(3, _c02))("queryParams", \u0275\u0275pureFunction1(4, _c1, area_r1.name));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r1.name);
  }
}
var FooterComponent = class _FooterComponent {
  constructor(configService) {
    this.configService = configService;
    this.serviceAreas = [];
    this.callUrl = "";
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  }
  ngOnInit() {
    this.business = this.configService.business;
    this.serviceAreas = this.configService.serviceAreas;
    this.callUrl = this.configService.getCallUrl();
  }
  static {
    this.\u0275fac = function FooterComponent_Factory(t) {
      return new (t || _FooterComponent)(\u0275\u0275directiveInject(ConfigService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FooterComponent, selectors: [["app-footer"]], decls: 65, vars: 8, consts: [[1, "footer"], [1, "container"], [1, "footer-content"], [1, "footer-section"], [1, "contact-info"], [3, "href"], ["routerLink", "/"], ["routerLink", "/services"], ["routerLink", "/service-areas"], ["routerLink", "/about"], ["routerLink", "/contact"], [4, "ngFor", "ngForOf"], [1, "footer-bottom"], [3, "routerLink", "queryParams"]], template: function FooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3");
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Your trusted AC service partner in Hyderabad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 4)(9, "p")(10, "strong");
        \u0275\u0275text(11, "Phone:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "a", 5);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "p")(15, "strong");
        \u0275\u0275text(16, "Email:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "a", 5);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(19, "div", 3)(20, "h4");
        \u0275\u0275text(21, "Quick Links");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "ul")(23, "li")(24, "a", 6);
        \u0275\u0275text(25, "Home");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "li")(27, "a", 7);
        \u0275\u0275text(28, "Services");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "li")(30, "a", 8);
        \u0275\u0275text(31, "Service Areas");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "li")(33, "a", 9);
        \u0275\u0275text(34, "About");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(35, "li")(36, "a", 10);
        \u0275\u0275text(37, "Contact");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(38, "div", 3)(39, "h4");
        \u0275\u0275text(40, "Our Services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "ul")(42, "li")(43, "a", 7);
        \u0275\u0275text(44, "AC Repair");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(45, "li")(46, "a", 7);
        \u0275\u0275text(47, "AC Installation");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "li")(49, "a", 7);
        \u0275\u0275text(50, "AC Maintenance");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(51, "li")(52, "a", 7);
        \u0275\u0275text(53, "Gas Refilling");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(54, "li")(55, "a", 7);
        \u0275\u0275text(56, "AMC");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(57, "div", 3)(58, "h4");
        \u0275\u0275text(59, "Service Areas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "ul");
        \u0275\u0275template(61, FooterComponent_li_61_Template, 3, 6, "li", 11);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(62, "div", 12)(63, "p");
        \u0275\u0275text(64);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.business.name);
        \u0275\u0275advance(7);
        \u0275\u0275property("href", ctx.callUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.business.phone);
        \u0275\u0275advance(4);
        \u0275\u0275property("href", "mailto:" + ctx.business.email, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.business.email);
        \u0275\u0275advance(43);
        \u0275\u0275property("ngForOf", ctx.serviceAreas.slice(0, 6));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate2("\xA9 ", ctx.currentYear, " ", ctx.business.name, ". All rights reserved.");
      }
    }, dependencies: [NgForOf, RouterLink], styles: ["\n\n.footer[_ngcontent-%COMP%] {\n  background: #1a1a2e;\n  color: white;\n  padding: 3rem 0 1rem;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n.footer-content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 2rem;\n  margin-bottom: 2rem;\n}\n.footer-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #1a73e8;\n  margin-bottom: 0.5rem;\n}\n.footer-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #fff;\n  margin-bottom: 1rem;\n}\n.footer-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.footer-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.footer-section[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #ccc;\n  text-decoration: none;\n  transition: color 0.3s;\n}\n.footer-section[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #1a73e8;\n}\n.contact-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.3rem 0;\n  color: #ccc;\n}\n.contact-info[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #1a73e8;\n}\n.footer-bottom[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  padding-top: 1rem;\n  text-align: center;\n  color: #888;\n}\n/*# sourceMappingURL=footer.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FooterComponent, { className: "FooterComponent", filePath: "src\\app\\shared\\components\\footer\\footer.component.ts", lineNumber: 126 });
})();

// src/app/shared/shared.module.ts
var SharedModule = class _SharedModule {
  static {
    this.\u0275fac = function SharedModule_Factory(t) {
      return new (t || _SharedModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _SharedModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule
    ] });
  }
};

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  constructor() {
    this.title = "City Air Cooling Services";
  }
  static {
    this.\u0275fac = function AppComponent_Factory(t) {
      return new (t || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 4, vars: 0, template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "app-header");
        \u0275\u0275elementStart(1, "main");
        \u0275\u0275element(2, "router-outlet");
        \u0275\u0275elementEnd();
        \u0275\u0275element(3, "app-footer");
      }
    }, dependencies: [RouterOutlet, HeaderComponent, FooterComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\nmain[_ngcontent-%COMP%] {\n  flex: 1;\n  padding-top: 80px;\n}\napp-header[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n}\napp-footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n}\n/*# sourceMappingURL=app.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 37 });
})();

// src/app/app.module.ts
var AppModule = class _AppModule {
  static {
    this.\u0275fac = function AppModule_Factory(t) {
      return new (t || _AppModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppModule, bootstrap: [AppComponent] });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      CoreModule,
      SharedModule
    ] });
  }
};

// src/main.ts
platformBrowser().bootstrapModule(AppModule).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
