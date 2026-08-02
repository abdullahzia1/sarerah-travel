export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
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
