import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/libs/supabase'

export const GET = async (_: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params

  const { data } = await supabase.from('course-classes').select().eq('id', id)

  if (data?.length === 0) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 404 })
  }

  const courseClass = data![0]

  return NextResponse.json({ data: courseClass }, { status: 200 })
}
