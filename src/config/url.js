export const IMAGE_BASE_URL = "https://blyncc-apis.block-brew.com/uploads/";

export const API_BASE_URL =  'https://api.coingecko.com/api/v3/';
export const getApiUrl = (endPoint)=> API_BASE_URL + endPoint

export const HOLDINGS = getApiUrl("coins/markets?")
export const IDs = getApiUrl('coins/list')
















