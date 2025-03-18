import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const sitemapUrl = `${baseUrl}/sitemap.xml`
    
    // 向 Google 提交 Sitemap
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    const response = await fetch(pingUrl)
    
    if (!response.ok) {
      throw new Error('Failed to ping Google')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully pinged Google with sitemap' 
    })
  } catch (error) {
    console.error('Error pinging sitemap:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to ping sitemap',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 