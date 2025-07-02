export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div itemScope itemType="https://schema.org/WebPage">
      {children}
    </div>
  );
}
