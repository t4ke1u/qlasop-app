import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/libs/supabase'

export const GET = async (request: NextRequest) => {
  const { data } = await supabase.from('course-classes').select()

  return NextResponse.json({ data })
}
