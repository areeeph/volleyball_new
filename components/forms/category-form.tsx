"use client";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import Spinner from "../base/Spinner";
import { WasteCategory } from "@/lib/models";
import { Save } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";

export type FormFields = {
  name: string;
  parentCategory: string | null;
  status: string;
};

type Props = {
  category: WasteCategory | null;
  categories: WasteCategory[];
  closeSheet: () => void;
};

export default function CategoryForm({
  category,
  closeSheet,
  categories,
}: Props) {
  const [isSub, setIsSub] = useState(false);

  const DEFAULT_VALUES: FormFields = {
    name: category?.name || "",
    parentCategory: category?.parentCategory?.id || null,
    status: category?.status || "active",
  };

  const filteredCategories = categories.filter(
    (cat: WasteCategory) => cat.parentCategory == null,
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (category == null) {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/waste-categories";
      }
    } else {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/waste-categories";
      }
    }
  };

  const switchHandler = () => {
    setIsSub(!isSub);
    setValue("parentCategory", null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center space-x-2 mb-5 border-b pb-5">
        <Switch
          id="airplane-mode"
          checked={isSub}
          onCheckedChange={switchHandler}
        />
        <Label htmlFor="airplane-mode">Sub Category</Label>
      </div>

      {/* Sub Category */}
      {isSub && (
        <Field className="mb-5">
          <FieldLabel htmlFor="parentCategory">Parent Category</FieldLabel>

          <Controller
            name="parentCategory"
            control={control}
            render={({ field }) => {
              const selectedCategory = filteredCategories.find(
                (item) => item.id === field.value,
              );

              return (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="parentCategory" className="w-full">
                    <SelectValue placeholder="Select category">
                      {selectedCategory?.name}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>

                      {filteredCategories.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />
        </Field>
      )}

      {/* Category Name */}
      <Field className="mb-5">
        <FieldLabel htmlFor="name">Category Name</FieldLabel>

        <Input
          {...register("name", {
            required: "Name is required",
          })}
          type="text"
          placeholder="Enter name..."
          id="name"
        />

        {errors.name && (
          <FieldDescription className="text-red-500 text-sm">
            {errors.name.message}
          </FieldDescription>
        )}
      </Field>

      {/* Status */}
      <Field className="mb-5">
        <FieldLabel htmlFor="status">Status</FieldLabel>

        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            const selectedCategory = filteredCategories.find(
              (item) => item.id === field.value,
            );

            return (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select category">
                    {selectedCategory?.name}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>

                    {filteredCategories.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            );
          }}
        />
      </Field>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={closeSheet}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Category
        </button>
      </div>
    </form>
  );
}
