// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { PlusCircle, MinusCircle } from "lucide-react";

// interface Question {
//   text: string;
//   suggestions: string[];
// }

// interface Step {
//   title: string;
//   questions: Question[];
// }

// export default function CreateForm({ setForm }: any) {
//   const [formTitle, setFormTitle] = useState("");
//   const [steps, setSteps] = useState<Step[]>([
//     { title: "Étape 1", questions: [{ text: "", suggestions: [] }] },
//   ]);

//   const addStep = () => {
//     setSteps([
//       ...steps,
//       {
//         title: `Étape ${steps.length + 1}`,
//         questions: [{ text: "", suggestions: [] }],
//       },
//     ]);
//   };

//   const removeStep = (stepIndex: number) => {
//     setSteps(steps.filter((_, index) => index !== stepIndex));
//   };

//   const addQuestion = (stepIndex: number) => {
//     const newSteps = [...steps];
//     newSteps[stepIndex].questions.push({ text: "", suggestions: [] });
//     setSteps(newSteps);
//   };

//   const removeQuestion = (stepIndex: number, questionIndex: number) => {
//     const newSteps = [...steps];
//     newSteps[stepIndex].questions = newSteps[stepIndex].questions.filter(
//       (_, index) => index !== questionIndex
//     );
//     setSteps(newSteps);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setForm({ formTitle, steps });
//     console.log({ formTitle, steps });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           Créez Votre Formulaire
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <Input
//             type="text"
//             value={formTitle}
//             onChange={(e) => setFormTitle(e.target.value)}
//             placeholder="Titre du Formulaire"
//             className="text-xl font-semibold"
//           />
//           {steps.map((step, stepIndex) => (
//             <div
//               key={stepIndex}
//               className="space-y-4 p-6 bg-gray-50 rounded-lg relative"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <Input
//                   type="text"
//                   value={step.title}
//                   onChange={(e) => {
//                     const newSteps = [...steps];
//                     newSteps[stepIndex].title = e.target.value;
//                     setSteps(newSteps);
//                   }}
//                   placeholder="Titre de l'Étape"
//                   className="text-lg font-medium w-full max-w-xs"
//                 />
//                 {steps.length > 1 && (
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => removeStep(stepIndex)}
//                     className="absolute top-2 right-2"
//                   >
//                     <MinusCircle className="h-5 w-5" />
//                   </Button>
//                 )}
//               </div>
//               {step.questions.map((question, questionIndex) => (
//                 <div
//                   key={questionIndex}
//                   className="space-y-4 p-4 bg-white rounded-lg shadow"
//                 >
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-md font-medium">
//                       Question {questionIndex + 1}
//                     </h3>
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => removeQuestion(stepIndex, questionIndex)}
//                     >
//                       <MinusCircle className="h-5 w-5" />
//                     </Button>
//                   </div>
//                   <Input
//                     type="text"
//                     value={question.text}
//                     onChange={(e) => {
//                       const newSteps = [...steps];
//                       newSteps[stepIndex].questions[questionIndex].text =
//                         e.target.value;
//                       setSteps(newSteps);
//                     }}
//                     placeholder="Texte de la Question"
//                   />
//                   <Textarea
//                     value={question.suggestions.join("\n")}
//                     onChange={(e) => {
//                       const newSteps = [...steps];
//                       newSteps[stepIndex].questions[questionIndex].suggestions =
//                         e.target.value.split("\n");
//                       setSteps(newSteps);
//                     }}
//                     placeholder="Suggestions (une par ligne)"
//                   />
//                 </div>
//               ))}
//               <Button
//                 type="button"
//                 onClick={() => addQuestion(stepIndex)}
//                 className="w-full bg-blue-100 text-blue-600 hover:bg-blue-200"
//               >
//                 <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une Question
//               </Button>
//             </div>
//           ))}
//           <Button
//             type="button"
//             onClick={addStep}
//             className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
//           >
//             <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une Étape
//           </Button>
//           <Button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//           >
//             Créer le Formulaire
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PlusCircle,
  MinusCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  text: string;
  suggestions: string[];
}

interface Step {
  title: string;
  questions: Question[];
}

export default function CreateForm({ setForm }: any) {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("Nouveau Formulaire");
  const [steps, setSteps] = useState<Step[]>([
    { title: "Étape 1", questions: [{ text: "", suggestions: [] }] },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const addStep = () => {
    setSteps([
      ...steps,
      {
        title: `Étape ${steps.length + 1}`,
        questions: [{ text: "", suggestions: [] }],
      },
    ]);
    setCurrentStep(steps.length);
  };

  const addQuestion = () => {
    const newSteps = [...steps];
    newSteps[currentStep].questions.push({ text: "", suggestions: [] });
    setSteps(newSteps);
  };

  const removeQuestion = (questionIndex: number) => {
    const newSteps = [...steps];
    newSteps[currentStep].questions.splice(questionIndex, 1);
    setSteps(newSteps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ title: formTitle, steps });
    console.log({ formTitle, steps });

    alert("Formulaire créé avec succès !");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Créer Votre Formulaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Titre du Formulaire"
                className="text-xl font-semibold"
              />

              <Card>
                <CardHeader>
                  <Input
                    type="text"
                    value={steps[currentStep].title}
                    onChange={(e) => {
                      const newSteps = [...steps];
                      newSteps[currentStep].title = e.target.value;
                      setSteps(newSteps);
                    }}
                    placeholder="Titre de l'Étape"
                    className="font-semibold"
                  />
                </CardHeader>
                <CardContent className="space-y-4">
                  {steps[currentStep].questions.map(
                    (question, questionIndex) => (
                      <Card key={questionIndex}>
                        <CardContent className="space-y-2 pt-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">
                              Question {questionIndex + 1}
                            </h3>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeQuestion(questionIndex)}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                          <Input
                            type="text"
                            value={question.text}
                            onChange={(e) => {
                              const newSteps = [...steps];
                              newSteps[currentStep].questions[
                                questionIndex
                              ].text = e.target.value;
                              setSteps(newSteps);
                            }}
                            placeholder="Texte de la question"
                          />
                          <Textarea
                            value={question.suggestions.join("\n")}
                            onChange={(e) => {
                              const newSteps = [...steps];
                              newSteps[currentStep].questions[
                                questionIndex
                              ].suggestions = e.target.value.split("\n");
                              setSteps(newSteps);
                            }}
                            placeholder="Suggestions (une par ligne)"
                          />
                        </CardContent>
                      </Card>
                    )
                  )}
                  <Button
                    type="button"
                    onClick={addQuestion}
                    className="w-full"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une Question
                  </Button>
                </CardContent>
              </Card>
              {/* <div className="flex justify-between items-center mb-4">
                <Button
                  type="button"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  variant="outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
                </Button>
                <span className="text-sm font-medium text-gray-500">
                  Étape {currentStep + 1} sur {steps.length}
                </span>
                <Button
                  type="button"
                  onClick={() =>
                    setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                  }
                  disabled={currentStep === steps.length - 1}
                  variant="outline"
                >
                  Suivant <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div> */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  type="button"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
                </Button>
                <div className="flex-1 px-4 overflow-x-auto">
                  <div
                    className="flex overflow-x-auto space-x-2 py-2 no-scrollbar"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {steps.map((_, index) => (
                      <Button
                        key={index}
                        type="button"
                        onClick={() => setCurrentStep(index)}
                        className={`flex-shrink-0 ${
                          currentStep === index
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                        style={{ scrollSnapAlign: "start" }}
                      >
                        Étape {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                  }
                  disabled={currentStep === steps.length - 1}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Suivant <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between">
                <Button type="button" onClick={addStep} variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une Étape
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Créer le Formulaire
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
