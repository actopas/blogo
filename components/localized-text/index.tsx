import React from 'react';

import { useTranslation } from 'next-i18next';

interface LocalizedTextProps {
  textKey: string;
}

const LocalizedText: React.FC<LocalizedTextProps> = ({ textKey }) => {
  const { t } = useTranslation();

  return <span>{t(textKey)}</span>;
};

export default LocalizedText;
