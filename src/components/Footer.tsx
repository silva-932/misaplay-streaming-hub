const Footer = () => (
  <footer className="py-8 border-t border-border bg-muted/10">
    <div className="container mx-auto px-4 text-center">
      <img src="/images/logo.png" alt="MISAPLAY-TV" className="h-10 mx-auto mb-4" />
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MISAPLAY-TV. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;
