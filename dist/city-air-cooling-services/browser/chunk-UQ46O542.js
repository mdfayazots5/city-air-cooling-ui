import {
  ApiService,
  CommonModule,
  ConfigService,
  DatePipe,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  RouterModule,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-EWJTCRSA.js";

// src/app/modules/admin/dashboard/dashboard.component.ts
function DashboardComponent_tr_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const event_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 4, event_r1.date, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(event_r1.eventType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r1.pageUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(event_r1.location || "N/A");
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(apiService) {
    this.apiService = apiService;
    this.stats = {
      visitors: 1250,
      callClicks: 320,
      whatsAppClicks: 180,
      bookings: 45
    };
    this.recentEvents = [];
  }
  ngOnInit() {
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 40, vars: 5, consts: [[1, "dashboard"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-number"], [1, "recent-activity"], [4, "ngFor", "ngForOf"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Admin Dashboard");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1)(4, "div", 2)(5, "h3");
        \u0275\u0275text(6, "Total Visitors");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p", 3);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 2)(10, "h3");
        \u0275\u0275text(11, "Call Clicks");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "p", 3);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 2)(15, "h3");
        \u0275\u0275text(16, "WhatsApp Clicks");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "p", 3);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "div", 2)(20, "h3");
        \u0275\u0275text(21, "Total Bookings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "p", 3);
        \u0275\u0275text(23);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(24, "div", 4)(25, "h2");
        \u0275\u0275text(26, "Recent Activity");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "table")(28, "thead")(29, "tr")(30, "th");
        \u0275\u0275text(31, "Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "th");
        \u0275\u0275text(33, "Event Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "th");
        \u0275\u0275text(35, "Page");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "th");
        \u0275\u0275text(37, "Location");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(38, "tbody");
        \u0275\u0275template(39, DashboardComponent_tr_39_Template, 10, 7, "tr", 5);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.stats.visitors);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.stats.callClicks);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.stats.whatsAppClicks);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.stats.bookings);
        \u0275\u0275advance(16);
        \u0275\u0275property("ngForOf", ctx.recentEvents);
      }
    }, dependencies: [NgForOf, DatePipe], styles: ["\n\n.dashboard[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\nh1[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1.5rem;\n  margin-bottom: 2rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1.5rem;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.stat-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n  margin-bottom: 0.5rem;\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1a73e8;\n}\n.recent-activity[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1.5rem;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  text-align: left;\n  border-bottom: 1px solid #eee;\n}\nth[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  font-weight: 600;\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\modules\\admin\\dashboard\\dashboard.component.ts", lineNumber: 111 });
})();

// src/app/modules/admin/customers/customers.component.ts
function CustomersComponent_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "button", 4);
    \u0275\u0275text(16, "View");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 5);
    \u0275\u0275text(18, "Edit");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const customer_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(customer_r1.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(customer_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(customer_r1.phone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(customer_r1.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(customer_r1.city);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 6, customer_r1.createdAt, "short"));
  }
}
var CustomersComponent = class _CustomersComponent {
  constructor(apiService) {
    this.apiService = apiService;
    this.searchTerm = "";
    this.customers = [];
  }
  ngOnInit() {
    this.loadCustomers();
  }
  loadCustomers() {
    this.apiService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: () => this.customers = []
    });
  }
  static {
    this.\u0275fac = function CustomersComponent_Factory(t) {
      return new (t || _CustomersComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomersComponent, selectors: [["app-customers"]], decls: 24, vars: 2, consts: [[1, "customers-page"], [1, "actions"], ["type", "text", "placeholder", "Search customers...", 3, "ngModelChange", "ngModel"], [4, "ngFor", "ngForOf"], [1, "btn-view"], [1, "btn-edit"]], template: function CustomersComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Customer Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1)(4, "input", 2);
        \u0275\u0275twoWayListener("ngModelChange", function CustomersComponent_Template_input_ngModelChange_4_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "table")(6, "thead")(7, "tr")(8, "th");
        \u0275\u0275text(9, "ID");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "th");
        \u0275\u0275text(11, "Name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "th");
        \u0275\u0275text(13, "Phone");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "th");
        \u0275\u0275text(15, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "th");
        \u0275\u0275text(17, "Location");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "th");
        \u0275\u0275text(19, "Created");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "th");
        \u0275\u0275text(21, "Actions");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(22, "tbody");
        \u0275\u0275template(23, CustomersComponent_tr_23_Template, 19, 9, "tr", 3);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance(19);
        \u0275\u0275property("ngForOf", ctx.customers);
      }
    }, dependencies: [NgForOf, DefaultValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ["\n\n.customers-page[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\nh1[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.actions[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.actions[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  width: 300px;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  background: white;\n  border-radius: 8px;\n  overflow: hidden;\n}\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  text-align: left;\n  border-bottom: 1px solid #eee;\n}\nth[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  font-weight: 600;\n}\n.btn-view[_ngcontent-%COMP%], .btn-edit[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  margin-right: 0.5rem;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.btn-view[_ngcontent-%COMP%] {\n  background: #1a73e8;\n  color: white;\n}\n.btn-edit[_ngcontent-%COMP%] {\n  background: #28a745;\n  color: white;\n}\n/*# sourceMappingURL=customers.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomersComponent, { className: "CustomersComponent", filePath: "src\\app\\modules\\admin\\customers\\customers.component.ts", lineNumber: 100 });
})();

// src/app/modules/admin/service-requests/service-requests.component.ts
function ServiceRequestsComponent_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td")(8, "span", 10);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "button", 11);
    \u0275\u0275text(15, "View");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 12);
    \u0275\u0275text(17, "Update");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const request_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r1.requestNo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r1.customerName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(request_r1.serviceType);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(request_r1.status);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", request_r1.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 7, request_r1.createdAt, "short"));
  }
}
var ServiceRequestsComponent = class _ServiceRequestsComponent {
  constructor(apiService) {
    this.apiService = apiService;
    this.statusFilter = "";
    this.serviceRequests = [];
  }
  ngOnInit() {
    this.loadServiceRequests();
  }
  loadServiceRequests() {
    this.apiService.getServiceRequests().subscribe({
      next: (data) => this.serviceRequests = data,
      error: () => this.serviceRequests = []
    });
  }
  static {
    this.\u0275fac = function ServiceRequestsComponent_Factory(t) {
      return new (t || _ServiceRequestsComponent)(\u0275\u0275directiveInject(ApiService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ServiceRequestsComponent, selectors: [["app-service-requests"]], decls: 34, vars: 2, consts: [[1, "service-requests-page"], [1, "filters"], [3, "ngModelChange", "ngModel"], ["value", ""], ["value", "pending"], ["value", "assigned"], ["value", "in_progress"], ["value", "completed"], ["value", "cancelled"], [4, "ngFor", "ngForOf"], [1, "status-badge"], [1, "btn-view"], [1, "btn-update"]], template: function ServiceRequestsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Service Requests");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1)(4, "select", 2);
        \u0275\u0275twoWayListener("ngModelChange", function ServiceRequestsComponent_Template_select_ngModelChange_4_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
          return $event;
        });
        \u0275\u0275elementStart(5, "option", 3);
        \u0275\u0275text(6, "All Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "option", 4);
        \u0275\u0275text(8, "Pending");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "option", 5);
        \u0275\u0275text(10, "Assigned");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "option", 6);
        \u0275\u0275text(12, "In Progress");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "option", 7);
        \u0275\u0275text(14, "Completed");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "option", 8);
        \u0275\u0275text(16, "Cancelled");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(17, "table")(18, "thead")(19, "tr")(20, "th");
        \u0275\u0275text(21, "Request No");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "th");
        \u0275\u0275text(23, "Customer");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "th");
        \u0275\u0275text(25, "Service Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "th");
        \u0275\u0275text(27, "Status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "th");
        \u0275\u0275text(29, "Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "th");
        \u0275\u0275text(31, "Actions");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(32, "tbody");
        \u0275\u0275template(33, ServiceRequestsComponent_tr_33_Template, 18, 10, "tr", 9);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
        \u0275\u0275advance(29);
        \u0275\u0275property("ngForOf", ctx.serviceRequests);
      }
    }, dependencies: [NgForOf, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ["\n\n.service-requests-page[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\nh1[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.filters[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.filters[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  background: white;\n  border-radius: 8px;\n}\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n  padding: 1rem;\n  text-align: left;\n  border-bottom: 1px solid #eee;\n}\nth[_ngcontent-%COMP%] {\n  background: #f8f9fa;\n  font-weight: 600;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  border-radius: 12px;\n  font-size: 0.85rem;\n}\n.status-badge.pending[_ngcontent-%COMP%] {\n  background: #ffc107;\n  color: #333;\n}\n.status-badge.assigned[_ngcontent-%COMP%] {\n  background: #17a2b8;\n  color: white;\n}\n.status-badge.in_progress[_ngcontent-%COMP%] {\n  background: #6610f2;\n  color: white;\n}\n.status-badge.completed[_ngcontent-%COMP%] {\n  background: #28a745;\n  color: white;\n}\n.status-badge.cancelled[_ngcontent-%COMP%] {\n  background: #dc3545;\n  color: white;\n}\n.btn-view[_ngcontent-%COMP%], .btn-update[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.75rem;\n  margin-right: 0.5rem;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.btn-view[_ngcontent-%COMP%] {\n  background: #1a73e8;\n  color: white;\n}\n.btn-update[_ngcontent-%COMP%] {\n  background: #28a745;\n  color: white;\n}\n/*# sourceMappingURL=service-requests.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ServiceRequestsComponent, { className: "ServiceRequestsComponent", filePath: "src\\app\\modules\\admin\\service-requests\\service-requests.component.ts", lineNumber: 112 });
})();

// src/app/modules/admin/settings/settings.component.ts
var SettingsComponent = class _SettingsComponent {
  constructor(fb, configService) {
    this.fb = fb;
    this.configService = configService;
    const business = this.configService.business;
    this.businessForm = this.fb.group({
      name: [business.name],
      phone: [business.phone],
      email: [business.email],
      address: [business.address]
    });
    this.whatsappForm = this.fb.group({
      number: [business.whatsapp],
      defaultMessage: ["Hello, I need AC service"]
    });
    this.emailForm = this.fb.group({
      smtpHost: [""],
      smtpPort: [587],
      username: [""],
      password: [""]
    });
  }
  ngOnInit() {
  }
  static {
    this.\u0275fac = function SettingsComponent_Factory(t) {
      return new (t || _SettingsComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ConfigService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsComponent, selectors: [["app-settings"]], decls: 61, vars: 3, consts: [[1, "settings-page"], [1, "settings-section"], [3, "formGroup"], [1, "form-group"], ["type", "text", "formControlName", "name"], ["type", "tel", "formControlName", "phone"], ["type", "email", "formControlName", "email"], ["formControlName", "address"], ["type", "submit", 1, "btn-save"], ["type", "text", "formControlName", "number"], ["formControlName", "defaultMessage"], ["type", "text", "formControlName", "smtpHost"], ["type", "number", "formControlName", "smtpPort"], ["type", "text", "formControlName", "username"], ["type", "password", "formControlName", "password"]], template: function SettingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1)(4, "h2");
        \u0275\u0275text(5, "Business Information");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "form", 2)(7, "div", 3)(8, "label");
        \u0275\u0275text(9, "Business Name");
        \u0275\u0275elementEnd();
        \u0275\u0275element(10, "input", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 3)(12, "label");
        \u0275\u0275text(13, "Phone");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "input", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 3)(16, "label");
        \u0275\u0275text(17, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(18, "input", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 3)(20, "label");
        \u0275\u0275text(21, "Address");
        \u0275\u0275elementEnd();
        \u0275\u0275element(22, "textarea", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "button", 8);
        \u0275\u0275text(24, "Save Changes");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(25, "div", 1)(26, "h2");
        \u0275\u0275text(27, "WhatsApp Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "form", 2)(29, "div", 3)(30, "label");
        \u0275\u0275text(31, "WhatsApp Number");
        \u0275\u0275elementEnd();
        \u0275\u0275element(32, "input", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "div", 3)(34, "label");
        \u0275\u0275text(35, "Default Message");
        \u0275\u0275elementEnd();
        \u0275\u0275element(36, "textarea", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "button", 8);
        \u0275\u0275text(38, "Save Changes");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(39, "div", 1)(40, "h2");
        \u0275\u0275text(41, "Email Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "form", 2)(43, "div", 3)(44, "label");
        \u0275\u0275text(45, "SMTP Host");
        \u0275\u0275elementEnd();
        \u0275\u0275element(46, "input", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "div", 3)(48, "label");
        \u0275\u0275text(49, "SMTP Port");
        \u0275\u0275elementEnd();
        \u0275\u0275element(50, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "div", 3)(52, "label");
        \u0275\u0275text(53, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275element(54, "input", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(55, "div", 3)(56, "label");
        \u0275\u0275text(57, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275element(58, "input", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "button", 8);
        \u0275\u0275text(60, "Save Changes");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("formGroup", ctx.businessForm);
        \u0275\u0275advance(22);
        \u0275\u0275property("formGroup", ctx.whatsappForm);
        \u0275\u0275advance(14);
        \u0275\u0275property("formGroup", ctx.emailForm);
      }
    }, dependencies: [\u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n.settings-page[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\nh1[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n.settings-section[_ngcontent-%COMP%] {\n  background: white;\n  padding: 1.5rem;\n  border-radius: 8px;\n  margin-bottom: 1.5rem;\n}\n.settings-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n}\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\n.btn-save[_ngcontent-%COMP%] {\n  padding: 0.5rem 1.5rem;\n  background: #1a73e8;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.btn-save[_ngcontent-%COMP%]:hover {\n  background: #1557b0;\n}\n/*# sourceMappingURL=settings.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src\\app\\modules\\admin\\settings\\settings.component.ts", lineNumber: 126 });
})();

// src/app/modules/admin/admin.module.ts
var routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "customers",
    component: CustomersComponent
  },
  {
    path: "service-requests",
    component: ServiceRequestsComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  }
];
var AdminModule = class _AdminModule {
  static {
    this.\u0275fac = function AdminModule_Factory(t) {
      return new (t || _AdminModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AdminModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
    ] });
  }
};
export {
  AdminModule
};
//# sourceMappingURL=chunk-UQ46O542.js.map
