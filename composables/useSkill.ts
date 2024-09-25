import type { Skill } from "~~/misc/types"

const prefix = 'skill'

const generateSkillID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generateSkillID`, { method: "POST", })

const getSkillBy = (data?: any): Promise<{ docs: Skill[], totalDocs: number, }> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getSkillBy`, {
  method: "POST",
  body: JSON.stringify(data),
})

const getSkillByID = (data: { skill_id: string }): Promise<Skill> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getSkillByID`, {
  method: "POST",
  body: JSON.stringify(data),
})

const insertSkill = (data: any): Promise<Skill> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertSkill`, {
  method: "POST",
  body: JSON.stringify(data),
})

const updateSkillBy = (data: any): Promise<Skill> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updateSkillBy`, {
  method: "POST",
  body: JSON.stringify(data),
})

const deleteSkillBy = (data: any): Promise<Skill> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deleteSkillBy`, {
  method: "POST",
  body: JSON.stringify(data),
})

export default function useSkill() {
  return {
    generateSkillID,
    getSkillBy,
    getSkillByID,
    insertSkill,
    updateSkillBy,
    deleteSkillBy
  };
}