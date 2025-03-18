import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const sitemapUrl = `${baseUrl}/sitemap.xml`
    
    // 尝试多个搜索引擎的 ping 服务
    const pingUrls = [
      `https://www.google.com/webmasters/tools/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    ]

    const results = await Promise.all(
      pingUrls.map(async (url) => {
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; EasyAlgoBot/1.0; +https://easyalgo.dev)'
            }
          })
          
          return {
            url,
            success: response.ok,
            status: response.status
          }
        } catch (error) {
          return {
            url,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        }
      })
    )

    const allSuccess = results.every(result => result.success)
    
    if (!allSuccess) {
      console.warn('Some ping requests failed:', results)
      return NextResponse.json({ 
        success: false,
        message: 'Some search engines failed to receive the sitemap',
        details: results
      }, { status: 207 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully pinged search engines with sitemap',
      details: results
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