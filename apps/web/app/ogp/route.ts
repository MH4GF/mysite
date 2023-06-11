import { NextResponse } from 'next/server'
import { z } from 'zod'

import { parseHTML } from './_features'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const _url = searchParams.get('url')
  const parsed = z.string().url().safeParse(_url)

  if (!parsed.success) return NextResponse.json({ error: 'url is invalid' }, { status: 400 })
  const result = await parseHTML(parsed.data)

  return NextResponse.json(result)
}
