"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Schedule, WasteCategory } from "@/lib/models";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";
import Spinner from "../base/Spinner";
import { Save } from "lucide-react";

type FormFields = {
  sequenceId: number;
  category: string;
  days: string[];
  asRequired: boolean;
};

type Props = {
  schedule?: Schedule | null;
  categories: WasteCategory[];
  closeSheet: () => void;
};

const days = [
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
];

export default function ScheduleForm({
  categories,
  closeSheet,
  schedule,
}: Props) {
  const [switchOn, setSwitchOn] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      sequenceId: 0,
      category: "",
      days: [],
      asRequired: false,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (schedule == null) {
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/schedule";
      }
    } else {
      const response = await fetch(`/api/schedules/${schedule.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/schedule";
      }
    }
  };

  const switchHandler = () => {
    setSwitchOn(!switchOn);
    setValue("asRequired", !switchOn);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Category */}
      <Field>
        <FieldLabel htmlFor="category">Category</FieldLabel>

        <Controller
          name="category"
          control={control}
          rules={{
            required: "Category is required",
          }}
          render={({ field }) => {
            const selectedCategory = categories.find(
              (item) => item.id === field.value,
            );

            return (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category">
                    {selectedCategory?.name}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />

        {errors.category && <FieldError>{errors.category.message}</FieldError>}
      </Field>

      {/* Days */}
      <Field>
        <FieldLabel>Collection Days</FieldLabel>

        <div>
          {days.map((day) => (
            <Controller
              key={day.value}
              name="days"
              control={control}
              render={({ field }) => {
                const checked = field.value.includes(day.value);

                return (
                  <label
                    htmlFor={`day-${day.value}`}
                    className="flex cursor-pointer items-center gap-2 mb-2"
                  >
                    <Checkbox
                      id={`day-${day.value}`}
                      checked={checked}
                      onCheckedChange={(value) => {
                        if (value) {
                          field.onChange([...field.value, day.value]);
                        } else {
                          field.onChange(
                            field.value.filter((item) => item !== day.value),
                          );
                        }
                      }}
                    />

                    <span className="text-sm">{day.label}</span>
                  </label>
                );
              }}
            />
          ))}
        </div>

        {errors.days && <FieldError>{errors.days.message}</FieldError>}
      </Field>

      {/* As Required */}

      <div className="flex items-center space-x-2 mb-5 ">
        <Switch
          id="airplane-mode"
          checked={switchOn}
          onCheckedChange={switchHandler}
        />
        <Label htmlFor="airplane-mode">Collect as required</Label>
      </div>

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
          Save Schedule
        </button>
      </div>
    </form>
  );
}
