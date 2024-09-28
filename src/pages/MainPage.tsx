import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const translations = {
  fr: {
    title: "Application de Création de Formulaires",
    description:
      "Créez des formulaires personnalisés ou remplissez des formulaires existants avec notre plateforme facile à utiliser.",
    createForm: "Créer un Formulaire",
    fillForm: "Remplir un Formulaire",
    language: "Langue",
  },
  ar: {
    title: "تطبيق إنشاء النماذج",
    description:
      "قم بإنشاء نماذج مخصصة أو املأ النماذج الموجودة باستخدام منصتنا سهلة الاستخدام.",
    createForm: "إنشاء نموذج",
    fillForm: "ملء نموذج",
    language: "اللغة",
  },
  en: {
    title: "Form Builder Application",
    description:
      "Create custom forms or fill out existing ones with our easy-to-use platform.",
    createForm: "Create a Form",
    fillForm: "Fill a Form",
    language: "Language",
  },
};

export default function MainPage() {
  const [lang, setLang] = useState("fr");
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-2xl w-full mx-4">
        <div className="flex justify-end mb-4">
          <Select onValueChange={setLang} defaultValue={lang}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t.language} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {t.title}
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          {t.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/create-form">
            <Button className="w-full sm:w-auto text-lg py-6 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out">
              {t.createForm}
            </Button>
          </Link>
          <Link to="/form">
            <Button className="w-full sm:w-auto text-lg py-6 px-8 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-md transition duration-300 ease-in-out">
              {t.fillForm}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/*

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl w-full mx-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Application de Création de Formulaires
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Créez des formulaires personnalisés ou remplissez-en des existants
          avec notre plateforme facile à utiliser.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/create-form">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-lg py-4 px-8 text-blue-600 border-blue-600 hover:bg-blue-50 font-semibold rounded-md transition duration-300 ease-in-out"
            >
              Créer un Formulaire
            </Button>
          </Link>
          <Link to="/form">
            <Button className="w-full sm:w-auto text-lg py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out">
              Remplir le Formulaire
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


*/
