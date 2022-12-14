import instance from "./axios";
instance.defaults.baseURL = "/api";




// 获取所有省市的污染物数据
export const getProvinceInfo = (options: any) => {
    return instance({
        url: "/pollution/get_all_province",
        method: options.method,
    })
};

// 获取所有省市的污染物数据
export const getInfoByYear = (options: any) => {
    return instance({
        url: "/pollution/get_info_by_year/" + options.data,
        method: options.method,
    })
};


// 根据省份获取市级别的数据
export const getCityInfoByProvince = (options: any) =>{
    return instance({
        url: "/pollution/get_city_by_province/" + options.year + "/" + options.name,
        method: options.method,
    })
};

// 获取近五年、六年的平均温度、地面气压、平均温度、AQI
export const getSomeAvageCount = (options: any) =>{
    return instance({
        url: "/pollution/get_some_average",
        method: options.method,
    })
};

// 获取近五年、六年的平均温度、地面气压、平均温度、AQI目标城市
export const getSomeCityAvageCount = (options: any) =>{
    return instance({
        url: "/pollution/get_some_city_average/" + options.name,
        method: options.method,
    })
};

// 获取近六年前10名AQI,其他数据按照aqi数据升序
export const getAqiByAsc = (options:any) =>{
  return instance({
      url: "/pollution/get_ten_aqi_asc",
      method: options.method,
  })
};

// 获取近六年市的前十名AQI，其他污染物数据
export const getCityAqiByAsc = (options:any) =>{
  return instance({
      url: "/pollution/get_ten_city_aqi_asc/" + options.name,
      method: options.method
  })
};

// 获取近六年的平均数据
export const getSixAverage = (options:any) =>{
  return instance({
      url: "/pollution/get_six_average",
      method: options.method,
  })
};

export const getSixAverageByProvince = (options:any) =>{
  return instance({
      url: "/pollution/get_six_average_province/" + options.name,
      method: options.method,
  })
};




export default {
    getProvinceInfo,getCityInfoByProvince,getSomeAvageCount,getAqiByAsc,getSixAverage,getInfoByYear,
    getCityAqiByAsc,getSomeCityAvageCount,getSixAverageByProvince
};

