"use client";
import { paypalCheckPayment, setTransactionId } from "@/actions";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

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

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: `${rountedAmount}`,
          },
        },
      ],
    });

    // console.log({transactionId});
    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error("No se pudo actualizar la orden");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    // Es el transactionId
    const details = await actions.order?.capture();

    if (details && details.id) {
      await paypalCheckPayment(details.id);
    }
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
