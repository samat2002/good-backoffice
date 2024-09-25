import type { Portfolio } from "~~/misc/types"

const prefix = 'portfolio'

const generatePortfolioID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generatePortfolioID`, { method: "POST", })

const getPortfolioBy = (data?: any): Promise<{ docs: Portfolio[], totalDocs: number, }> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getPortfolioBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const getPortfolioByID = (data: { portfolio_id: string }): Promise<Portfolio> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getPortfolioByID`, {
    method: "POST",
    body: JSON.stringify(data),
})

const insertPortfolio = (data: any): Promise<Portfolio> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertPortfolio`, {
    method: "POST",
    body: JSON.stringify(data),
})

const updatePortfolioBy = (data: any): Promise<Portfolio> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updatePortfolioBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const deletePortfolioBy = (data: any): Promise<Portfolio> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deletePortfolioBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

export default function usePortfolio() {
    return {
        generatePortfolioID,
        getPortfolioBy,
        getPortfolioByID,
        insertPortfolio,
        updatePortfolioBy,
        deletePortfolioBy
    };
}