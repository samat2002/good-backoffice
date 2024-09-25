import type { PortfolioList, Portfolio } from "~~/misc/types"
const prefix = 'portfolio-list'

const generatePortfolioListID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generatePortfolioListID`, { method: "POST", })

const getPortfolioListBy = (data?: any): Promise<{ docs: PortfolioList[], totalDocs: number, }> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getPortfolioListBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const getPortfolioListByID = (data: { portfolio_list_id: string }): Promise<PortfolioList> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getPortfolioListByID`, {
    method: "POST",
    body: JSON.stringify(data),
})

const insertPortfolioList = async (data: { portfolio_list: PortfolioList, portfolio_list_img?: File[], portfolios: Portfolio[] }): Promise<PortfolioList> => {
    const formData = new FormData();
    formData.append("portfolio_list", JSON.stringify(data.portfolio_list));
    formData.append("portfolios", JSON.stringify(data.portfolios));

    if (data.portfolio_list_img?.length) formData.append("portfolio_list_img", data.portfolio_list_img[0]);


    return await secureFetch(
        `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertPortfolioList`, {
        method: "POST",
        body: formData,
    })
}

const updatePortfolioListBy = async (data: { portfolio_list: PortfolioList, portfolio_list_img?: File[], portfolios: Portfolio[] }): Promise<PortfolioList> => {
    const formData = new FormData();

    formData.append("portfolio_list", JSON.stringify(data.portfolio_list));
    formData.append("portfolios", JSON.stringify(data.portfolios));

    if (data.portfolio_list_img?.length) formData.append("portfolio_list_img", data.portfolio_list_img[0]);


    return await secureFetch(
        `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updatePortfolioListBy`, {
        method: "POST",
        body: formData,
    })
}

const deletePortfolioList = (data: any): Promise<PortfolioList> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deletePortfolioList`, {
    method: "POST",
    body: JSON.stringify(data),
})

export default function usePortfolioList() {
    return {
        generatePortfolioListID,
        getPortfolioListBy,
        getPortfolioListByID,
        insertPortfolioList,
        updatePortfolioListBy,
        deletePortfolioList,
    };
}