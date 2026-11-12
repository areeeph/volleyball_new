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
import { Position, Team } from "@/lib/models";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";
import Spinner from "../base/Spinner";
import { Save } from "lucide-react";

type FormFields = {
  team: string;
  title: string;
  name: string;
};

type Props = {
  position?: Position | null;
  teams: Team[];
  closeSheet: () => void;
};

export default function PositionForm({ closeSheet, position, teams }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      team: position?.team?.id || "",
      title: position?.title || "",
      name: position?.name || "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (position == null) {
      const response = await fetch("/api/positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/admin/position";
      }
    } else {
      const response = await fetch(`/api/positions/${position.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/admin/position";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field className="mb-5">
        <FieldLabel htmlFor="team">Team</FieldLabel>

        <Controller
          name="team"
          control={control}
          rules={{
            required: "Team is required",
          }}
          render={({ field }) => {
            const selectedTeam = teams.find((item) => item.id === field.value);

            return (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="team" className="w-full">
                  <SelectValue placeholder="Select Team">
                    {selectedTeam?.name}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />

        {errors.team && <FieldError>{errors.team.message}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="date">Title</FieldLabel>

        <Input
          {...register("title", {
            required: "Title is required",
          })}
          type="text"
          placeholder="Enter title..."
          id="title"
        />

        {errors.title && (
          <FieldDescription className="text-red-500 text-sm">
            {errors.title.message}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="division">Name</FieldLabel>

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
          Save Position
        </button>
      </div>
    </form>
  );
}
