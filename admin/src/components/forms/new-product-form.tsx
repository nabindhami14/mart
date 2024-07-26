import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageUp, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { getCategories } from "@/api";
import { newProduct } from "@/api/vendor";
import Loading from "../loading";

// name, description, images, price, stock, categoryId, vendorId
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  price: z.string(),
  stock: z.string(),
  categoryId: z.string(),
  vendorId: z.string(),
  images: z.array(z.instanceof(File)).nullable(),
});

const NewProductForm = ({ vendorId }: { vendorId: string }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const mutation = useMutation({
    mutationFn: newProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [vendorId, "products"] });
      navigate(`/vendors/${vendorId}/dashboard/products`);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "10",
      stock: "10",
      categoryId: "1",
      vendorId,
      images: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = new FormData();

    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("stock", values.stock);
    data.append("categoryId", values.categoryId);
    data.append("vendorId", vendorId);

    if (values.images) {
      values.images.forEach((file) => data.append("images", file));
    }

    mutation.mutate(data);
  }

  if (isLoading) return <Loading />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data?.data.map((c) => (
                    <SelectItem value={String(c.id)}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                dropzoneOptions={{
                  multiple: true,
                  maxFiles: 3,
                  maxSize: 4 * 1024 * 1024,
                }}
                reSelect={true}
              >
                <FileInput
                  className={cn(
                    buttonVariants({
                      size: "icon",
                    }),
                    "size-8"
                  )}
                >
                  <ImageUp className="size-4" />
                  <span className="sr-only">Select your files</span>
                </FileInput>

                {field.value && field.value.length > 0 && (
                  <FileUploaderContent className="grid sm:grid-cols-4">
                    {field.value.map((file, i) => (
                      <FileUploaderItem
                        key={i}
                        index={i}
                        className="p-0 size-40"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover border rounded-md"
                        />
                      </FileUploaderItem>
                    ))}
                  </FileUploaderContent>
                )}
              </FileUploader>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending && (
            <Loader2 className="animate-spin w-5 h-5 mr-2" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewProductForm;
