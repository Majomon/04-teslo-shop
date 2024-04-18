export { authenticate } from "./auth/login";
export { logout } from "./auth/logout";
export { registerUser } from "./auth/register";

export { getProductBySlug } from "./products/get-product-by-slug";
export { getStockBySlug } from "./products/get-stock-by-slug";
export { getPaginatedProductsWithImages } from "./products/product-pagination";
export { createUpdateProduct } from "./products/create-update-product";
export {deleteProductImage} from "./products/delete-product-image"

export { getCountries } from "./country/get-countries";

export { setUserAddress } from "./address/set-user-address";
export { deleteUserAddress } from "./address/delete-user-address";
export { getUserAddress } from "./address/get-user-address";

export { placeOrder } from "./order/place-order";
export { getOrderById } from "./order/get-order-by-id";
export { getOrdersByUser } from "./order/get-orders-by-users";
export { getPaginatedOrders } from "./order/get-paginated-orders";

export { setTransactionId } from "./payments/set-transaction-id";
export { paypalCheckPayment } from "./payments/paypal-payment";

export { getPaginatedUsers } from "./users/get-paginated-users";
export { changeUserRol } from "./users/change-user-rol";

export { getCategories } from "./category/get-categories";

