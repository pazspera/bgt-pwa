import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface NavButton {
  value: string;
  label: string;
  to: string | object;
  icon: IconDefinition;
}