import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateForm from "./pages/CreateForm";
import Form from "./pages/Form";
import { useState } from "react";

export default function App() {
  const [form, setForm] = useState<{
    title: string;
    steps: {
      title: string;
      questions: {
        suggestions: any[];
        text: string;
      }[];
    }[];
  } | null>(null);

  const [exportData, setExportData] = useState<
    { step: number; question: string; answer: string }[]
  >([]);

  const handleExport = (
    data: { step: number; question: string; answer: string }[]
  ) => {
    setExportData(data);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-form" element={<CreateForm setForm={setForm} />} />
        <Route
          path="/form"
          element={<Form form={form} exportData={handleExport} />}
        />
      </Routes>
    </Router>
  );
}
