"use client";
import React, { ReactNode } from "react";

import { SessionProvider, authConfigManager } from "@hono/auth-js/react";

const SessionLayout = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionLayout;
