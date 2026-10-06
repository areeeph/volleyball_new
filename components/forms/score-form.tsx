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
import { Button } from "@/components/ui/button";
import { Team, Score, Set } from "@/lib/models";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";
import Spinner from "../base/Spinner";
import { Save } from "lucide-react";

type FormFields = {
  sets: Set[];
  current_set: number;
  team1: string;
  team2: string;
  team1_score: number;
  team2_score: number;
};

type Props = {
  score: Score;
  teams: Team[];
};

export default function ScoreForm({ teams, score }: Props) {
  const [set, setSet] = useState<number>(score?.current_set || 1);
  const [score1, setScore1] = useState<number>(
    score?.sets[set - 1]?.team1_score || 0,
  );
  const [score2, setScore2] = useState<number>(
    score?.sets[set - 1]?.team2_score || 0,
  );

  const [sets, setSets] = useState<Set[]>(score?.sets || []);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      current_set: score?.current_set || 1,
      team1: score?.team1?.id || "",
      team2: score?.team2?.id || "",
      team1_score: score1,
      team2_score: score2,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (getValues("current_set") !== score.current_set) {
      const response = await fetch(`/api/scores/${score.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/admin/score";
      }
    } else {
      console.log("Submitting data:", data);
      const response = await fetch(`/api/scores/${score.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        //window.location.href = "/score";
      }
    }
  };

  const plus = (num: number) => {
    if (num === 1) {
      console.log(score1);
      setScore1(score1 + Number(1));
      setValue("team1_score", score1 + Number(1));
    } else {
      setScore2(score2 + Number(1));
      setValue("team2_score", score2 + Number(1));
    }
    console.log(getValues("current_set"));
    handleSubmit(onSubmit)();
  };

  const minus = (num: number) => {
    if (num === 1) {
      setScore1(score1 - Number(1));
      setValue("team1_score", score1 - Number(1));
    } else {
      setScore2(score2 - Number(1));
      setValue("team2_score", score2 - Number(1));
    }
    console.log(getValues("current_set"));
    handleSubmit(onSubmit)();
  };

  const addSet = () => {
    console.log("Adding set");
    setSet(set + 1);
    setValue("current_set", set + 1);
    handleSubmit(onSubmit)();
  };

  const deleteSet = () => {
    console.log("Deleting set");
    setSet(set - 1);
    setValue("current_set", set - 1);
    handleSubmit(onSubmit)();
  };

  const updateTeam = () => {
    console.log("Updating team");
    handleSubmit(onSubmit)();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {" "}
              1{" "}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Team 1</h3>
              <p className="text-xs text-gray-500">First team</p>
            </div>
          </div>
          <Field className="mb-5">
            <FieldLabel htmlFor="team1">Team Name</FieldLabel>

            <Controller
              name="team1"
              control={control}
              rules={{
                required: "Team 1 is required",
              }}
              render={({ field }) => {
                const selectedTeam = teams.find(
                  (item) => item.id === field.value,
                );

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

          <Field>
            <FieldLabel htmlFor="team1_score">Score</FieldLabel>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={score1 <= 0}
                onClick={() => minus(1)}
                className="h-9 w-14 flex items-center justify-center rounded-md bg-white border"
              >
                -
              </button>

              <Input
                {...register("team1_score", {
                  required: "Score is required",
                })}
                disabled
                type="number"
                placeholder="Enter score..."
                id="team1_score"
                className="disabled:bg-white disabled:opacity-100"
              />

              <button
                type="button"
                onClick={() => plus(1)}
                className="h-9 w-14 flex items-center justify-center rounded-md bg-gray-800 text-white border "
              >
                +
              </button>

              {errors.team1_score && (
                <FieldDescription className="text-red-500 text-sm">
                  {errors.team1_score.message}
                </FieldDescription>
              )}
            </div>
          </Field>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {" "}
              1{" "}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Team 2</h3>
              <p className="text-xs text-gray-500">Second team</p>
            </div>
          </div>
          <Field className="mb-5">
            <FieldLabel htmlFor="team2">Team Name</FieldLabel>

            <Controller
              name="team2"
              control={control}
              rules={{
                required: "Team 2 is required",
              }}
              render={({ field }) => {
                const selectedTeam = teams.find(
                  (item) => item.id === field.value,
                );

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

            {errors.team2 && <FieldError>{errors.team2.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="team2_score">Score</FieldLabel>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={score2 <= 0}
                onClick={() => minus(2)}
                className="h-9 w-14 flex items-center justify-center rounded-md bg-white border"
              >
                -
              </button>

              <Input
                {...register("team2_score", {
                  required: "Score is required",
                })}
                disabled
                type="number"
                placeholder="Enter score..."
                id="team2_score"
                className="disabled:bg-white disabled:opacity-100"
              />

              <button
                type="button"
                onClick={() => plus(2)}
                className="h-9 w-14 flex items-center justify-center rounded-md bg-gray-800 text-white border "
              >
                +
              </button>

              {errors.team2_score && (
                <FieldDescription className="text-red-500 text-sm">
                  {errors.team2_score.message}
                </FieldDescription>
              )}
            </div>
          </Field>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-start gap-3 mb-10">
        <button
          type="button"
          onClick={() => updateTeam()}
          className="inline-flex items-center justify-center rounded-xl border border-gray-800 bg-gray-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
        >
          Update Team
        </button>
        <button
          type="button"
          disabled={sets.length >= 5}
          onClick={() => addSet()}
          className="inline-flex items-center justify-center rounded-xl border border-blue-700 bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Add Set
        </button>
        <button
          type="button"
          disabled={sets.length == 0}
          onClick={() => deleteSet()}
          className="inline-flex items-center justify-center rounded-xl border border-red-700 bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
        >
          Delete Set
        </button>
      </div>
    </form>
  );
}
