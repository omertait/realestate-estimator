import React from 'react'
import { Button } from './ui/button'
import { Building, Menu } from 'lucide-react'

function TopBar() {
  return (
    <header className="sticky top-0 z-50 px-6 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Building className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                Real Estate Simulator
              </span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/"
              >
                Home
              </a>
              {/* <a
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/reports"
              >
                Reports
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/help"
              >
                Help
              </a> */}
            </nav>
          </div>
          <Button
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 md:hidden"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:R1mcq:"
            data-state="closed"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          {/* <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className="w-9 px-0"
              >
                <BarChart3 className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-9 px-0"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-9 px-0"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User</span>
              </Button>
            </nav>
          </div> */}
        </div>
      </header>
  )
}

export default TopBar