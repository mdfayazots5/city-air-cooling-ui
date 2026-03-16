import {
  ApiService,
  NavigationEnd,
  Router,
  __async,
  filter,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-EWJTCRSA.js";

// src/app/core/services/location.service.ts
var LocationService = class _LocationService {
  constructor() {
  }
  /**
   * Get user's current location using browser Geolocation API
   */
  getLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.warn("Geolocation is not supported by this browser");
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
      }, (error) => {
        console.warn("Error getting location:", error.message);
        resolve(null);
      }, {
        enableHighAccuracy: true,
        timeout: 1e4,
        maximumAge: 3e5
        // 5 minutes cache
      });
    });
  }
  /**
   * Check if geolocation is available
   */
  isGeolocationAvailable() {
    return "geolocation" in navigator;
  }
  /**
   * Get position repeatedly (for tracking)
   */
  watchPosition(onSuccess, onError) {
    if (!navigator.geolocation) {
      if (onError) {
        onError("Geolocation is not supported");
      }
      return null;
    }
    return navigator.geolocation.watchPosition((position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      });
    }, (error) => {
      if (onError) {
        onError(error);
      }
    }, {
      enableHighAccuracy: true,
      timeout: 1e4,
      maximumAge: 6e4
      // 1 minute cache
    });
  }
  /**
   * Stop watching position
   */
  clearWatch(watchId) {
    navigator.geolocation.clearWatch(watchId);
  }
  static {
    this.\u0275fac = function LocationService_Factory(t) {
      return new (t || _LocationService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LocationService, factory: _LocationService.\u0275fac, providedIn: "root" });
  }
};

// src/app/core/services/event-tracking.service.ts
var EventTrackingService = class _EventTrackingService {
  constructor(router, locationService, apiService) {
    this.router = router;
    this.locationService = locationService;
    this.apiService = apiService;
    this.currentPageUrl = "";
    this.initPageTracking();
  }
  initPageTracking() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentPageUrl = event.urlAfterRedirects;
      this.trackPageView();
    });
  }
  trackPageView() {
    return __async(this, null, function* () {
      const location = yield this.locationService.getLocation();
      const event = {
        eventType: "PageViewed",
        pageUrl: this.currentPageUrl,
        latitude: location?.latitude,
        longitude: location?.longitude,
        userAgent: navigator.userAgent
      };
      this.sendEvent(event);
    });
  }
  trackCallButton(buttonName = "Call Now") {
    return __async(this, null, function* () {
      const location = yield this.locationService.getLocation();
      const event = {
        eventType: "CallButtonClicked",
        pageUrl: this.currentPageUrl,
        buttonName,
        latitude: location?.latitude,
        longitude: location?.longitude,
        userAgent: navigator.userAgent
      };
      this.sendEvent(event);
    });
  }
  trackWhatsAppClick(buttonName = "WhatsApp") {
    return __async(this, null, function* () {
      const location = yield this.locationService.getLocation();
      const event = {
        eventType: "WhatsAppClicked",
        pageUrl: this.currentPageUrl,
        buttonName,
        latitude: location?.latitude,
        longitude: location?.longitude,
        userAgent: navigator.userAgent
      };
      this.sendEvent(event);
    });
  }
  trackBookingFormOpened() {
    return __async(this, null, function* () {
      const location = yield this.locationService.getLocation();
      const event = {
        eventType: "BookingFormOpened",
        pageUrl: this.currentPageUrl,
        latitude: location?.latitude,
        longitude: location?.longitude,
        userAgent: navigator.userAgent
      };
      this.sendEvent(event);
    });
  }
  trackBookingSubmitted(bookingData) {
    return __async(this, null, function* () {
      const location = yield this.locationService.getLocation();
      const event = {
        eventType: "BookingSubmitted",
        pageUrl: this.currentPageUrl,
        latitude: location?.latitude,
        longitude: location?.longitude,
        userAgent: navigator.userAgent
      };
      this.sendEvent(event);
    });
  }
  trackContactFormOpened() {
    return __async(this, null, function* () {
      const location = yield this.locationService.getLocation();
      const event = {
        eventType: "ContactFormOpened",
        pageUrl: this.currentPageUrl,
        latitude: location?.latitude,
        longitude: location?.longitude,
        userAgent: navigator.userAgent
      };
      this.sendEvent(event);
    });
  }
  trackContactFormSubmitted() {
    return __async(this, null, function* () {
      const location = yield this.locationService.getLocation();
      const event = {
        eventType: "ContactFormSubmitted",
        pageUrl: this.currentPageUrl,
        latitude: location?.latitude,
        longitude: location?.longitude,
        userAgent: navigator.userAgent
      };
      this.sendEvent(event);
    });
  }
  sendEvent(event) {
    console.log("\u{1F4CA} Event Tracked:", event);
    this.apiService.trackEvent(event).subscribe({
      next: () => console.log("Event sent to server"),
      error: (err) => console.warn("Failed to send event:", err)
    });
  }
  static {
    this.\u0275fac = function EventTrackingService_Factory(t) {
      return new (t || _EventTrackingService)(\u0275\u0275inject(Router), \u0275\u0275inject(LocationService), \u0275\u0275inject(ApiService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EventTrackingService, factory: _EventTrackingService.\u0275fac, providedIn: "root" });
  }
};

export {
  LocationService,
  EventTrackingService
};
//# sourceMappingURL=chunk-FZMCAFQB.js.map
