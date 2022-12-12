import instance from "./axios";
instance.defaults.baseURL = "/api";

// 获取所有省市的污染物数据
export const getProvinceInfo = (options: any) => {
    return instance({
        url: "/pollution/get_all_province",
        method: options.method,
    })
};

// 根据省份获取市级别的数据
export const getCityInfoByProvince = (options: any) =>{
    return instance({
        url: "/pollution/get_city_by_province",
        method: options.method,
        data: options.data
    })
};


export default {
    getProvinceInfo,getCityInfoByProvince
};

