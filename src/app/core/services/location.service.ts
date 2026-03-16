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

  constructor() { }

  /**
   * Get user's current location using browser Geolocation API
   */
  getLocation(): Promise<GeoLocation | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.warn('Geolocation is not supported by this browser');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          });
        },
        (error) => {
          console.warn('Error getting location:', error.message);
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
    return 'geolocation' in navigator;
  }

  /**
   * Get position repeatedly (for tracking)
   */
  watchPosition(
    onSuccess: (location: GeoLocation) => void,
    onError?: (error: any) => void
  ): number | null {
    if (!navigator.geolocation) {
      if (onError) {
        onError('Geolocation is not supported');
      }
      return null;
    }

    return navigator.geolocation.watchPosition(
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
    navigator.geolocation.clearWatch(watchId);
  }
}

