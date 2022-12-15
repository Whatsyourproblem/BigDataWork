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

// 获取近五年、六年的平均温度、地面气压、平均温度、AQI
export const getSomeAvageCount = (options: any) =>{
    return instance({
        url: "/pollution/get_some_average",
        method: options.method,
    })
};

// 获取近六年前10名AQI,其他数据按照aqi数据升序
export const getAqiByAsc = (options:any) =>{
  return instance({
      url: "/pollution/get_aqi_asc",
      method: options.method,
  })
};

// 获取近六年的平均数据
export const getSixAverage = (options:any) =>{
  return instance({
      url: "/pollution/get_six_average",
      method: options.method,
  })
};


export default {
    getProvinceInfo,getCityInfoByProvince,getSomeAvageCount,getAqiByAsc,getSixAverage
};

