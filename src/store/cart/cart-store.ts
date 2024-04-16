import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  // persist
  (set, get) => ({
  cart: [],
  addProductToCart: (product: CartProduct) => {
    const { cart } = get();

    // 1.Revisar si el producto existe en el carrito con la talla seleccionada
    const productInCart = cart.some(
      (item) => item.id === product.id && item.size === product.size,
    );

    if (!productInCart) {
      set({ cart: [...cart, product] });
      return;
    }

    // 2. Se que el producto existe por talla... tengo que actualizar la cantidad
    const updateCartProducts = cart.map((item) => {
      if (item.id === product.id && item.size === product.size) {
        return { ...item, quantity: item.quantity + product.quantity };
      }

      return item;
    });

    set({ cart: updateCartProducts });
  },
}));
