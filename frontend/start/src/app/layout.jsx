
import AuthProvider, { useAuth } from "@/context/AuthContext";
import vazirFont from "@/constants/localFonts.js";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import ThemeProvider from "@/context/ThemeContext";





export const metadata = {
  title: {
    template: '%s | بلاگ',
    default: "بلاگ", // a default is required when creating a template
  },
}

export default function RootLayout({ children }) {



  return (
    <html lang="fa" dir="rtl" >
      <body className={`${vazirFont.variable} font-sans min-h-screen`}>
        <Toaster />
        <ThemeProvider>

          <ReactQueryProvider>
            <AuthProvider>

              {children}

            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>


      </body>
    </html>
  );
}
