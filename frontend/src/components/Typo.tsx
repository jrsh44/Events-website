import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ITypoProps {
  children: ReactNode;
  className?: string;
}

export const TypoH1 = (props: ITypoProps) => (
  <h1
    className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      props.className,
    )}
  >
    {props.children}
  </h1>
);

export const TypoH2 = (props: ITypoProps) => (
  <h2
    className={cn("scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0", props.className)}
  >
    {props.children}
  </h2>
);

export const TypoH3 = (props: ITypoProps) => (
  <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", props.className)}>
    {props.children}
  </h3>
);

export const TypoH4 = (props: ITypoProps) => (
  <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", props.className)}>
    {props.children}
  </h4>
);

export const TypoH5 = (props: ITypoProps) => (
  <h1
    className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      props.className,
    )}
  >
    {props.children}
  </h1>
);

export const TypoLarge = (props: ITypoProps) => (
  <div className={cn("text-lg font-semibold", props.className)}>{props.children}</div>
);

export const TypoBody = (props: ITypoProps) => (
  <div className={cn("text-base", props.className)}>{props.children}</div>
);

export const TypoValidation = (props: ITypoProps) => (
  <div className={cn("text-sm h-4 text-red-500", props.className)}>{props.children}</div>
);
