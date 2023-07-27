import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/libs/supabase'

export const GET = async (_: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params

  const { data } = await supabase.from('course-classes').select().eq('id', id)

  return NextResponse.json({ data })
}
