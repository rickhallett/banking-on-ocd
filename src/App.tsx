import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

function App() {
  const [struggle, setStruggle] = useState(5);
  const [duration, setDuration] = useState(5);
  const [frequency, setFrequency] = useState(5);
  const [daysApplied, setDaysApplied] = useState(180);
  const [learningMultiplier, setLearningMultiplier] = useState(3);

  const calculateResponse = () => {
    return struggle * duration * frequency;
  };

  const calculateCumulativeEffect = () => {
    const response = calculateResponse();
    const dailyMultiplier = 1 + learningMultiplier / 100;
    return response * ((Math.pow(dailyMultiplier, daysApplied) - 1) / (dailyMultiplier - 1));
  };

  const addNumberSeparator = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const convertDaysAppliedToDaysMonthsAndYears = (days: number) => {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;

    const parts = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
    if (remainingDays > 0) parts.push(`${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`);

    return parts.join(', ');
  };

  const response = calculateResponse();
  const cumulativeEffect = calculateCumulativeEffect();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            OCD Recovery Simulator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Visualize your recovery journey through data
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Parameters</span>
              <Info className="w-4 h-4 text-gray-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <SliderGroup
              label="Struggle Intensity"
              description="Rate the intensity of your struggles"
              value={struggle}
              onChange={setStruggle}
              min={1}
              max={10}
            />
            <SliderGroup
              label="Duration"
              description="How long each episode typically lasts"
              value={duration}
              onChange={setDuration}
              min={1}
              max={10}
            />
            <SliderGroup
              label="Frequency"
              description="How often episodes occur"
              value={frequency}
              onChange={setFrequency}
              min={1}
              max={10}
            />
            <SliderGroup
              label="Time Period"
              description="Number of days to simulate"
              value={daysApplied}
              onChange={setDaysApplied}
              min={1}
              max={365}
            />
            <SliderGroup
              label="Learning Rate"
              description="Daily improvement percentage"
              value={learningMultiplier}
              onChange={setLearningMultiplier}
              min={1}
              max={10}
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Daily Response Score
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {addNumberSeparator(response)}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Cumulative Effect
              </h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {addNumberSeparator(Math.round(cumulativeEffect))}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Over {convertDaysAppliedToDaysMonthsAndYears(daysApplied)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SliderGroup({
  label,
  description,
  value,
  onChange,
  min,
  max
}: {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <Label className="text-sm font-medium">
          {label}
        </Label>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {value}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(val) => onChange(val[0])}
        className="mt-2"
      />
    </div>
  );
}

export default App;