import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enron Email Viewer 2000',
  description: 'View emails from Enron in true 2000s style',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="text-center mt-8 text-[#000080] border-t-2 border-[#000080] pt-4">
          <p className="blink mb-2">Best viewed in Internet Explorer 6 at 800x600 resolution</p>
          <div className="flex justify-center space-x-4 mb-2">
            <a href="#" className="rainbow-text">Top</a>
          </div>
          <p className="text-xs">© 2000 Enron Corporation. All rights reserved. (not really, this is satire)</p>
          <div className="flex justify-center mt-2">
          </div>
        </footer>
      </body>
    </html>
  )
}

