import { LoginForm } from "./LoginForm";

export const metadata = { title: "Admin Login" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-12">
      <h1 className="font-display text-2xl font-bold text-stone-900">Admin Login</h1>
      <p className="mt-1 text-sm text-stone-600">Sign in to manage site content.</p>
      <LoginForm from={from ?? "/admin"} />
    </div>
  );
}
