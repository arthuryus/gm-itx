import React from "react"

export class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: any) {
        console.error("ErrorBoundary:", error)
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong</div>
        }

        return this.props.children
    }
}