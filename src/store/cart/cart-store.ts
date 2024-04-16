import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  // El persist para el localstorage
  persist(
    (set, get) => ({
      cart: [],
      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
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
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updateCartProducts });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updateCartProducts = cart.filter((item) => {
          return item.id !== product.id || item.size !== product.size;
        });

        set({ cart: updateCartProducts });
      },
    }),
    // La clave con la que se guarda en el localstorage
    { name: "shopping-cart" },
  ),
);
