"use client";
import { useEffect, useRef, useState } from "react";

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  id?: string;
  required?: boolean;
}

declare global {
  interface Window {
    google: typeof google;
    initGoogleMaps: () => void;
  }
}

let isGoogleMapsLoaded = false;
let isGoogleMapsLoading = false;
const loadCallbacks: (() => void)[] = [];

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isGoogleMapsLoaded && window.google?.maps?.places) {
      resolve();
      return;
    }

    loadCallbacks.push(resolve);

    if (isGoogleMapsLoading) return;

    isGoogleMapsLoading = true;

    window.initGoogleMaps = () => {
      isGoogleMapsLoaded = true;
      isGoogleMapsLoading = false;
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      isGoogleMapsLoading = false;
      reject(new Error("Google Maps script failed to load"));
    };
    document.head.appendChild(script);
  });
}

export default function PlacesAutocomplete({
  value,
  onChange,
  placeholder,
  id,
  required,
}: PlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    loadGoogleMapsScript(apiKey)
      .then(() => setIsLoaded(true))
      .catch((err) => console.error("Failed to load Google Maps:", err));
  }, []);

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "in" },
        types: ["(regions)"],
        fields: ["name", "formatted_address", "address_components"],
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place) {
        let cityName = place.name || "";

        if (place.address_components) {
          for (const component of place.address_components) {
            if (
              component.types.includes("locality") ||
              component.types.includes("administrative_area_level_2")
            ) {
              cityName = component.long_name;
              break;
            }
          }
        }

        onChange(cityName);
      }
    });

    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(
          autocompleteRef.current
        );
      }
    };
  }, [isLoaded, onChange]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      placeholder={placeholder}
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      autoComplete="off"
    />
  );
}
