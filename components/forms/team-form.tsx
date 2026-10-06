"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team } from "@/lib/models";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";
import Spinner from "../base/Spinner";
import { Save } from "lucide-react";

type FormFields = {
  name: string;
  short_name: string;
  logo: string;
};

type Props = {
  team?: Team | null;
  closeSheet: () => void;
};

export default function TeamForm({ closeSheet, team }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: team?.name || "",
      short_name: team?.short_name || "",
      logo: team?.logo || "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (team == null) {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        //window.location.href = "/admin/teams";
      }
    } else {
      const response = await fetch(`/api/teams/${team.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        //window.location.href = "/admin/teams";
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("File upload response:", data.data.key);
      const filename = `${data.data.key}.webp`;

      setValue("logo", filename, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field>
        <FieldLabel htmlFor="name">Team Name</FieldLabel>

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

      <Field>
        <FieldLabel htmlFor="short_name">Short Name</FieldLabel>

        <Input
          {...register("short_name", {
            required: "Short name is required",
          })}
          type="text"
          placeholder="Enter short name..."
          id="short_name"
        />

        {errors.short_name && (
          <FieldDescription className="text-red-500 text-sm">
            {errors.short_name.message}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="short_name">Short Name</FieldLabel>

        <Input onChange={handleFileChange} type="file" id="logo" />

        <Input
          {...register("logo", {
            required: "Logo is required",
          })}
          type="hidden"
        />

        {errors.logo && (
          <FieldDescription className="text-red-500 text-sm">
            {errors.logo.message}
          </FieldDescription>
        )}
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
          Save Team
        </button>
      </div>
    </form>
  );
}
