import useMultilangHook from '../hooks/LanguageHook/Multilanguages-hook';

const TranslationsList = ({ children }: any) => {
  useMultilangHook();
  return <>{children}</>;
};

export default TranslationsList;
