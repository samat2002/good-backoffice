import type { Banner, BannerList } from "~~/misc/types"
const prefix = 'banner'

const generateBannerID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generateBannerID`, { method: "POST", })

const getBannerBy = (data?: any): Promise<{ docs: Banner[], totalDocs: number, }> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getBannerBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const getBannerByID = (data: { banner_id: string }): Promise<Banner> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getBannerByID`, {
    method: "POST",
    body: JSON.stringify(data),
})

const insertBanner = async (data: { banner: Banner, banner_img?: File[], banner_lists: BannerList[] }): Promise<Banner> => {
    const formData = new FormData();
    formData.append("banner", JSON.stringify(data.banner));
    formData.append("banner_lists", JSON.stringify(data.banner_lists));

    if (data.banner_img?.length) formData.append("banner_img", data.banner_img[0]);


    return await secureFetch(
        `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertBanner`, {
        method: "POST",
        body: formData,
    })
}

const updateBannerBy = async (data: { banner: Banner, banner_img?: File[], banner_lists: BannerList[] }): Promise<Banner> => {
    const formData = new FormData();

    formData.append("banner", JSON.stringify(data.banner));
    formData.append("banner_lists", JSON.stringify(data.banner_lists));

    if (data.banner_img?.length) formData.append("banner_img", data.banner_img[0]);


    return await secureFetch(
        `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updateBannerBy`, {
        method: "POST",
        body: formData,
    })
}

const deleteBanner = (data: any): Promise<Banner> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deleteBanner`, {
    method: "POST",
    body: JSON.stringify(data),
})

export default function useBanner() {
    return {
        generateBannerID,
        getBannerBy,
        getBannerByID,
        insertBanner,
        updateBannerBy,
        deleteBanner,
    };
}