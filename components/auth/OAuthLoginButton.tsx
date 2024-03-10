"use client";
import React from "react";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { FaGithub, FaGoogle, FaDiscord } from "react-icons/fa";
import { Button } from "../ui/button";

const OAuthLoginButton = ({ provider }: { provider: ClientSafeProvider }) => {
  if (provider.type !== "oauth") return null;

  const getIcon = () => {
    switch (provider.id) {
      case "github":
        return <FaGithub />;
      case "google":
        return <FaGoogle className="text-orange-800" />;
      case "discord":
        return <FaDiscord className="text-[#404eed]" />;
      default:
        return "?";
    }
  };

  return (
    <div className="flex w-full px-2 flex-row justify-center  ">
      <Button
        className="rounded-full w-full text-xl"
        onClick={() => signIn(provider.id)}
      >
        {getIcon()}
      </Button>
    </div>
  );
};

export default OAuthLoginButton;
