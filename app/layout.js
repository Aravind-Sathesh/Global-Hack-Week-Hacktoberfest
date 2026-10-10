export const metadata = { title: "Tic Tac Toe" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
