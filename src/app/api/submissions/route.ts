import { NextResponse } from "next/server";
import { z } from "zod";

const submissionSchema = z.object({
  type: z.string().min(1),
  submitterName: z.string().min(2, "नाम कम से कम 2 अक्षरों का होना चाहिए"),
  contact: z.string().optional().nullable(),
  content: z.string().min(5, "विवरण कम से कम 5 अक्षरों का होना चाहिए"),
  consent: z.boolean().refine((val) => val === true, "सहमति आवश्यक है"),
});

// In-memory / server-side persistence store for submissions
// eslint-disable-next-line prefer-const
let submissionsStore: Array<{
  id: string;
  type: string;
  submitterName: string;
  contact?: string | null;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}> = [
  {
    id: "sub-101",
    type: "info",
    submitterName: "राम प्रसाद सिंह (वार्ड 4)",
    contact: "9835xxxxxx",
    content: "नारंगा प्राथमिक स्वास्थ्य उपकेंद्र में प्रत्येक बुधवार को नियमित बाल टीकाकरण सत्र आयोजित होता है।",
    status: "approved",
    createdAt: "2026-10-10T10:30:00.000Z",
  },
  {
    id: "sub-102",
    type: "photo",
    submitterName: "मोहम्मद इरफ़ान",
    contact: "9934xxxxxx",
    content: "नारंगा बाजार मुख्य चौक और ऐतिहासिक दुर्गा मंदिर परिसर की नई उच्च-रिज़ॉल्यूशन तस्वीर प्रस्तुत की गई है।",
    status: "pending",
    createdAt: "2026-10-12T14:15:00.000Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: submissionsStore,
  });
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = submissionSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;
    const newSubmission = {
      id: `sub-${Date.now()}`,
      type: data.type,
      submitterName: data.submitterName,
      contact: data.contact || null,
      content: data.content,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    submissionsStore.unshift(newSubmission);

    return NextResponse.json(
      {
        success: true,
        message: "प्रविष्टि सफलतापूर्वक सहेज ली गई",
        data: newSubmission,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "सर्वर त्रुटि" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const json = await req.json();
    const { id, status } = json;
    const item = submissionsStore.find((s) => s.id === id);
    if (!item) {
      return NextResponse.json({ success: false, message: "प्रविष्टि नहीं मिली" }, { status: 404 });
    }
    item.status = status;
    return NextResponse.json({ success: true, data: item });
  } catch {
    return NextResponse.json({ success: false, message: "अद्यतन त्रुटि" }, { status: 500 });
  }
}
