import { Footer } from "~~/misc/types"

const prefix = 'footer'

const generateFooterID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generateFooterID`, { method: "POST", })

const getFooterBy = (data?: any): Promise<{ docs: Footer[], totalDocs: number, }> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getFooterBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const getFooterByID = (data: { id: string }): Promise<Footer> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getFooterByID`, {
    method: "POST",
    body: JSON.stringify(data),
})

const insertFooter = (data: any): Promise<Footer> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertFooter`, {
    method: "POST",
    body: JSON.stringify(data),
})

const updateFooterBy = (data: any): Promise<Footer> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updateFooterBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const deleteFooterBy = (data: any): Promise<Footer> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deleteFooterBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

export default function useFooter() {
    return {
        generateFooterID,
        getFooterBy,
        getFooterByID,
        insertFooter,
        updateFooterBy,
        deleteFooterBy
    };
}