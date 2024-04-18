import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LinkType } from "./NewLinkForm";
import Image from "next/image";

const LinkUrlList = () => {
  const form = useFormContext<LinkType>();
  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<LinkType>({
      name: "urls",
    });

  if (fields.length !== 0)
    return (
      <div className="w-full h-full border p-4 my-2 rounded-xl">
        <Tabs
          defaultValue={fields.at(0)?.provider}
          className=" flex items-start"
        >
          <TabsList orientation="vertical" className="min-w-fit">
            {fields.map((provider, index) => {
              return (
                <TabsTrigger
                  key={provider.provider}
                  value={provider.provider}
                  className="justify-start"
                >
                  {provider.icon && (
                    <Image
                      alt={`${provider.provider}_icon`}
                      height={20}
                      width={20}
                      src={provider.icon}
                    />
                  )}
                  <span className="ml-1">{provider.provider}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          <div className="ml-2 border rounded-xl p-2 w-full">
            {fields.map((provider, index) => {
              return (
                <TabsContent key={provider.id} value={provider.provider}>
                  <div key={index} className="flex flex-col gap-2 w-full">
                    <h3 className=" text-3xl flex items-center  font-bold">
                      {provider.icon && (
                        <Image
                          alt={`${provider.provider}_icon`}
                          height={40}
                          width={40}
                          src={provider.icon}
                        />
                      )}
                      <span className="ml-2">{provider.provider}</span>
                    </h3>
                    <FormField
                      control={form.control}
                      name={`urls.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Url</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`urls.${index}.buttonText`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Testo del pulsante</FormLabel>
                          <FormControl>
                            <Input placeholder={"Ascolta"} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              );
            })}
          </div>
          {/* {fields.map((field, index) => {
            return (
              <TabsContent key={field.id} value={field.id}>
                
              </TabsContent>
            );
          })} */}
        </Tabs>
      </div>
    );
};

export default LinkUrlList;
