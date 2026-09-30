"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Building2, MapPin, Phone, Users, Save } from "lucide-react";
import Link from "next/link";
import { District, Premise } from "@/lib/models";
import Spinner from "../base/Spinner";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FormFields = {
  name: string;
  address: string;
  number: string;
  district: string | null;
  premiseType: string;
  contact_person: string;
  contact_number: string;
  location: string;
  occupants: number;
  status: string;
  remarks: string;
};

type Props = {
  premise?: Premise | null;
  districts: District[];
};

const premiseTypes = [
  "Household",
  "Institution",
  "Staff Accommodation",
  "Commercial Premise",
  "Government Facility",
  "Other",
];

const statuses = ["active", "inactive"];

export default function PremiseForm({ premise, districts = [] }: Props) {
  const DEFAULT_VALUES: FormFields = {
    name: premise?.name || "",
    address: premise?.address || "",
    number: premise?.number || "",
    district: premise?.district.id || null,
    premiseType: premise?.premiseType || "",
    contact_person: premise?.contact_person || "",
    contact_number: premise?.contact_number || "",
    location: premise?.location || "",
    occupants: premise?.occupants || 0,
    status: premise?.status || "active",
    remarks: premise?.remarks || "",
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (premise == null) {
      const response = await fetch("/api/premises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/premises";
      }
    } else {
      const response = await fetch(`/api/premises/${premise.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/premises";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          {/* Basic Information */}
          <section className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <Building2 className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Basic Information
                  </h2>
                  <p className="text-xs text-gray-500">
                    General information about the premise.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              {/* Name */}
              <div className="md:col-span-2">
                <Field>
                  <FieldLabel htmlFor="name">Premise Name</FieldLabel>

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
              </div>

              {/* Premise Type */}
              <div>
                <Field>
                  <FieldLabel htmlFor="premiseType">Premise Type</FieldLabel>

                  <Controller
                    name="premiseType"
                    control={control}
                    rules={{
                      required: "Premise type is required",
                    }}
                    render={({ field, fieldState }) => {
                      const selectedType = premiseTypes.find(
                        (item) => item === field.value,
                      );

                      return (
                        <div>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger id="premiseType" className="w-full">
                              <SelectValue placeholder="Select premise type">
                                {selectedType}
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Premise Type</SelectLabel>

                                {premiseTypes.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>

                          {fieldState.error && (
                            <p className="mt-1 text-sm text-red-500">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </Field>
              </div>

              {/* District */}
              <div>
                <Field>
                  <FieldLabel htmlFor="district">District</FieldLabel>

                  <Controller
                    name="district"
                    control={control}
                    rules={{
                      required: "District is required",
                    }}
                    render={({ field, fieldState }) => {
                      const selectedDistrict = districts.find(
                        (item) => item.id === field.value,
                      );

                      return (
                        <div>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger id="district" className="w-full">
                              <SelectValue placeholder="Select district">
                                {selectedDistrict?.name}
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>District</SelectLabel>

                                {districts.map((item) => (
                                  <SelectItem key={item.id} value={item.id}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>

                          {fieldState.error && (
                            <p className="mt-1 text-sm text-red-500">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </Field>
              </div>

              {/* Number */}
              <div>
                <Field>
                  <FieldLabel htmlFor="number">Premise Number</FieldLabel>

                  <Input
                    {...register("number", {
                      required: "Premise number is required",
                    })}
                    type="text"
                    placeholder="Enter number..."
                    id="number"
                  />

                  {errors.number && (
                    <FieldDescription className="text-red-500 text-sm">
                      {errors.number.message}
                    </FieldDescription>
                  )}
                </Field>
              </div>

              {/* Occupants */}
              <div>
                <Field className="mb-5">
                  <FieldLabel htmlFor="occupants">
                    Number of Occupants
                  </FieldLabel>

                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      {...register("occupants", {
                        required: "Occupants is required",
                        min: {
                          value: 1,
                          message: "Occupants must be at least 1",
                        },
                      })}
                      type="number"
                      id="occupants"
                      className="pl-9"
                    />
                  </div>

                  {errors.occupants && (
                    <FieldDescription className="text-red-500 text-sm">
                      {errors.occupants.message}
                    </FieldDescription>
                  )}
                </Field>
              </div>
            </div>
          </section>

          {/* Address & Location */}
          <section className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <MapPin className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Address & Location
                  </h2>
                  <p className="text-xs text-gray-500">
                    Location details of the premise.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              {/* Address */}
              <div className="md:col-span-2">
                <Field>
                  <FieldLabel htmlFor="address">Address</FieldLabel>

                  <Input
                    {...register("address", {
                      required: "Address is required",
                    })}
                    type="text"
                    placeholder="Enter address..."
                    id="address"
                  />

                  {errors.address && (
                    <FieldDescription className="text-red-500 text-sm">
                      {errors.address.message}
                    </FieldDescription>
                  )}
                </Field>
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <Field>
                  <FieldLabel htmlFor="location">Location</FieldLabel>

                  <Input
                    {...register("location")}
                    type="text"
                    placeholder="Enter location..."
                    id="location"
                  />
                </Field>
              </div>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Contact Information */}
          <section className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <Phone className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Contact Information
                  </h2>
                  <p className="text-xs text-gray-500">
                    Contact details for this premise.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              {/* Contact Person */}
              <div>
                <Field>
                  <FieldLabel htmlFor="contact_person">
                    Contact Person
                  </FieldLabel>

                  <Input
                    {...register("contact_person", {
                      required: "Contact Person is required",
                    })}
                    type="text"
                    placeholder="Enter contact person..."
                    id="contact_person"
                  />

                  {errors.contact_person && (
                    <FieldDescription className="text-red-500 text-sm">
                      {errors.contact_person.message}
                    </FieldDescription>
                  )}
                </Field>
              </div>

              {/* Contact Number */}
              <div>
                <Field>
                  <FieldLabel htmlFor="contact_number">
                    Contact Number
                  </FieldLabel>

                  <Input
                    {...register("contact_number", {
                      required: "Contact number is required",
                    })}
                    type="text"
                    placeholder="Enter name..."
                    id="contact_number"
                  />

                  {errors.contact_number && (
                    <FieldDescription className="text-red-500 text-sm">
                      {errors.contact_number.message}
                    </FieldDescription>
                  )}
                </Field>
              </div>
            </div>
          </section>

          {/* Status & Remarks */}
          <section className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-gray-900">
                Additional Information
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Status and additional notes about the premise.
              </p>
            </div>

            <div className="space-y-5 p-6">
              {/* Status */}
              <div>
                <Field>
                  <FieldLabel htmlFor="premiseType">Status</FieldLabel>

                  <Controller
                    name="status"
                    control={control}
                    rules={{
                      required: "Status is required",
                    }}
                    render={({ field, fieldState }) => {
                      const selectedStatus = statuses.find(
                        (item) => item === field.value,
                      );

                      return (
                        <div>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger id="status" className="w-full">
                              <SelectValue placeholder="Select status">
                                {selectedStatus}
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>

                                {statuses.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>

                          {fieldState.error && (
                            <p className="mt-1 text-sm text-red-500">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </Field>
              </div>

              {/* Remarks */}
              <div>
                <Field>
                  <FieldLabel htmlFor="remarks">Remark</FieldLabel>

                  <Input
                    {...register("remarks")}
                    type="text"
                    placeholder="Enter remarks..."
                    id="remarks"
                  />
                </Field>
              </div>
            </div>
          </section>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Link
            href="/premises"
            className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>

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
      </div>
    </form>
  );
}
