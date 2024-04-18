"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

interface Props {
  children: React.ReactNode;
}
export const Providers = ({ children }: Props) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent: "capture",
        currency: "USD",
      }}
    >
      <SessionProvider>
        <NextTopLoader
          height={6}
          showSpinner={false}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        {children}
      </SessionProvider>
    </PayPalScriptProvider>
  );
};
