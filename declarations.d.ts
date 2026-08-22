declare module 'next' {
  export type Metadata = any;
  export type NextConfig = any;
}
declare module 'next/link';
declare module 'next/image';
declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): any;
  export function useSearchParams(): any;
}
declare module 'next/font/google' {
  export const Plus_Jakarta_Sans: any;
  export const Inter: any;
}
declare module 'next/types.js' {
  export type ResolvingMetadata = Promise<any>;
  export type ResolvingViewport = Promise<any>;
}
