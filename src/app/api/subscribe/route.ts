import { NextResponse } from "next/server";

type SubscribeBody = {
  email?: string;
  name?: string;
  message?: string;
  type?: "newsletter" | "contact";
};

// In-memory хранилище заявок (демо). В проде — заменить на БД или email-сервис.
const store: Array<SubscribeBody & { at: string }> = [];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный JSON" },
      { status: 400 },
    );
  }

  const type = body.type ?? "newsletter";
  const email = (body.email ?? "").trim().toLowerCase();
  const name = (body.name ?? "").trim();
  const message = (body.message ?? "").trim();

  // Валидация email
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Введите корректный email" },
      { status: 422 },
    );
  }

  // Контактная форма требует сообщение
  if (type === "contact") {
    if (name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Имя слишком короткое" },
        { status: 422 },
      );
    }
    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Сообщение должно быть не короче 10 символов" },
        { status: 422 },
      );
    }
  }

  // Антиспам: не больше 5 заявок с одного адреса в памяти
  const fromEmail = store.filter((s) => s.email === email).length;
  if (fromEmail >= 5) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок с этого email" },
      { status: 429 },
    );
  }

  store.push({ email, name, message, type, at: new Date().toISOString() });

  return NextResponse.json(
    {
      ok: true,
      message:
        type === "newsletter"
          ? "Подписка оформлена! Мы будем присылать обновления экосистемы."
          : "Сообщение отправлено! Ответим в ближайшее время.",
      total: store.length,
    },
    { status: 200 },
  );
}

export async function GET() {
  // Только для отладки/демо — показывает количество заявок без раскрытия данных
  return NextResponse.json({
    ok: true,
    total: store.length,
    newsletter: store.filter((s) => s.type === "newsletter").length,
    contact: store.filter((s) => s.type === "contact").length,
  });
}
