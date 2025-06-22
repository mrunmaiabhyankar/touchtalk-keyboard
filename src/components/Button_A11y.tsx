import React, { useEffect, useRef, type ComponentType } from "react"

// HOC to add role="button"
export function buttonAttribute<P extends object>(Component: ComponentType<P>): ComponentType<P> {
    const Wrapped: React.FC<P> = (props) => {
        return <Component {...props} role="button" />
    }
    return Wrapped
}

// HOC to add role="region" and aria-label
export function keyboardGridAttribute<P extends object>(Component: ComponentType<P>): ComponentType<P> {
    const Wrapped: React.FC<P> = (props) => {
        return <Component {...props} role="region" aria-label="Keyboard region" />
    }
    return Wrapped
}

// HOC to auto-focus an element on mount
export function firstFocus<P extends object>(Component: ComponentType<P>): ComponentType<P> {
    const Wrapped: React.FC<P> = (props) => {
        const firstFocusableRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            if (firstFocusableRef.current) {
                firstFocusableRef.current.focus()
            }
        }, [])

        return (
            <div ref={firstFocusableRef} tabIndex={0} id="first-focusable-element">
                <Component {...props} />
            </div>
        )
    }
    return Wrapped
}
