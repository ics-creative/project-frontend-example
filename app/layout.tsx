import RootStyleRegistry from "./emotion";
import "./globals.css";

export default function RootLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="ja">
      <head>
        <title>フロントエンドの知識地図ハンズオン</title>
      </head>
      <body>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
