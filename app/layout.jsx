import { UsersProvider } from './AllContext/UsersContext';
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
      </head>
      <body>
        <UsersProvider>{children}</UsersProvider>
      </body>
    </html>
  )
}

export const metadata = {
  generator: 'v0.dev'
};
