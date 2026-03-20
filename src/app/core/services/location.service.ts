import { Injectable } from '@angular/core';

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly geolocation = typeof navigator !== 'undefined' ? navigator.geolocation : null;
  private geolocationUnavailable = false;

  constructor() { }

  /**
   * Get user's current location using browser Geolocation API
   */
  getLocation(): Promise<GeoLocation | null> {
    return new Promise((resolve) => {
      if (!this.geolocation || this.geolocationUnavailable) {
        this.geolocationUnavailable = true;
        resolve(null);
        return;
      }

      this.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        () => {
          this.geolocationUnavailable = true;
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    });
  }

  /**
   * Check if geolocation is available
   */
  isGeolocationAvailable(): boolean {
    return this.geolocation !== null;
  }

  /**
   * Get position repeatedly (for tracking)
   */
  watchPosition(
    onSuccess: (location: GeoLocation) => void,
    onError?: (error: any) => void
  ): number | null {
    if (!this.geolocation) {
      if (onError) {
        onError('Geolocation is not supported');
      }
      return null;
    }

    return this.geolocation.watchPosition(
      (position) => {
        onSuccess({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
      },
      (error) => {
        if (onError) {
          onError(error);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000 // 1 minute cache
      }
    );
  }

  /**
   * Stop watching position
   */
  clearWatch(watchId: number): void {
    if (this.geolocation) {
      this.geolocation.clearWatch(watchId);
    }
  }
}

