import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 lg:p-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            OCD Recovery Simulator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Visualize your recovery journey through data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <span>Parameters</span>
                {/* <Info className="w-5 h-5 text-gray-400" /> */}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <SliderGroup
                label="Struggle Intensity"
                description="The difficulty of the exposure exercise"
                value={struggle}
                onChange={setStruggle}
                min={1}
                max={10}
              />
              <SliderGroup
                label="Duration"
                description="The duration of the exposure exercise"
                value={duration}
                onChange={setDuration}
                min={1}
                max={10}
              />
              <SliderGroup
                label="Frequency"
                description="How often the exposure exercise is performed"
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
                max={5}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl">Simulation Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
                <h3 className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Daily Response Score
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {addNumberSeparator(response)}
                </p>
              </div>

              <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
                <h3 className="text-base font-medium text-gray-500 dark:text-gray-400">
                  Cumulative Effect
                </h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {addNumberSeparator(Math.round(cumulativeEffect))}
                </p>
                <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
                  Over {convertDaysAppliedToDaysMonthsAndYears(daysApplied)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
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
    <div className="space-y-3">
      <div className="flex justify-between items-baseline">
        <Label className="text-base font-medium">
          {label}
        </Label>
        <span className="text-base font-bold text-blue-600 dark:text-blue-400">
          {value}
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(val) => onChange(val[0])}
        className="mt-3"
      />
    </div>
  );
}

export default App;