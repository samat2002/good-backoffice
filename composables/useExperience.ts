import type { Experience } from "~~/misc/types"

const prefix = 'experience'

const generateExperienceID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generateExperienceID`, { method: "POST", })

const getExperienceBy = (data?: any): Promise<{ docs: Experience[], totalDocs: number, }> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getExperienceBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const getExperienceByID = (data: { experience_id: string }): Promise<Experience> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getExperienceByID`, {
    method: "POST",
    body: JSON.stringify(data),
})

const insertExperience = (data: any): Promise<Experience> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertExperience`, {
    method: "POST",
    body: JSON.stringify(data),
})

const updateExperienceBy = (data: any): Promise<Experience> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updateExperienceBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const deleteExperienceBy = (data: any): Promise<Experience> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deleteExperienceBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

export default function useExperience() {
    return {
        generateExperienceID,
        getExperienceBy,
        getExperienceByID,
        insertExperience,
        updateExperienceBy,
        deleteExperienceBy
    };
}