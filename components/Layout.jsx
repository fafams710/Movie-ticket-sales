// components/Layout.jsx
export default function Layout({ children }) {
    return (
      <>
        <Navbar />
        <ToastContainer {...toastConfig} />
        <main className="min-h-[calc(100vh-80px)]">
          {children}
        </main>
        <ContactFloatingButton />
      </>
    );
  }