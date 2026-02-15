import { LiveSupportProvider } from './AllContext/ChatContext';
import { UsersProvider } from './AllContext/UsersContext';
import './globals.css'

export const metadata = {
  title: 'Admatric',
  icons: {
    icon: '/favicon.ico',        // browser tab
    apple: '/favicon.png',       // iOS
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UsersProvider>
          <LiveSupportProvider>{children}</LiveSupportProvider>
        </UsersProvider>
      </body>
    </html>
  )
}
