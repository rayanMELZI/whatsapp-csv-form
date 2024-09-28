import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  text: string;
  suggestions: string[];
}

interface Step {
  title: string;
  questions: Question[];
}

interface FormData {
  title: string;
  steps: Step[];
}

interface FormData_props {
  form: FormData | null;
}

export default function Form({ form }: FormData_props) {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(form);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire soumis :", answers);
    alert("Formulaire soumis ! Le téléchargement du CSV commencerait ici.");

    if (formData) {
      // Prepare CSV data
      const csvRows = [];
      csvRows.push(
        ["Step Number", "Step Title", "Question Text", "Answer"].join(",")
      );

      formData.steps.forEach((step, stepIndex) => {
        step.questions.forEach((question, questionIndex) => {
          const answer = answers[`${stepIndex}-${questionIndex}`] || ""; // Get the answer
          csvRows.push(
            [stepIndex + 1, step.title, question.text, answer].join(",")
          );
        });
      });

      // Join all rows into a single string
      const csvString = csvRows.join("\n");
      console.log(csvString);

      //Downloading..

      // Create a Blob from the CSV string
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${formData.title}.csv`); // Set the file name

      // Append to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up and remove the link
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Release the URL object
    }
  };

  if (!formData) {
    return (
      <div className="h-screen w-screen">
        Vous n'avez pas encore créé de formulaire.
      </div>
    );
  }

  const currentStepData = formData.steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            {formData.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {formData.steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-sm font-medium ${
                    index === currentStep ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${
                    ((currentStep + 1) / formData.steps.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                if (currentStep < formData.steps.length - 1) {
                  // Trigger the "Next" button click
                  setCurrentStep(currentStep + 1);
                } else {
                  // Submit the form if on the final step
                  handleSubmit(e);
                }
              }
            }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {currentStepData.title}
            </h2>
            {currentStepData.questions.map((question, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-medium">{question.text}</h3>
                {question.suggestions.length > 0 ? (
                  <Select
                    onValueChange={(value) =>
                      setAnswers({
                        ...answers,
                        [`${currentStep}-${index}`]: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une option" />
                    </SelectTrigger>
                    <SelectContent>
                      {question.suggestions.map(
                        (suggestion, i) =>
                          suggestion !== "" && (
                            <SelectItem key={i} value={suggestion}>
                              {suggestion}
                            </SelectItem>
                          )
                      )}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type="text"
                    value={answers[`${currentStep}-${index}`] || ""}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        [`${currentStep}-${index}`]: e.target.value,
                      })
                    }
                    placeholder="Votre réponse"
                  />
                )}
              </div>
            ))}
            <div className="flex justify-between">
              {currentStep > 0 && (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Précédent
                </Button>
              )}
              {currentStep < formData.steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep(currentStep + 1);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white ml-auto"
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white ml-auto"
                >
                  Soumettre et Télécharger CSV
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
