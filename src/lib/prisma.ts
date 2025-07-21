import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'pretty',
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database utility functions
export async function createPurchase(data: {
  email: string
  stripePaymentId: string
  stripeSessionId?: string
  amount: number
  currency?: string
  firstName?: string
  lastName?: string
  country?: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}) {
  try {
    const purchase = await prisma.purchase.create({
      data: {
        ...data,
        expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours from now
      },
    })
    return { purchase, error: null }
  } catch (error) {
    console.error('Error creating purchase:', error)
    return { 
      purchase: null, 
      error: error instanceof Error ? error.message : 'Failed to create purchase' 
    }
  }
}

export async function getPurchaseByToken(downloadToken: string) {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: { downloadToken },
      include: { downloads: true },
    })
    return { purchase, error: null }
  } catch (error) {
    console.error('Error getting purchase by token:', error)
    return { 
      purchase: null, 
      error: error instanceof Error ? error.message : 'Failed to get purchase' 
    }
  }
}

export async function getPurchaseByPaymentId(stripePaymentId: string) {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: { stripePaymentId },
      include: { downloads: true },
    })
    return { purchase, error: null }
  } catch (error) {
    console.error('Error getting purchase by payment ID:', error)
    return { 
      purchase: null, 
      error: error instanceof Error ? error.message : 'Failed to get purchase' 
    }
  }
}

export async function updatePurchaseStatus(id: string, status: string) {
  try {
    const purchase = await prisma.purchase.update({
      where: { id },
      data: { status },
    })
    return { purchase, error: null }
  } catch (error) {
    console.error('Error updating purchase status:', error)
    return { 
      purchase: null, 
      error: error instanceof Error ? error.message : 'Failed to update purchase status' 
    }
  }
}

export async function recordDownload(purchaseId: string, ipAddress: string, userAgent?: string) {
  try {
    // First, increment the download count
    const purchase = await prisma.purchase.update({
      where: { id: purchaseId },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    })

    // Then, record the download event
    const download = await prisma.download.create({
      data: {
        purchaseId,
        ipAddress,
        userAgent,
      },
    })

    return { download, purchase, error: null }
  } catch (error) {
    console.error('Error recording download:', error)
    return { 
      download: null, 
      purchase: null, 
      error: error instanceof Error ? error.message : 'Failed to record download' 
    }
  }
}

export async function addNewsletterSubscriber(data: {
  email: string
  firstName?: string
  lastName?: string
  source?: string
}) {
  try {
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: data.email },
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        source: data.source,
        isActive: true,
      },
      create: data,
    })
    return { subscriber, error: null }
  } catch (error) {
    console.error('Error adding newsletter subscriber:', error)
    return { 
      subscriber: null, 
      error: error instanceof Error ? error.message : 'Failed to add newsletter subscriber' 
    }
  }
}

export async function recordPageView(data: {
  page: string
  ipAddress: string
  userAgent?: string
  referrer?: string
  country?: string
  city?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  sessionId?: string
}) {
  try {
    const pageView = await prisma.pageView.create({
      data,
    })
    return { pageView, error: null }
  } catch (error) {
    console.error('Error recording page view:', error)
    return { 
      pageView: null, 
      error: error instanceof Error ? error.message : 'Failed to record page view' 
    }
  }
}

export async function recordConversionEvent(data: {
  eventType: string
  page: string
  element?: string
  value?: string
  ipAddress: string
  userAgent?: string
  sessionId?: string
}) {
  try {
    const event = await prisma.conversionEvent.create({
      data,
    })
    return { event, error: null }
  } catch (error) {
    console.error('Error recording conversion event:', error)
    return { 
      event: null, 
      error: error instanceof Error ? error.message : 'Failed to record conversion event' 
    }
  }
}

export async function createContactMessage(data: {
  name: string
  email: string
  subject?: string
  message: string
  ipAddress: string
  userAgent?: string
}) {
  try {
    const contactMessage = await prisma.contactMessage.create({
      data,
    })
    return { contactMessage, error: null }
  } catch (error) {
    console.error('Error creating contact message:', error)
    return { 
      contactMessage: null, 
      error: error instanceof Error ? error.message : 'Failed to create contact message' 
    }
  }
}

// Analytics functions
export async function getAnalytics(startDate?: Date, endDate?: Date) {
  try {
    const dateFilter = {
      ...(startDate && { gte: startDate }),
      ...(endDate && { lte: endDate }),
    }

    const [totalPurchases, totalRevenue, pageViews, conversionEvents] = await Promise.all([
      prisma.purchase.count({
        where: {
          status: 'completed',
          ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter }),
        },
      }),
      prisma.purchase.aggregate({
        where: {
          status: 'completed',
          ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter }),
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.pageView.count({
        where: {
          ...(Object.keys(dateFilter).length > 0 && { viewedAt: dateFilter }),
        },
      }),
      prisma.conversionEvent.groupBy({
        by: ['eventType'],
        where: {
          ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter }),
        },
        _count: {
          eventType: true,
        },
      }),
    ])

    return {
      analytics: {
        totalPurchases,
        totalRevenue: totalRevenue._sum.amount || 0,
        pageViews,
        conversionEvents,
      },
      error: null,
    }
  } catch (error) {
    console.error('Error getting analytics:', error)
    return { 
      analytics: null, 
      error: error instanceof Error ? error.message : 'Failed to get analytics' 
    }
  }
}

export async function getPurchaseBySessionId(stripeSessionId: string) {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: { stripeSessionId },
      include: { downloads: true },
    })
    return { purchase, error: null }
  } catch (error) {
    console.error('Error getting purchase by session ID:', error)
    return { 
      purchase: null, 
      error: error instanceof Error ? error.message : 'Failed to get purchase' 
    }
  }
}

export async function generateDownloadToken(purchaseId: string) {
  try {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const purchase = await prisma.purchase.update({
      where: { id: purchaseId },
      data: { downloadToken: token },
    })
    return { token, purchase, error: null }
  } catch (error) {
    console.error('Error generating download token:', error)
    return { 
      token: null, 
      purchase: null, 
      error: error instanceof Error ? error.message : 'Failed to generate download token' 
    }
  }
}

export async function unsubscribeNewsletter(email: string) {
  try {
    const subscriber = await prisma.newsletterSubscriber.update({
      where: { email },
      data: { isActive: false },
    })
    return { subscriber, error: null }
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    return { 
      subscriber: null, 
      error: error instanceof Error ? error.message : 'Failed to unsubscribe from newsletter' 
    }
  }
}

// Cleanup expired downloads
export async function cleanupExpiredDownloads() {
  try {
    const result = await prisma.purchase.updateMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
        status: 'completed',
      },
      data: {
        status: 'expired',
      },
    })
    return { result, error: null }
  } catch (error) {
    console.error('Error cleaning up expired downloads:', error)
    return { 
      result: null, 
      error: error instanceof Error ? error.message : 'Failed to cleanup expired downloads' 
    }
  }
}