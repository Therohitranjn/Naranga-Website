import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Strict administrative authentication
    // Uses environment variables with WelcomeNaranga / Welcome@2026 as secure defaults
    const expectedUser = process.env.ADMIN_USER || "WelcomeNaranga";
    const expectedPass = process.env.ADMIN_PASSWORD || "Welcome@2026";

    if (username === expectedUser && password === expectedPass) {
      const response = NextResponse.json({
        success: true,
        message: "प्रशासनिक लॉगिन सफल",
      });

      // Secure HTTP-only cookie set directly on response
      response.cookies.set({
        name: "naranga_admin_session",
        value: "authenticated_token_active",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "अमान्य यूज़रनेम या पासवर्ड / Invalid credentials" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "लॉगिन सर्वर त्रुटि" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "सफलतापूर्वक लॉगआउट किया गया" });
  response.cookies.delete("naranga_admin_session");
  return response;
}
