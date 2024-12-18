import { ComponentType } from 'react';

export type NextRoute =
  | '/'
  | '/profile'
  | '/settings'
  | '/catalog'
  | '/about'
  | '/blog'
  | '/contact'
  | '/find-car'
  | '/partner-cars';

// Get ready to update to nextjs version 13.2 with X typedRoutes
export type Route<T = string> = NextRoute;
export type PathName = Route;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
