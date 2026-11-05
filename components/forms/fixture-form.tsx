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
import { Fixture, Team } from "@/lib/models";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";
import Spinner from "../base/Spinner";
import { Save } from "lucide-react";

type FormFields = {
  team1: string;
  team2: string;
  date: string;
  time: string;
  division: string;
};

type Props = {
  fixture?: Fixture | null;
  teams: Team[];
  closeSheet: () => void;
};

export default function FixtureForm({ closeSheet, fixture, teams }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      team1: fixture?.team1?.id || "",
      team2: fixture?.team2?.id || "",
      date: fixture?.date || "",
      time: fixture?.time || "",
      division: fixture?.division || "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (fixture == null) {
      const response = await fetch("/api/fixtures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/admin/fixtures";
      }
    } else {
      const response = await fetch(`/api/fixtures/${fixture.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/admin/fixtures";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field className="mb-5">
        <FieldLabel htmlFor="team1">Team 1</FieldLabel>

        <Controller
          name="team1"
          control={control}
          rules={{
            required: "Team 1 is required",
          }}
          render={({ field }) => {
            const selectedTeam = teams.find((item) => item.id === field.value);

            return (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="team1" className="w-full">
                  <SelectValue placeholder="Select Team 1">
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

        {errors.team1 && <FieldError>{errors.team1.message}</FieldError>}
      </Field>

      <Field className="mb-5">
        <FieldLabel htmlFor="team2">Team 2</FieldLabel>

        <Controller
          name="team2"
          control={control}
          rules={{
            required: "Team 2 is required",
          }}
          render={({ field }) => {
            const selectedTeam = teams.find((item) => item.id === field.value);

            return (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="team2" className="w-full">
                  <SelectValue placeholder="Select Team 2">
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

        {errors.team1 && <FieldError>{errors.team1.message}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="date">Date</FieldLabel>

        <Input
          {...register("date", {
            required: "Date is required",
          })}
          type="text"
          placeholder="Enter date..."
          id="date"
        />

        {errors.date && (
          <FieldDescription className="text-red-500 text-sm">
            {errors.date.message}
          </FieldDescription>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="division">Division</FieldLabel>

        <Input
          {...register("division", {
            required: "Division is required",
          })}
          type="text"
          placeholder="Enter division..."
          id="division"
        />

        {errors.division && (
          <FieldDescription className="text-red-500 text-sm">
            {errors.division.message}
          </FieldDescription>
        )}
      </Field>
      <Field>
        <FieldLabel htmlFor="time">Time</FieldLabel>

        <Input
          {...register("time", {
            required: "Time  is required",
          })}
          type="text"
          placeholder="Enter time..."
          id="time"
        />

        {errors.time && (
          <FieldDescription className="text-red-500 text-sm">
            {errors.time.message}
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
          Save Fixure
        </button>
      </div>
    </form>
  );
}
