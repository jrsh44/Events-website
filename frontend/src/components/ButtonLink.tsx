import { cn } from "@/lib/utils";

interface IButtonLinkProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const ButtonLink = (props: IButtonLinkProps) => (
  <button
    className={cn(
      "text-white font-bold cursor-pointer transition-none hover:underline disabled:cursor-not-allowed disabled:text-neutral-700 inline",
      props.className,
    )}
    onClick={props.onClick}
    disabled={!!props.disabled}
  >
    {props.children}
  </button>
);
