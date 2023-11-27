import SignupForm from "@/src/components/auth/client/SignupForm";

export default async function SignupPage() {
  return (
    <main className="max-w-[1200px] flex flex-col items-center">
      <SignupForm />
    </main>
  );
}
