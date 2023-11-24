import SigninForm from "@/src/components/auth/SigninForm";

export default async function SigninPage() {
  return (
    <main className="max-w-[1200px] flex flex-col items-center">
      <SigninForm />
    </main>
  );
}
