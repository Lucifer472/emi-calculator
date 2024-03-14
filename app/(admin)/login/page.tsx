import LoginForm from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/wrappers/form-wrapper";
import Link from "next/link";

const page = () => {
  const footer = (
    <p className="text-muted-foreground text-xs">
      Don&apos;t have an Account?
      <Button
        className="inline-block ml-1 pl-0"
        size={"sm"}
        variant={"link"}
        asChild
      >
        <Link href={"/"}>Contact Us</Link>
      </Button>
    </p>
  );

  return (
    <section className="w-full min-h-screen bg-slate-100">
      <div className="global-container bg-white flex items-center justify-center w-full min-h-screen py-6">
        {/* <FormWrapper
          title="Add New User"
          label="This is form is for adding New User!"
        >
          <UserForm />
        </FormWrapper> */}
        <FormWrapper
          title="Login to your account"
          label="Please enter your credentials below."
          footer={footer}
        >
          <LoginForm />
        </FormWrapper>
      </div>
    </section>
  );
};

export default page;
