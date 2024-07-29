import { SigninForm } from "@/src/entities/auth";
import AvailableUser from "@/src/entities/auth/components/AvailableUser";

const SigninPage = async () => {
  return (
    <main className="w-full max-w-[800px]">
      <SigninForm />
      <AvailableUser />
    </main>
  );
};

export default SigninPage;
