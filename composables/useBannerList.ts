import type { BannerList } from "~~/misc/types"
const prefix = 'banner-list'

const generateBannerListID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generateBannerListID`, { method: "POST", })

const getBannerListBy = (data?: any): Promise<{ docs: BannerList[], totalDocs: number, }> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getBannerListBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const getBannerListByID = (data: { banner_list_id: string }): Promise<BannerList> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getBannerListByID`, {
    method: "POST",
    body: JSON.stringify(data),
})

const insertBannerList = (data: any): Promise<BannerList> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertBannerList`, {
    method: "POST",
    body: JSON.stringify(data),
})

const updateBannerListBy = (data: any): Promise<BannerList> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updateBannerListBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const deleteBannerListBy = (data: any): Promise<BannerList> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deleteBannerListBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

export default function useBannerList() {
    return {
        generateBannerListID,
        getBannerListBy,
        getBannerListByID,
        insertBannerList,
        updateBannerListBy,
        deleteBannerListBy
    };
}