const WHATSAPP_NUMBER = "92355569982"; // Replace with real number; use country code without +

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function getPackageWhatsAppMessage(packageName: string): string {
  return `Hi, I'm interested in ${packageName}. Please share details.`;
}

export function getDestinationWhatsAppMessage(destinationName: string): string {
  return `Hi, I'm interested in ${destinationName}. Please share details.`;
}

export function getGenericWhatsAppMessage(): string {
  return "Hi, I'd like to plan a trip. Can you help me with options?";
}

export { WHATSAPP_NUMBER };
