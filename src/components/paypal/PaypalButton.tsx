"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const rountedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="mb-16 animate-pulse text-center">
        <div className="h-11 rounded bg-gray-300" />
        <div className="mt-2 h-11 rounded bg-gray-300" />
      </div>
    );
  }

  const createOrder = (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ): Promise<string> => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: `${rountedAmount}`,
          },
        },
      ],
    });
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
    />
  );
};
