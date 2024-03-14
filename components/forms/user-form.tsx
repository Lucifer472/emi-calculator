"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { UserSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Loader from "../wrappers/Loader";
import { useTransition } from "react";
import { createUserAction } from "@/actions/create-user";
import toast from "react-hot-toast";

export const UserForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      bio: "",
      dob: new Date("2000"),
      facebook: "",
      gender: "Male",
      img: "asd",
      instagram: "",
      linkedin: "",
      name: "",
      password: "",
      twitter: "",
      email: "",
    },
  });

  const handleSubmit = async (v: z.infer<typeof UserSchema>) => {
    startTransition(() => {
      createUserAction(v).then((res) => {
        if (res.success) {
          toast.success("User Created!");
          form.reset();
        } else {
          toast.error("something went wrong!");
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full min-w-[320px] xx:min-w-[400px] xs:min-w-[500px] sm:min-w-[600px] lg:min-w-[750px]"
      >
        {isPending && <Loader />}
        <div className="space-y-4 w-full">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label className=" text-gray-700">Name</Label>
                <FormControl className="w-full">
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label className="text-gray-700">Email</Label>
                <FormControl className="w-full">
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label className="text-gray-700">Password</Label>
                <FormControl className="w-full">
                  <Input
                    className="w-full"
                    type="password"
                    placeholder="**********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="bio"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label className="text-gray-700">Bio</Label>
                <FormControl className="w-full">
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="You are Bio!"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="dob"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label className="text-gray-700">Date of Birth:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="gender"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label className="text-gray-700">Select Gender</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            name="facebook"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label className="text-gray-700">Facebook</Label>
                <FormControl className="w-full">
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="Facebook"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="instagram"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label className="text-gray-700">Instagram</Label>
                <FormControl className="w-full">
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="Instagram"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="linkedin"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label className="text-gray-700">LinkedIn</Label>
                <FormControl className="w-full">
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="LinkedIn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="twitter"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-y-0 w-full">
                <Label className="text-gray-700">Twitter</Label>
                <FormControl className="w-full">
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="Twitter"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button size={"lg"} type="submit">
          Create User
        </Button>
      </form>
    </Form>
  );
};
