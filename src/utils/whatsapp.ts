import { CartItem, CustomerDetails, Product } from '../types';

export const WHATSAPP_PHONE_NUMBER = '201555380043';
export const FREE_SHIPPING_THRESHOLD = 1500;
export const STANDARD_SHIPPING_FEE = 75;

export function formatEGP(amount: number): string {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0
  }).format(amount).replace('EGP', '').trim() + ' EGP';
}

/**
 * Detects whether the user is on a mobile device (smartphone or tablet)
 * vs a desktop computer or laptop (Windows, macOS, Linux, ChromeOS).
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  const ua = navigator.userAgent || '';
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  const isIPad = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return mobileRegex.test(ua) || isIPad;
}

/**
 * Builds the appropriate WhatsApp destination URL:
 * - Desktop/PC/Laptop: ALWAYS uses WhatsApp Web URL:
 *   https://web.whatsapp.com/send?phone=201555380043&text=ENCODED_MESSAGE
 *   (Strictly avoids desktop app deep links or whatsapp:// protocols)
 * - Mobile devices: Uses normal WhatsApp web-compatible HTTPS link:
 *   https://wa.me/201555380043?text=ENCODED_MESSAGE
 */
export function buildWhatsAppUrl(message: string, forceDesktop?: boolean): string {
  const encoded = encodeURIComponent(message);
  if (forceDesktop || !isMobileDevice()) {
    return `https://web.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encoded}`;
  }
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encoded}`;
}

export function generateWhatsAppOrderMessage(
  items: CartItem[],
  customer: CustomerDetails,
  subtotal: number,
  shippingFee: number,
  total: number
): string {
  const customerLines = [
    `Name: ${customer.fullName.trim()}`,
    `Phone: ${customer.phone.trim()}`,
    `City: ${customer.city.trim()}`,
    `Address: ${customer.address.trim()}`
  ];

  if (customer.notes && customer.notes.trim()) {
    customerLines.push(`Notes: ${customer.notes.trim()}`);
  }

  const itemsList = items
    .map((item, idx) => {
      const variantParts = [item.selectedFlavor, item.selectedSize].filter(Boolean);
      const variantStr = variantParts.length > 0 ? variantParts.join(' / ') : 'Standard';
      const priceText = item.quantity > 1
        ? `${formatEGP(item.unitPrice)} each`
        : `${formatEGP(item.unitPrice)}`;

      return `${idx + 1}. ${item.product.name}\n   Variant: ${variantStr}\n   Quantity: ${item.quantity}\n   Price: ${priceText}`;
    })
    .join('\n\n');

  const shippingText = shippingFee === 0 ? 'FREE' : formatEGP(shippingFee);

  const message = `Hello, I would like to place an order.

CUSTOMER INFORMATION
${customerLines.join('\n')}

ORDER

${itemsList}

Subtotal: ${formatEGP(subtotal)}
Shipping: ${shippingText}
TOTAL: ${formatEGP(total)}

Please confirm my order and delivery details.`;

  return message;
}

/**
 * Returns the platform-appropriate WhatsApp order URL:
 * - Desktop: https://web.whatsapp.com/send?phone=201555380043&text=...
 * - Mobile:  https://wa.me/201555380043?text=...
 */
export function getWhatsAppOrderUrl(
  items: CartItem[],
  customer: CustomerDetails,
  subtotal: number,
  shippingFee: number,
  total: number,
  forceDesktop?: boolean
): string {
  const message = generateWhatsAppOrderMessage(items, customer, subtotal, shippingFee, total);
  return buildWhatsAppUrl(message, forceDesktop);
}

/**
 * Explicit helper for Desktop WhatsApp Web order URL
 */
export function getWhatsAppOrderUrlDesktop(
  items: CartItem[],
  customer: CustomerDetails,
  subtotal: number,
  shippingFee: number,
  total: number
): string {
  const message = generateWhatsAppOrderMessage(items, customer, subtotal, shippingFee, total);
  return `https://web.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodeURIComponent(message)}`;
}

/**
 * Explicit helper for Mobile WhatsApp order URL
 */
export function getWhatsAppOrderUrlMobile(
  items: CartItem[],
  customer: CustomerDetails,
  subtotal: number,
  shippingFee: number,
  total: number
): string {
  const message = generateWhatsAppOrderMessage(items, customer, subtotal, shippingFee, total);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppDirectProductUrl(product: Product, flavor?: string, size?: string): string {
  const flavorText = flavor ? ` Flavor: ${flavor}` : '';
  const sizeText = size ? ` Size: ${size}` : '';
  const msg = `Hello VITALØ team! I am interested in ordering ${product.name} (${product.tagline}).${flavorText}${sizeText} Price: ${formatEGP(product.price)}. Could you please confirm stock and delivery timeline?`;
  return buildWhatsAppUrl(msg);
}

export function getWhatsAppGeneralContactUrl(): string {
  const msg = `Hello VITALØ! I have a question about your supplements and delivery options.`;
  return buildWhatsAppUrl(msg);
}
