import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { componentsListFromReduxStore, createComponentsList } from '../store/slices/general_slices/components-slice';
import { SelectedFilterLangDataFromStore, SelectedLangData } from '../store/slices/general_slices/selected-multilanguage-slice';
import { CONSTANTS } from '../services/config/app-config';
import getHomePageComponentsList from '../services/api/home-page-apis/get-components-list';
import getMultiLingualTextFromAPI from '../services/api/general-apis/multilanguage-api';
import { setMultiLingualData } from '../store/slices/general_slices/multilang-slice';

const StoreDataProvider = ({}: any) => {
  // const { SUMMIT_APP_CONFIG } = CONSTANTS;
  // const dispatch = useDispatch();
  // const { componentsList }: any = useSelector(componentsListFromReduxStore);
  // const { selectedLanguageData }: any = useSelector(SelectedFilterLangDataFromStore);
  // const callComponentsAPIToGetListOfComponents = async () => {
  //   let fetchComponentsList: any = await getHomePageComponentsList(SUMMIT_APP_CONFIG);
  //   if (
  //     fetchComponentsList?.status === 200 &&
  //     fetchComponentsList?.data?.message?.msg === 'success' &&
  //     fetchComponentsList?.data?.message?.data?.length > 0
  //   ) {
  //     dispatch(createComponentsList(fetchComponentsList?.data?.message?.data));
  //   }
  // };

  // const callMultiLingualDataToFetchDynamicTexts = async () => {
  //   const multilanguageData = await getMultiLingualTextFromAPI(SUMMIT_APP_CONFIG);
  //   console.log('multilanguageData', multilanguageData);
  //   if (multilanguageData?.length > 0) {
  //     dispatch(setMultiLingualData(multilanguageData));
  //     const storedLang = localStorage.getItem('selectedLanguage');
  //     const params = {
  //       multilanguageData: multilanguageData,
  //       selectedLanguage: storedLang ? storedLang : 'en',
  //     };
  //     dispatch(SelectedLangData(params) as any);
  //   }
  // };
  // useEffect(() => {
  //   if (componentsList?.length === 0) {
  //     callComponentsAPIToGetListOfComponents();
  //   }
  //   if (true) {
  //     callMultiLingualDataToFetchDynamicTexts();
  //   }
  // }, []);
  return <></>;
};

export default StoreDataProvider;
