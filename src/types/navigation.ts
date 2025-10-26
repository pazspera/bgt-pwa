import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface NamedRoute {
  name: string,
  params?: Record<string, any>,
  query?: Record<string, any>,
}
// Record is making sure params and query receive an object
// that has keys as a string and the value can be anything

export interface NavButton {
  value: string;
  label: string;
  to: NamedRoute;
  icon: IconDefinition;
}