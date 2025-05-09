    import * as React from 'react'

    import { cn } from '@/lib/utils'

    export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
        type={type}
        max={25}
        className={cn(
            'flex h-10 w-full rounded-md border-0 font-bold text-xl bg-white px-3 py-2 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
            className
        )}
        ref={ref}
        {...props}
        />
    )
    })

    Input.displayName = 'Input'

    
