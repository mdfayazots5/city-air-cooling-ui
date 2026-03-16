import {
  EventTrackingService
} from "./chunk-FZMCAFQB.js";
import {
  ActivatedRoute,
  ApiService,
  CommonModule,
  ConfigService,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgSelectOption,
  ReactiveFormsModule,
  RequiredValidator,
  RouterLink,
  RouterModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-EWJTCRSA.js";

// src/app/modules/public-site/home/home.component.ts
var _c0 = () => [1, 2, 3, 4, 5];
function HomeComponent_div_19_li_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const feature_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(feature_r1);
  }
}
function HomeComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ul");
    \u0275\u0275template(6, HomeComponent_div_19_li_6_Template, 2, 1, "li", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 32);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "a", 33);
    \u0275\u0275text(10, "Book Now");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const service_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r2.shortDescription);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", service_r2.features.slice(0, 3));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r2.price);
  }
}
function HomeComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const feature_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(feature_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(feature_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(feature_r3.description);
  }
}
function HomeComponent_div_57_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "\u2605");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_div_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 37);
    \u0275\u0275template(2, HomeComponent_div_57_span_2_Template, 2, 0, "span", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 40)(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const testimonial_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(4, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1('"', testimonial_r4.text, '"');
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(testimonial_r4.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(", ", testimonial_r4.location, "");
  }
}
function HomeComponent_li_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const area_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(area_r5.name);
  }
}
var HomeComponent = class _HomeComponent {
  constructor(configService, eventTrackingService) {
    this.configService = configService;
    this.eventTrackingService = eventTrackingService;
    this.services = [];
    this.features = [];
    this.testimonials = [];
    this.serviceAreas = [];
    this.callUrl = "";
    this.whatsAppUrl = "";
  }
  ngOnInit() {
    this.business = this.configService.business;
    this.services = this.configService.services;
    this.features = this.configService.features;
    this.testimonials = this.configService.testimonials;
    this.serviceAreas = this.configService.serviceAreas;
    this.callUrl = this.configService.getCallUrl();
    this.whatsAppUrl = this.configService.getWhatsAppUrl();
  }
  onCallClick() {
    this.eventTrackingService.trackCallButton("Call Now (Home)");
  }
  onWhatsAppClick() {
    this.eventTrackingService.trackWhatsAppClick("WhatsApp (Home)");
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(t) {
      return new (t || _HomeComponent)(\u0275\u0275directiveInject(ConfigService), \u0275\u0275directiveInject(EventTrackingService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 98, vars: 13, consts: [[1, "hero"], [1, "hero-bg-effect"], [1, "container"], [1, "hero-buttons"], [1, "btn-primary", "btn-pulse", 3, "click", "href"], ["target", "_blank", 1, "btn-whatsapp", "btn-pulse", 3, "click", "href"], ["id", "services-section", 1, "services-preview"], [1, "animate-on-scroll"], [1, "services-grid"], ["class", "service-card animate-on-scroll", 4, "ngFor", "ngForOf"], ["id", "features-section", 1, "why-choose-us"], [1, "features-grid"], ["class", "feature-card animate-on-scroll", 4, "ngFor", "ngForOf"], ["id", "process-section", 1, "process-steps"], [1, "steps-grid"], [1, "step", "animate-on-scroll"], [1, "step-number"], ["id", "testimonials-section", 1, "testimonials"], [1, "testimonials-grid"], ["class", "testimonial-card animate-on-scroll", 4, "ngFor", "ngForOf"], ["id", "service-areas-section", 1, "service-areas"], [1, "areas-list"], [4, "ngFor", "ngForOf"], ["routerLink", "/service-areas", 1, "btn-secondary", "animate-on-scroll"], ["id", "cta-section", 1, "cta"], [1, "trust-message", "animate-on-scroll"], [1, "btn-primary", "btn-pulse", "animate-on-scroll", 3, "click", "href"], ["id", "contact-section", 1, "contact-preview"], [1, "contact-info", "animate-on-scroll"], [3, "href"], ["target", "_blank", 3, "href"], [1, "service-card", "animate-on-scroll"], [1, "price"], ["routerLink", "/book-service", 1, "btn-secondary"], [1, "feature-card", "animate-on-scroll"], [1, "feature-icon"], [1, "testimonial-card", "animate-on-scroll"], [1, "rating"], ["class", "star", 4, "ngFor", "ngForOf"], [1, "text"], [1, "author"], [1, "star"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "AC Not Cooling?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h2");
        \u0275\u0275text(6, "Fast AC Repair in Hyderabad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p");
        \u0275\u0275text(8, "Same Day Service by Experienced Technicians");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 3)(10, "a", 4);
        \u0275\u0275listener("click", function HomeComponent_Template_a_click_10_listener() {
          return ctx.onCallClick();
        });
        \u0275\u0275text(11, "Call Now");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "a", 5);
        \u0275\u0275listener("click", function HomeComponent_Template_a_click_12_listener() {
          return ctx.onWhatsAppClick();
        });
        \u0275\u0275text(13, "WhatsApp");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(14, "section", 6)(15, "div", 2)(16, "h2", 7);
        \u0275\u0275text(17, "Our Services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 8);
        \u0275\u0275template(19, HomeComponent_div_19_Template, 11, 4, "div", 9);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(20, "section", 10)(21, "div", 2)(22, "h2", 7);
        \u0275\u0275text(23, "Why Choose Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 11);
        \u0275\u0275template(25, HomeComponent_div_25_Template, 7, 3, "div", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(26, "section", 13)(27, "div", 2)(28, "h2", 7);
        \u0275\u0275text(29, "How It Works");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "div", 14)(31, "div", 15)(32, "div", 16);
        \u0275\u0275text(33, "1");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "h3");
        \u0275\u0275text(35, "Contact Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "p");
        \u0275\u0275text(37, "Call us or fill the booking form to request service");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "div", 15)(39, "div", 16);
        \u0275\u0275text(40, "2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "h3");
        \u0275\u0275text(42, "Technician Arrives");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "p");
        \u0275\u0275text(44, "Our experienced technician visits your location");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(45, "div", 15)(46, "div", 16);
        \u0275\u0275text(47, "3");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "h3");
        \u0275\u0275text(49, "AC Repaired");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "p");
        \u0275\u0275text(51, "We diagnose and fix your AC on the same day");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(52, "section", 17)(53, "div", 2)(54, "h2", 7);
        \u0275\u0275text(55, "What Our Customers Say");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "div", 18);
        \u0275\u0275template(57, HomeComponent_div_57_Template, 9, 5, "div", 19);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(58, "section", 20)(59, "div", 2)(60, "h2", 7);
        \u0275\u0275text(61, "Service Areas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "p", 7);
        \u0275\u0275text(63, "We provide AC services across Hyderabad including:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "ul", 21);
        \u0275\u0275template(65, HomeComponent_li_65_Template, 2, 1, "li", 22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "a", 23);
        \u0275\u0275text(67, "View All Areas");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(68, "section", 24)(69, "div", 2)(70, "h2", 7);
        \u0275\u0275text(71, "Need AC Service?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(72, "p", 7);
        \u0275\u0275text(73, "Call Now for Fast AC Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "p", 25);
        \u0275\u0275text(75, "Trusted by hundreds of homeowners in Hyderabad");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(76, "a", 26);
        \u0275\u0275listener("click", function HomeComponent_Template_a_click_76_listener() {
          return ctx.onCallClick();
        });
        \u0275\u0275text(77, "Call Now");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(78, "section", 27)(79, "div", 2)(80, "h2", 7);
        \u0275\u0275text(81, "Contact Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(82, "div", 28)(83, "p")(84, "strong");
        \u0275\u0275text(85, "Phone:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(86, "a", 29);
        \u0275\u0275text(87);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(88, "p")(89, "strong");
        \u0275\u0275text(90, "WhatsApp:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(91, "a", 30);
        \u0275\u0275text(92);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(93, "p")(94, "strong");
        \u0275\u0275text(95, "Email:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(96, "a", 29);
        \u0275\u0275text(97);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("href", ctx.callUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance(2);
        \u0275\u0275property("href", ctx.whatsAppUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngForOf", ctx.services);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngForOf", ctx.features);
        \u0275\u0275advance(32);
        \u0275\u0275property("ngForOf", ctx.testimonials);
        \u0275\u0275advance(8);
        \u0275\u0275property("ngForOf", ctx.serviceAreas);
        \u0275\u0275advance(11);
        \u0275\u0275property("href", ctx.callUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance(10);
        \u0275\u0275property("href", ctx.callUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.business.phone);
        \u0275\u0275advance(4);
        \u0275\u0275property("href", ctx.whatsAppUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.business.phone);
        \u0275\u0275advance(4);
        \u0275\u0275property("href", "mailto:" + ctx.business.email, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.business.email);
      }
    }, dependencies: [NgForOf, RouterLink], styles: [`

.hero[_ngcontent-%COMP%] {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  position: relative;
  overflow: hidden;
}
.hero-bg-effect[_ngcontent-%COMP%] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
}
.hero[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {
  position: relative;
  z-index: 1;
}
.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: 3.5rem;
  color: white;
  margin-bottom: 0.5rem;
}
.hero[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
}
.hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}
.hero-buttons[_ngcontent-%COMP%] {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.btn-primary[_ngcontent-%COMP%], .btn-whatsapp[_ngcontent-%COMP%] {
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
}
.btn-primary[_ngcontent-%COMP%] {
  background: white;
  color: #667eea;
}
.btn-primary[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.btn-whatsapp[_ngcontent-%COMP%] {
  background: #25d366;
  color: white;
}
.btn-whatsapp[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(37, 211, 102, 0.3);
}
.services-preview[_ngcontent-%COMP%] {
  padding: 5rem 0;
  background: #f8f9fa;
}
.services-preview[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}
.services-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
.service-card[_ngcontent-%COMP%] {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}
.service-card[_ngcontent-%COMP%]:hover {
  transform: translateY(-5px);
}
.service-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  color: #333;
  margin-bottom: 0.5rem;
}
.service-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
.service-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
  padding: 0.25rem 0;
  color: #666;
}
.service-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {
  content: "\\2713  ";
  color: #25d366;
}
.price[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #1a73e8;
  font-size: 1.1rem;
}
.why-choose-us[_ngcontent-%COMP%] {
  padding: 5rem 0;
}
.why-choose-us[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}
.features-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
.feature-card[_ngcontent-%COMP%] {
  text-align: center;
  padding: 2rem;
}
.feature-icon[_ngcontent-%COMP%] {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.feature-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  margin-bottom: 0.5rem;
}
.process-steps[_ngcontent-%COMP%] {
  padding: 5rem 0;
  background: #f8f9fa;
}
.process-steps[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}
.steps-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.step[_ngcontent-%COMP%] {
  text-align: center;
  padding: 2rem;
}
.step-number[_ngcontent-%COMP%] {
  width: 60px;
  height: 60px;
  background: #1a73e8;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1rem;
}
.testimonials[_ngcontent-%COMP%] {
  padding: 5rem 0;
}
.testimonials[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}
.testimonials-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.testimonial-card[_ngcontent-%COMP%] {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.rating[_ngcontent-%COMP%]   .star[_ngcontent-%COMP%] {
  color: #ffc107;
}
.testimonial-card[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {
  font-style: italic;
  color: #666;
  margin: 1rem 0;
}
.testimonial-card[_ngcontent-%COMP%]   .author[_ngcontent-%COMP%] {
  color: #333;
}
.service-areas[_ngcontent-%COMP%] {
  padding: 5rem 0;
  background: #f8f9fa;
  text-align: center;
}
.service-areas[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin-bottom: 1rem;
  font-size: 2.5rem;
}
.areas-list[_ngcontent-%COMP%] {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}
.areas-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.cta[_ngcontent-%COMP%] {
  padding: 5rem 0;
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  text-align: center;
  color: white;
}
.cta[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin-bottom: 1rem;
}
.trust-message[_ngcontent-%COMP%] {
  margin: 1rem 0 2rem;
  opacity: 0.9;
}
.contact-preview[_ngcontent-%COMP%] {
  padding: 5rem 0;
  text-align: center;
}
.contact-preview[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
  margin-bottom: 2rem;
  font-size: 2.5rem;
}
.contact-info[_ngcontent-%COMP%] {
  font-size: 1.1rem;
}
.contact-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  margin: 0.5rem 0;
}
.contact-info[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: #1a73e8;
}
.btn-secondary[_ngcontent-%COMP%] {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #1a73e8;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s;
}
.btn-secondary[_ngcontent-%COMP%]:hover {
  background: #1557b0;
}
.animate-on-scroll[_ngcontent-%COMP%] {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}
.animate-on-scroll.visible[_ngcontent-%COMP%] {
  opacity: 1;
  transform: translateY(0);
}
.container[_ngcontent-%COMP%] {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
/*# sourceMappingURL=home.component.css.map */`] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src\\app\\modules\\public-site\\home\\home.component.ts", lineNumber: 473 });
})();

// src/app/modules/public-site/services/services.component.ts
var _c02 = (a0) => ({ service: a0 });
function ServicesComponent_div_9_li_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const feature_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(feature_r1);
  }
}
function ServicesComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ul");
    \u0275\u0275template(6, ServicesComponent_div_9_li_6_Template, 2, 1, "li", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 9)(8, "strong");
    \u0275\u0275text(9, "Price:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "a", 10);
    \u0275\u0275text(12, "Book Now");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const service_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(service_r2.description);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", service_r2.features);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", service_r2.price, "");
    \u0275\u0275advance();
    \u0275\u0275property("queryParams", \u0275\u0275pureFunction1(5, _c02, service_r2.id));
  }
}
var ServicesComponent = class _ServicesComponent {
  constructor(configService) {
    this.configService = configService;
    this.services = [];
    this.callUrl = "";
  }
  ngOnInit() {
    this.services = this.configService.services;
    this.callUrl = this.configService.getCallUrl();
  }
  static {
    this.\u0275fac = function ServicesComponent_Factory(t) {
      return new (t || _ServicesComponent)(\u0275\u0275directiveInject(ConfigService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ServicesComponent, selectors: [["app-services"]], decls: 18, vars: 2, consts: [[1, "page-hero"], [1, "hero-bg-effect"], [1, "container"], [1, "services-detail"], ["class", "service-item", 4, "ngFor", "ngForOf"], [1, "cta"], [1, "btn-primary", "btn-pulse", 3, "href"], [1, "service-item"], [4, "ngFor", "ngForOf"], [1, "price"], ["routerLink", "/book-service", 1, "btn-primary", 3, "queryParams"]], template: function ServicesComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "Our Services");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Professional AC Services in Hyderabad");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "section", 3)(8, "div", 2);
        \u0275\u0275template(9, ServicesComponent_div_9_Template, 13, 7, "div", 4);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "section", 5)(11, "div", 2)(12, "h2");
        \u0275\u0275text(13, "Need AC Service?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "p");
        \u0275\u0275text(15, "Call us today for fast and reliable service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "a", 6);
        \u0275\u0275text(17, "Call Now");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275property("ngForOf", ctx.services);
        \u0275\u0275advance(7);
        \u0275\u0275property("href", ctx.callUrl, \u0275\u0275sanitizeUrl);
      }
    }, dependencies: [NgForOf, RouterLink], styles: ['\n\n.page-hero[_ngcontent-%COMP%] {\n  min-height: 40vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  position: relative;\n  padding-top: 80px;\n}\n.page-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 0.5rem;\n}\n.page-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  opacity: 0.9;\n}\n.services-detail[_ngcontent-%COMP%] {\n  padding: 4rem 0;\n}\n.service-item[_ngcontent-%COMP%] {\n  background: white;\n  padding: 2rem;\n  margin-bottom: 2rem;\n  border-radius: 10px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n}\n.service-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #333;\n  margin-bottom: 1rem;\n}\n.service-item[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 1rem 0;\n}\n.service-item[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 0.5rem 0;\n  color: #666;\n}\n.service-item[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2713  ";\n  color: #25d366;\n}\n.price[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: #1a73e8;\n  margin: 1rem 0;\n}\n.cta[_ngcontent-%COMP%] {\n  padding: 4rem 0;\n  background: #f8f9fa;\n  text-align: center;\n}\n.cta[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.cta[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  color: #666;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1rem 2rem;\n  background: #1a73e8;\n  color: white;\n  text-decoration: none;\n  border-radius: 5px;\n  font-weight: 600;\n  transition: all 0.3s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #1557b0;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n/*# sourceMappingURL=services.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ServicesComponent, { className: "ServicesComponent", filePath: "src\\app\\modules\\public-site\\services\\services.component.ts", lineNumber: 137 });
})();

// src/app/modules/public-site/booking/booking.component.ts
function BookingComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275text(1, " Name is required ");
    \u0275\u0275elementEnd();
  }
}
function BookingComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275text(1, " Phone number is required ");
    \u0275\u0275elementEnd();
  }
}
var BookingComponent = class _BookingComponent {
  constructor(fb, route, configService, apiService, eventTrackingService) {
    this.fb = fb;
    this.route = route;
    this.configService = configService;
    this.apiService = apiService;
    this.eventTrackingService = eventTrackingService;
    this.isSubmitting = false;
    this.callUrl = "";
    this.whatsAppUrl = "";
    this.bookingForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      email: [""],
      serviceType: ["", Validators.required],
      acBrand: [""],
      issue: [""],
      address: ["", Validators.required],
      preferredDate: [""]
    });
  }
  ngOnInit() {
    this.callUrl = this.configService.getCallUrl();
    this.whatsAppUrl = this.configService.getWhatsAppUrl();
    this.eventTrackingService.trackBookingFormOpened();
    this.route.queryParams.subscribe((params) => {
      if (params["service"]) {
        this.bookingForm.patchValue({ serviceType: params["service"] });
      }
    });
  }
  onSubmit() {
    if (this.bookingForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    const bookingData = this.bookingForm.value;
    this.apiService.submitBooking(bookingData).subscribe({
      next: (response) => {
        this.eventTrackingService.trackBookingSubmitted(bookingData);
        alert("Your service request has been submitted successfully! We will contact you shortly.");
        this.bookingForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error("Booking error:", error);
        alert("There was an error submitting your booking. Please try again or call us directly.");
        this.isSubmitting = false;
      }
    });
  }
  static {
    this.\u0275fac = function BookingComponent_Factory(t) {
      return new (t || _BookingComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ConfigService), \u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(EventTrackingService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BookingComponent, selectors: [["app-booking"]], decls: 102, vars: 7, consts: [[1, "page-hero"], [1, "hero-bg-effect"], [1, "container"], [1, "booking-section"], [1, "booking-form-container"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "name"], ["type", "text", "id", "name", "formControlName", "name", "required", ""], ["class", "error", 4, "ngIf"], ["for", "phone"], ["type", "tel", "id", "phone", "formControlName", "phone", "required", ""], ["for", "email"], ["type", "email", "id", "email", "formControlName", "email"], ["for", "service"], ["id", "service", "formControlName", "serviceType", "required", ""], ["value", ""], ["value", "repair"], ["value", "installation"], ["value", "maintenance"], ["value", "gas"], ["value", "amc"], ["for", "brand"], ["id", "brand", "formControlName", "acBrand"], ["value", "lg"], ["value", "samsung"], ["value", "daikin"], ["value", "hitachi"], ["value", "voltas"], ["value", "blue-star"], ["value", "carrier"], ["value", "panasonic"], ["value", "mitsubishi"], ["value", "other"], ["for", "issue"], ["id", "issue", "formControlName", "issue", "rows", "4", "placeholder", "Please describe the problem with your AC..."], ["for", "address"], ["id", "address", "formControlName", "address", "rows", "3", "required", ""], ["for", "date"], ["type", "date", "id", "date", "formControlName", "preferredDate"], [1, "form-actions"], ["type", "submit", 1, "btn-primary", 3, "disabled"], [1, "alternative-booking"], [1, "alt-buttons"], [1, "btn-primary", "btn-call", 3, "href"], [1, "btn-whatsapp", 3, "href"], [1, "error"]], template: function BookingComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "Book a Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Schedule Your AC Service");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "section", 3)(8, "div", 2)(9, "div", 4)(10, "h2");
        \u0275\u0275text(11, "Book AC Service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "p");
        \u0275\u0275text(13, "Fill out the form below and we will get back to you shortly");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "form", 5);
        \u0275\u0275listener("ngSubmit", function BookingComponent_Template_form_ngSubmit_14_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(15, "fieldset")(16, "legend");
        \u0275\u0275text(17, "Personal Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 6)(19, "label", 7);
        \u0275\u0275text(20, "Full Name *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(21, "input", 8);
        \u0275\u0275template(22, BookingComponent_div_22_Template, 2, 0, "div", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "div", 6)(24, "label", 10);
        \u0275\u0275text(25, "Phone Number *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(26, "input", 11);
        \u0275\u0275template(27, BookingComponent_div_27_Template, 2, 0, "div", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "div", 6)(29, "label", 12);
        \u0275\u0275text(30, "Email Address");
        \u0275\u0275elementEnd();
        \u0275\u0275element(31, "input", 13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "fieldset")(33, "legend");
        \u0275\u0275text(34, "Service Details");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "div", 6)(36, "label", 14);
        \u0275\u0275text(37, "Service Type *");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "select", 15)(39, "option", 16);
        \u0275\u0275text(40, "Select a service");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "option", 17);
        \u0275\u0275text(42, "AC Repair");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "option", 18);
        \u0275\u0275text(44, "AC Installation");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "option", 19);
        \u0275\u0275text(46, "AC Maintenance");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "option", 20);
        \u0275\u0275text(48, "Gas Refilling");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "option", 21);
        \u0275\u0275text(50, "AMC (Annual Maintenance Contract)");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(51, "div", 6)(52, "label", 22);
        \u0275\u0275text(53, "AC Brand");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "select", 23)(55, "option", 16);
        \u0275\u0275text(56, "Select brand");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "option", 24);
        \u0275\u0275text(58, "LG");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "option", 25);
        \u0275\u0275text(60, "Samsung");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "option", 26);
        \u0275\u0275text(62, "Daikin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(63, "option", 27);
        \u0275\u0275text(64, "Hitachi");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "option", 28);
        \u0275\u0275text(66, "Voltas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(67, "option", 29);
        \u0275\u0275text(68, "Blue Star");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(69, "option", 30);
        \u0275\u0275text(70, "Carrier");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(71, "option", 31);
        \u0275\u0275text(72, "Panasonic");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "option", 32);
        \u0275\u0275text(74, "Mitsubishi");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(75, "option", 33);
        \u0275\u0275text(76, "Other");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(77, "div", 6)(78, "label", 34);
        \u0275\u0275text(79, "Describe the Issue");
        \u0275\u0275elementEnd();
        \u0275\u0275element(80, "textarea", 35);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(81, "div", 6)(82, "label", 36);
        \u0275\u0275text(83, "Service Address *");
        \u0275\u0275elementEnd();
        \u0275\u0275element(84, "textarea", 37);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(85, "div", 6)(86, "label", 38);
        \u0275\u0275text(87, "Preferred Date");
        \u0275\u0275elementEnd();
        \u0275\u0275element(88, "input", 39);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(89, "div", 40)(90, "button", 41);
        \u0275\u0275text(91);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(92, "div", 42)(93, "h3");
        \u0275\u0275text(94, "Other Ways to Book");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(95, "p");
        \u0275\u0275text(96, "You can also book your service through:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(97, "div", 43)(98, "a", 44);
        \u0275\u0275text(99, "Call Now");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(100, "a", 45);
        \u0275\u0275text(101, "WhatsApp");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        \u0275\u0275advance(14);
        \u0275\u0275property("formGroup", ctx.bookingForm);
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ((tmp_1_0 = ctx.bookingForm.get("name")) == null ? null : tmp_1_0.touched) && ((tmp_1_0 = ctx.bookingForm.get("name")) == null ? null : tmp_1_0.invalid));
        \u0275\u0275advance(5);
        \u0275\u0275property("ngIf", ((tmp_2_0 = ctx.bookingForm.get("phone")) == null ? null : tmp_2_0.touched) && ((tmp_2_0 = ctx.bookingForm.get("phone")) == null ? null : tmp_2_0.invalid));
        \u0275\u0275advance(63);
        \u0275\u0275property("disabled", ctx.bookingForm.invalid || ctx.isSubmitting);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isSubmitting ? "Submitting..." : "Book Now", " ");
        \u0275\u0275advance(7);
        \u0275\u0275property("href", ctx.callUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance(2);
        \u0275\u0275property("href", ctx.whatsAppUrl, \u0275\u0275sanitizeUrl);
      }
    }, dependencies: [NgIf, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName], styles: ["\n\n.page-hero[_ngcontent-%COMP%] {\n  min-height: 40vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  position: relative;\n  padding-top: 80px;\n}\n.page-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 0.5rem;\n}\n.booking-section[_ngcontent-%COMP%] {\n  padding: 4rem 0;\n}\n.booking-form-container[_ngcontent-%COMP%] {\n  max-width: 700px;\n  margin: 0 auto 3rem;\n}\n.booking-form-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 0.5rem;\n}\n.booking-form-container[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #666;\n  margin-bottom: 2rem;\n}\nform[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%] {\n  border: 1px solid #ddd;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  border-radius: 5px;\n}\nform[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n  padding: 0 0.5rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  color: #333;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #ddd;\n  border-radius: 5px;\n  font-size: 1rem;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus, .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #1a73e8;\n}\n.error[_ngcontent-%COMP%] {\n  color: #dc3545;\n  font-size: 0.875rem;\n  margin-top: 0.25rem;\n}\n.form-actions[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 1rem 2rem;\n  background: #1a73e8;\n  color: white;\n  border: none;\n  border-radius: 5px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1557b0;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.alternative-booking[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  background: #f8f9fa;\n  border-radius: 10px;\n}\n.alt-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n  margin-top: 1rem;\n}\n.btn-call[_ngcontent-%COMP%] {\n  background: #1a73e8;\n  color: white;\n  padding: 1rem 2rem;\n  text-decoration: none;\n  border-radius: 5px;\n  font-weight: 600;\n}\n.btn-whatsapp[_ngcontent-%COMP%] {\n  background: #25d366;\n  color: white;\n  padding: 1rem 2rem;\n  text-decoration: none;\n  border-radius: 5px;\n  font-weight: 600;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n/*# sourceMappingURL=booking.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BookingComponent, { className: "BookingComponent", filePath: "src\\app\\modules\\public-site\\booking\\booking.component.ts", lineNumber: 259 });
})();

// src/app/modules/public-site/contact/contact.component.ts
var ContactComponent = class _ContactComponent {
  constructor(fb, configService, apiService, eventTrackingService) {
    this.fb = fb;
    this.configService = configService;
    this.apiService = apiService;
    this.eventTrackingService = eventTrackingService;
    this.isSubmitting = false;
    this.callUrl = "";
    this.whatsAppUrl = "";
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      service: ["repair"],
      message: [""]
    });
  }
  ngOnInit() {
    this.business = this.configService.business;
    this.callUrl = this.configService.getCallUrl();
    this.whatsAppUrl = this.configService.getWhatsAppUrl();
    this.eventTrackingService.trackContactFormOpened();
  }
  onSubmit() {
    if (this.contactForm.invalid)
      return;
    this.isSubmitting = true;
    this.apiService.createCustomer(this.contactForm.value).subscribe({
      next: () => {
        this.eventTrackingService.trackContactFormSubmitted();
        alert("Message sent successfully! We will contact you shortly.");
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: () => {
        alert("Message sent! We will contact you shortly.");
        this.contactForm.reset();
        this.isSubmitting = false;
      }
    });
  }
  static {
    this.\u0275fac = function ContactComponent_Factory(t) {
      return new (t || _ContactComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ConfigService), \u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(EventTrackingService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContactComponent, selectors: [["app-contact"]], decls: 67, vars: 10, consts: [[1, "page-hero"], [1, "hero-bg-effect"], [1, "container"], [1, "contact-section"], [1, "contact-grid"], [1, "contact-info"], [1, "info-item"], [3, "href"], ["target", "_blank", 3, "href"], [1, "contact-form"], [3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "name"], ["type", "text", "id", "name", "formControlName", "name", "required", ""], ["for", "phone"], ["type", "tel", "id", "phone", "formControlName", "phone", "required", ""], ["for", "service"], ["id", "service", "formControlName", "service"], ["value", "repair"], ["value", "installation"], ["value", "maintenance"], ["value", "gas"], ["value", "amc"], ["value", "other"], ["for", "message"], ["id", "message", "formControlName", "message", "rows", "5"], ["type", "submit", 1, "btn-primary", 3, "disabled"]], template: function ContactComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "Contact Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Get in Touch for AC Services");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "section", 3)(8, "div", 2)(9, "div", 4)(10, "div", 5)(11, "h2");
        \u0275\u0275text(12, "Get In Touch");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 6)(14, "h3");
        \u0275\u0275text(15, "Phone");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "a", 7);
        \u0275\u0275text(17);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 6)(19, "h3");
        \u0275\u0275text(20, "WhatsApp");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "a", 8);
        \u0275\u0275text(22);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "div", 6)(24, "h3");
        \u0275\u0275text(25, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "a", 7);
        \u0275\u0275text(27);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "div", 6)(29, "h3");
        \u0275\u0275text(30, "Service Area");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "p");
        \u0275\u0275text(32);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(33, "div", 9)(34, "h2");
        \u0275\u0275text(35, "Send Us a Message");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "form", 10);
        \u0275\u0275listener("ngSubmit", function ContactComponent_Template_form_ngSubmit_36_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(37, "div", 11)(38, "label", 12);
        \u0275\u0275text(39, "Your Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(40, "input", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "div", 11)(42, "label", 14);
        \u0275\u0275text(43, "Phone Number");
        \u0275\u0275elementEnd();
        \u0275\u0275element(44, "input", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "div", 11)(46, "label", 16);
        \u0275\u0275text(47, "Service Required");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "select", 17)(49, "option", 18);
        \u0275\u0275text(50, "AC Repair");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "option", 19);
        \u0275\u0275text(52, "AC Installation");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "option", 20);
        \u0275\u0275text(54, "AC Maintenance");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "option", 21);
        \u0275\u0275text(56, "Gas Refilling");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(57, "option", 22);
        \u0275\u0275text(58, "AMC");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "option", 23);
        \u0275\u0275text(60, "Other");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(61, "div", 11)(62, "label", 24);
        \u0275\u0275text(63, "Message");
        \u0275\u0275elementEnd();
        \u0275\u0275element(64, "textarea", 25);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(65, "button", 26);
        \u0275\u0275text(66);
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(16);
        \u0275\u0275property("href", ctx.callUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.business.phone);
        \u0275\u0275advance(4);
        \u0275\u0275property("href", ctx.whatsAppUrl, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.business.phone);
        \u0275\u0275advance(4);
        \u0275\u0275property("href", "mailto:" + ctx.business.email, \u0275\u0275sanitizeUrl);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx.business.email);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.business.address);
        \u0275\u0275advance(4);
        \u0275\u0275property("formGroup", ctx.contactForm);
        \u0275\u0275advance(29);
        \u0275\u0275property("disabled", ctx.contactForm.invalid || ctx.isSubmitting);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isSubmitting ? "Sending..." : "Send Message", " ");
      }
    }, dependencies: [\u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName], styles: ["\n\n.page-hero[_ngcontent-%COMP%] {\n  min-height: 40vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  position: relative;\n  padding-top: 80px;\n}\n.contact-section[_ngcontent-%COMP%] {\n  padding: 4rem 0;\n}\n.contact-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 4rem;\n}\n.contact-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.info-item[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.info-item[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n  margin-bottom: 0.25rem;\n}\n.info-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #1a73e8;\n  font-size: 1.1rem;\n  text-decoration: none;\n}\n.contact-form[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #ddd;\n  border-radius: 5px;\n  font-size: 1rem;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 1rem 2rem;\n  background: #1a73e8;\n  color: white;\n  border: none;\n  border-radius: 5px;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1557b0;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n/*# sourceMappingURL=contact.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContactComponent, { className: "ContactComponent", filePath: "src\\app\\modules\\public-site\\contact\\contact.component.ts", lineNumber: 164 });
})();

// src/app/modules/public-site/about/about.component.ts
function AboutComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const feature_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(feature_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(feature_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(feature_r1.description);
  }
}
var AboutComponent = class _AboutComponent {
  constructor(configService) {
    this.configService = configService;
    this.features = [];
  }
  ngOnInit() {
    this.business = this.configService.business;
    this.features = this.configService.features;
  }
  static {
    this.\u0275fac = function AboutComponent_Factory(t) {
      return new (t || _AboutComponent)(\u0275\u0275directiveInject(ConfigService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AboutComponent, selectors: [["app-about"]], decls: 40, vars: 4, consts: [[1, "page-hero"], [1, "hero-bg-effect"], [1, "container"], [1, "about-content"], [1, "about-section"], [1, "stats-grid"], [1, "stat-card"], [1, "why-choose"], [1, "features-grid"], ["class", "feature", 4, "ngFor", "ngForOf"], [1, "feature"], [1, "icon"]], template: function AboutComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "About Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Your Trusted AC Service Partner in Hyderabad");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "section", 3)(8, "div", 2)(9, "div", 4)(10, "h2");
        \u0275\u0275text(11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "p");
        \u0275\u0275text(13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 5)(15, "div", 6)(16, "h3");
        \u0275\u0275text(17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "p");
        \u0275\u0275text(19, "Years Experience");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 6)(21, "h3");
        \u0275\u0275text(22, "5000+");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "p");
        \u0275\u0275text(24, "Happy Customers");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "div", 6)(26, "h3");
        \u0275\u0275text(27, "1000+");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "p");
        \u0275\u0275text(29, "AC Services");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "div", 6)(31, "h3");
        \u0275\u0275text(32, "24/7");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "p");
        \u0275\u0275text(34, "Emergency Service");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(35, "div", 7)(36, "h2");
        \u0275\u0275text(37, "Why Choose Us");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "div", 8);
        \u0275\u0275template(39, AboutComponent_div_39_Template, 7, 3, "div", 9);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275textInterpolate1("Welcome to ", ctx.business.name, "");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.business.description);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1("", ctx.business.experience, "+");
        \u0275\u0275advance(22);
        \u0275\u0275property("ngForOf", ctx.features);
      }
    }, dependencies: [NgForOf], styles: ["\n\n.page-hero[_ngcontent-%COMP%] {\n  min-height: 40vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  position: relative;\n  padding-top: 80px;\n}\n.about-content[_ngcontent-%COMP%] {\n  padding: 4rem 0;\n}\n.about-section[_ngcontent-%COMP%] {\n  text-align: center;\n  max-width: 800px;\n  margin: 0 auto 3rem;\n}\n.about-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 2rem;\n  margin-bottom: 4rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  background: white;\n  border-radius: 10px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n}\n.stat-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: #1a73e8;\n  margin-bottom: 0.5rem;\n}\n.why-choose[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.features-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 2rem;\n}\n.feature[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n}\n.icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 1rem;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n/*# sourceMappingURL=about.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AboutComponent, { className: "AboutComponent", filePath: "src\\app\\modules\\public-site\\about\\about.component.ts", lineNumber: 130 });
})();

// src/app/modules/public-site/faq/faq.component.ts
function FaqComponent_div_10_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const faq_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(faq_r4.answer);
  }
}
function FaqComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275listener("click", function FaqComponent_div_10_Template_div_click_0_listener() {
      const i_r2 = \u0275\u0275restoreView(_r1).index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleFaq(i_r2));
    });
    \u0275\u0275elementStart(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, FaqComponent_div_10_div_3_Template, 3, 1, "div", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const faq_r4 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r2.activeIndex === i_r2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(faq_r4.question);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.activeIndex === i_r2);
  }
}
var FaqComponent = class _FaqComponent {
  constructor(configService) {
    this.configService = configService;
    this.faqs = [];
    this.activeIndex = -1;
  }
  ngOnInit() {
    this.faqs = this.configService.faqs;
  }
  toggleFaq(index) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }
  static {
    this.\u0275fac = function FaqComponent_Factory(t) {
      return new (t || _FaqComponent)(\u0275\u0275directiveInject(ConfigService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FaqComponent, selectors: [["app-faq"]], decls: 11, vars: 1, consts: [[1, "page-hero"], [1, "hero-bg-effect"], [1, "container"], [1, "faq-section"], [1, "faq-list"], ["class", "faq-item", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "faq-item", 3, "click"], ["class", "faq-answer", 4, "ngIf"], [1, "faq-answer"]], template: function FaqComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "Frequently Asked Questions");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "Common questions about our AC services");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "section", 3)(8, "div", 2)(9, "div", 4);
        \u0275\u0275template(10, FaqComponent_div_10_Template, 4, 4, "div", 5);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("ngForOf", ctx.faqs);
      }
    }, dependencies: [NgForOf, NgIf], styles: ["\n\n.page-hero[_ngcontent-%COMP%] {\n  min-height: 40vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  position: relative;\n  padding-top: 80px;\n}\n.faq-section[_ngcontent-%COMP%] {\n  padding: 4rem 0;\n}\n.faq-list[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n}\n.faq-item[_ngcontent-%COMP%] {\n  background: white;\n  margin-bottom: 1rem;\n  border-radius: 5px;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.faq-item[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  margin: 0;\n  color: #333;\n}\n.faq-item.active[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #1a73e8;\n}\n.faq-answer[_ngcontent-%COMP%] {\n  padding: 0 1.5rem 1.5rem;\n  color: #666;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n/*# sourceMappingURL=faq.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FaqComponent, { className: "FaqComponent", filePath: "src\\app\\modules\\public-site\\faq\\faq.component.ts", lineNumber: 84 });
})();

// src/app/modules/public-site/service-areas/service-areas.component.ts
var _c03 = (a0) => ({ area: a0 });
function ServiceAreasComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 10);
    \u0275\u0275text(6, "Book Now");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const area_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(area_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(area_r1.keyword);
    \u0275\u0275advance();
    \u0275\u0275property("queryParams", \u0275\u0275pureFunction1(3, _c03, area_r1.name));
  }
}
var ServiceAreasComponent = class _ServiceAreasComponent {
  constructor(configService) {
    this.configService = configService;
    this.serviceAreas = [];
  }
  ngOnInit() {
    this.serviceAreas = this.configService.serviceAreas;
  }
  static {
    this.\u0275fac = function ServiceAreasComponent_Factory(t) {
      return new (t || _ServiceAreasComponent)(\u0275\u0275directiveInject(ConfigService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ServiceAreasComponent, selectors: [["app-service-areas"]], decls: 21, vars: 1, consts: [[1, "page-hero"], [1, "hero-bg-effect"], [1, "container"], [1, "areas-section"], [1, "intro"], [1, "areas-grid"], ["class", "area-card", 4, "ngFor", "ngForOf"], [1, "cta"], ["routerLink", "/contact", 1, "btn-primary"], [1, "area-card"], ["routerLink", "/book-service", 1, "btn-book", 3, "queryParams"]], template: function ServiceAreasComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "h1");
        \u0275\u0275text(4, "Service Areas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p");
        \u0275\u0275text(6, "We provide AC services across Hyderabad");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "section", 3)(8, "div", 2)(9, "p", 4);
        \u0275\u0275text(10, "We are proud to serve customers across Hyderabad and surrounding areas. Our expert technicians are available in the following locations:");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 5);
        \u0275\u0275template(12, ServiceAreasComponent_div_12_Template, 7, 5, "div", 6);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(13, "section", 7)(14, "div", 2)(15, "h2");
        \u0275\u0275text(16, "Don't see your area?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "p");
        \u0275\u0275text(18, "Contact us to check if we service your location");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "a", 8);
        \u0275\u0275text(20, "Contact Us");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(12);
        \u0275\u0275property("ngForOf", ctx.serviceAreas);
      }
    }, dependencies: [NgForOf, RouterLink], styles: ["\n\n.page-hero[_ngcontent-%COMP%] {\n  min-height: 40vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  position: relative;\n  padding-top: 80px;\n}\n.areas-section[_ngcontent-%COMP%] {\n  padding: 4rem 0;\n}\n.intro[_ngcontent-%COMP%] {\n  text-align: center;\n  max-width: 600px;\n  margin: 0 auto 3rem;\n  color: #666;\n}\n.areas-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 1.5rem;\n}\n.area-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1.5rem;\n  border-radius: 10px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  text-align: center;\n}\n.area-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  margin-bottom: 0.5rem;\n}\n.area-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n  margin-bottom: 1rem;\n}\n.btn-book[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.5rem 1rem;\n  background: #1a73e8;\n  color: white;\n  text-decoration: none;\n  border-radius: 5px;\n  font-size: 0.9rem;\n}\n.cta[_ngcontent-%COMP%] {\n  padding: 4rem 0;\n  background: #f8f9fa;\n  text-align: center;\n}\n.cta[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 0.5rem;\n}\n.cta[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  color: #666;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1rem 2rem;\n  background: #1a73e8;\n  color: white;\n  text-decoration: none;\n  border-radius: 5px;\n  font-weight: 600;\n}\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n/*# sourceMappingURL=service-areas.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ServiceAreasComponent, { className: "ServiceAreasComponent", filePath: "src\\app\\modules\\public-site\\service-areas\\service-areas.component.ts", lineNumber: 129 });
})();

// src/app/modules/public-site/public-site.module.ts
var routes = [
  { path: "", component: HomeComponent },
  { path: "services", component: ServicesComponent },
  { path: "book-service", component: BookingComponent },
  { path: "contact", component: ContactComponent },
  { path: "about", component: AboutComponent },
  { path: "faq", component: FaqComponent },
  { path: "service-areas", component: ServiceAreasComponent },
  { path: "**", redirectTo: "" }
];
var PublicSiteModule = class _PublicSiteModule {
  static {
    this.\u0275fac = function PublicSiteModule_Factory(t) {
      return new (t || _PublicSiteModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _PublicSiteModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule
    ] });
  }
};
export {
  PublicSiteModule
};
//# sourceMappingURL=chunk-HRXFD77H.js.map
