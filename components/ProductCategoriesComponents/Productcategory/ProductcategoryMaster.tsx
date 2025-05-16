import { useSelector } from "react-redux";
import useNavbar from "../../../hooks/GeneralHooks/useNavbar";
import { callGetAPI } from "../../../utils/http-methods";
import HeaderActions from "./HeaderActions/HeaderActions"
import ProductCategoryMenuList from "./ProductCategoryList/ProductCategoryMenuList"
import { SelectedFilterLangDataFromStore } from "../../../store/slices/general_slices/selected-multilanguage-slice";


const ProductcategoryMaster = () => {
    const { navbarData, isLoading, errorMessage } = useNavbar();
    const { selectedLanguageData }: any = useSelector(SelectedFilterLangDataFromStore);
    return (
        <>
            <HeaderActions
                navbarData={navbarData}
                selectedLanguageData={selectedLanguageData}
            />
            <ProductCategoryMenuList
                navbarData={navbarData}
                isLoading={isLoading}
            />

        </>
    )
}

export default ProductcategoryMaster