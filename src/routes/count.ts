import { supabase } from '#/lib/supabase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/count')({
  server: {
    handlers: {
      GET: async () => {
        const { data, error } = await supabase
          .from('count')
          .select('count')
          .eq('id', 1)
          .single()

        if (error) {
          console.error(error)
          return new Response(null)
        }

        return new Response(
          JSON.stringify({
            count: data.count,
          }),
        )
      },
    },
  },
})
