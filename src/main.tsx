import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryProvider } from "@/app/providers/QueryProvider"
import { ErrorBoundary } from "@/app/ErrorBoundary"
import AppInitializer from "@/app/providers/AppInitializer"
import { Router } from "@/app/router/Router"
import { Toaster } from "@/shadcn/components/ui/sonner"
import "@/app/styles/globals.css"

ReactDOM.createRoot(document.getElementById("root")!).render(

        <ErrorBoundary>
            <QueryProvider>
                <AppInitializer>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </AppInitializer>
                <Toaster />
            </QueryProvider>
        </ErrorBoundary>

)

/*
import { BrowserRouter, RouterProvider } from "react-router-dom"
<RouterProvider router={Router} />
<BrowserRouter>
    <Router />
</BrowserRouter>
*/