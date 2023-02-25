import CurrentScore from './context'

export default function RootLayout({ children }) {
  
  return (
    <html>
      <head />
      <body>
        <CurrentScore>
          {children}
        </CurrentScore>
      </body>
    </html>
  )
}
