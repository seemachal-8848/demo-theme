import useNavbar from "../../../hooks/GeneralHooks/useNavbar";
import { callGetAPI } from "../../../utils/http-methods";
import HeaderActions from "./HeaderActions/HeaderActions"
import ProductCategoryMenuList from "./ProductCategoryList/ProductCategoryMenuList"

const MasterComponent = () => {
    const { navbarData, isLoading, errorMessage } = useNavbar();
    console.log("navbarData", navbarData)
    return (
        <>
            <HeaderActions />
            <ProductCategoryMenuList
                navbarData={navbarData}
                isLoading={isLoading}
            />
        </>
    )
}

export default MasterComponent