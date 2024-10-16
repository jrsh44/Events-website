import { Button } from '@/components/ui/button';
import { t } from '@/providers/intl';
import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-red-800 mb-4">{t("notFound.title")}</h1>
      <p className="text-xl text-gray-600 mb-8">{t("notFound.description")}</p>
      <Button onClick={handleGoHome}>
        {t("notFound.goHome")}
      </Button>
    </div>
  );
};