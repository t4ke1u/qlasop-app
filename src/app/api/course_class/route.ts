import { NextResponse } from 'next/server'

import { supabase } from '@/libs/supabase'

import type { NextRequest} from 'next/server';

export const GET = async (request: NextRequest) => {
  const { data } = await supabase.from('course-classes').select()

  return NextResponse.json({ data })
}
