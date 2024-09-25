import { ConTact } from "~~/misc/types"

const prefix = 'contact'

const generateConTactID= (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generateConTactID`, { method: "POST", })

const getConTactBy = (data?: any): Promise<{ docs: ConTact[], totalDocs: number, }> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getConTactBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const getConTactByID = (data: { contact_id: string }): Promise<ConTact> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getConTactByID`, {
    method: "POST",
    body: JSON.stringify(data),
})

const insertConTact = (data: any): Promise<ConTact> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertConTact`, {
       
    method: "POST",
    body: JSON.stringify(data),
})

const updateConTactBy = (data: any): Promise<ConTact> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updateConTactBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const deleteConTact = (data: any): Promise<ConTact> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deleteConTact`, {
    method: "POST",
    body: JSON.stringify(data),
})

export default function useConTact() {
    return {
        generateConTactID,
        getConTactBy,
        getConTactByID,
        insertConTact,
        updateConTactBy,
        deleteConTact
    };
}