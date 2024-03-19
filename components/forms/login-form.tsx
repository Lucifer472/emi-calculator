"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { LoginSchema } from "@/schema";
import { Label } from "../ui/label";
import { FormControl } from "@mui/material";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginUser } from "@/actions/login-user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { redirect_path } from "@/routes";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = (v: z.infer<typeof LoginSchema>) => {
    LoginUser(v);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-[320px] max-w-[340px] space-y-4"
      >
        <div className="w-full space-y-2">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label>Email:</Label>
                <FormControl className="w-full">
                  <Input
                    type="email"
                    placeholder="john_doe"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label>Password:</Label>
                <FormControl className="w-full">
                  <Input
                    type="password"
                    placeholder="*******"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
          />
        </div>
        <Button type="submit" size={"lg"}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
