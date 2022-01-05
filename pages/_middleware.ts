import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')

  let env = process.env
  // let envStr = JSON.stringify(env)
  let pos = req.geo
  console.log('env', env)
  console.log('pos', pos)


  return new Response(
    envStr, {
    status: 200,
    headers: {
      'country': pos.country,
      'city': pos.city,
      // 'latitude': pos.latitude,
      // 'longitude': pos.longitude,
      'region': pos.region
    }
  }
  )

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1]
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

    if (user === '4dmin' && pwd === 'testpwd123') {
      return NextResponse.next()
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
