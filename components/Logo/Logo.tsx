import { cn } from "@/utils/utils";
import Image, { ImageProps } from "next/image";
import React from "react";

type TextProps =
  | {
      withText: true;
      textProps?: React.HTMLProps<HTMLSpanElement>;
    }
  | {
      withText?: false;
      textProps: never;
    };

type LogoProps = Omit<ImageProps, "src" | "alt"> &
  TextProps & {
    width?: number;
    height?: number;
  };

const Logo = ({
  width = 50,
  height = 50,
  withText = false,
  textProps,
  className,
  ...props
}: LogoProps) => {
  return (
    <div className="flex items-center justify-center">
      <Image
        width={width}
        height={height}
        className={cn(className, "dark:hidden block select-none")}
        src={"/MusikuLogo.png"}
        alt="Musiku Logo"
        {...props}
      />
      <Image
        width={width}
        height={height}
        className={cn(className, "hidden dark:block select-none")}
        src={"/MusikuLogoInverted.png"}
        alt="Musiku Logo"
        {...props}
      />
      {withText && (
        <span
          {...textProps}
          className={cn(
            "max-sm:hidden text-2xl font-semibold ml-4 select-none",
            textProps?.className
          )}
        >
          Musiku
        </span>
      )}
    </div>
  );
};
Logo.displayName = "Logo";

export default Logo;
