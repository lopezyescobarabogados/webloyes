/**
 * Rate Limiter Simple para API de Imágenes
 * Previene abuso de endpoints de imágenes
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class ImageRateLimit {
  private limits = new Map<string, RateLimitEntry>();
  private readonly maxRequests = 100; // 100 requests por ventana
  private readonly windowMs = 15 * 60 * 1000; // 15 minutos

  isAllowed(clientId: string): boolean {
    const now = Date.now();
    const entry = this.limits.get(clientId);

    // Limpiar entrada expirada
    if (entry && now > entry.resetTime) {
      this.limits.delete(clientId);
    }

    const current = this.limits.get(clientId);

    if (!current) {
      // Primera request
      this.limits.set(clientId, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }

    if (current.count >= this.maxRequests) {
      return false; // Rate limit excedido
    }

    // Incrementar contador
    current.count++;
    return true;
  }

  // Limpiar entradas expiradas periódicamente
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}

export const imageRateLimit = new ImageRateLimit();

// Limpiar cada 5 minutos
if (typeof setInterval !== 'undefined') {
  setInterval(() => imageRateLimit.cleanup(), 5 * 60 * 1000);
}
