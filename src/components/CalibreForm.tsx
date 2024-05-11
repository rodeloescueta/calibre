"use client";
import { createContext, useContext, useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/lib/formSchema";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "./ui/toaster";
import { LoadingSpinner } from "./LoadingSpinner";

export default function CalibreForm({ data }) {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(-1);
  const [addons, setAddons] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    if (data) {
      setServices(
        data
          .map((el) => {
            return {
              id: el.id,
              name: el.name,
              price: parseFloat(el.price),
              story: el.tags_info?.[0].id || -1,
            };
          })
          .filter((el) => ![5, 7].includes(el.id))
      );
    }
  }, [data]);

  useEffect(() => {
    if (selectedService !== -1 && selectedService !== 6) {
      setAddons(data.find((el) => el.id === selectedService)?.extras);
    } else {
      setAddons([]);
    }
  }, [selectedService]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bookingDate: "",
      bookingTime: "",
      serviceType: -1,
      addons: [],
    },
  });
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Submitted",
      description: `${form.getValues("bookingDate")} Booked!`,
    });
  };
  const onSelectService = (id: number) => {
    form.setValue("serviceType", id);
    form.setValue("addons", []);
    setSelectedService(id);
    setSelectedAddons([]);
  };

  const onSelectAddons = (id: number) => {
    let oldAddons = [...selectedAddons];
    if (selectedAddons.includes(id)) {
      let i = selectedAddons.indexOf(id);
      setSelectedAddons(oldAddons.splice(i, 1));
      form.setValue("addons", oldAddons.splice(i, 1));
    } else {
      setSelectedAddons([...oldAddons, id]);
      form.setValue("addons", [...oldAddons, id]);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md w-full grid grid-cols-6 gap-4"
      >
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="col-span-3">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="bookingDate"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Booking Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="bookingTime"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Booking Time</FormLabel>
                  <FormControl>
                    <Input {...field} type="time" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="col-span-6">
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Service type</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {services.length > 0 ? (
                        services?.map((el) => (
                          <Card
                            key={el.id}
                            className={`cursor-pointer border-2 hover:border-blue-200 dark:border-gray-800 dark:hover:border-gray-50 ${
                              el.id === selectedService
                                ? "border-blue-300"
                                : "border-gray-200"
                            }`}
                            onClick={() => onSelectService(el.id)}
                          >
                            <CardContent className="flex flex-col items-center justify-center p-6">
                              <div className="text-center">
                                <div className="font-medium">{el.name}</div>
                                {el.story === 2 && (
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Double story
                                  </div>
                                )}
                              </div>
                            </CardContent>
                            <CardFooter>${el.price}</CardFooter>
                          </Card>
                        ))
                      ) : (
                        <LoadingSpinner />
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        {addons.length > 0 && (
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="addons"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Addons</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {addons?.map((el) => (
                          <Card
                            key={el.id}
                            className={`cursor-pointer border-2 hover:border-blue-200 dark:border-gray-800 dark:hover:border-gray-50 ${
                              selectedAddons.includes(el.id)
                                ? "border-blue-300"
                                : "border-gray-200"
                            }`}
                            onClick={() => onSelectAddons(el.id)}
                          >
                            <CardContent className="flex flex-col items-center justify-center p-6">
                              <div className="text-center">
                                <div className="font-medium">{el.name}</div>
                              </div>
                            </CardContent>
                            <CardFooter>${el.price}</CardFooter>
                          </Card>
                        ))}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        )}
        <div className="col-span-6"></div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
        <Toaster />
      </form>
    </Form>
  );
}
