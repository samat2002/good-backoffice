import type { SkillList, Skill } from "~~/misc/types"
const prefix = 'skill-list'

const generateSkillListID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generateSkillListID`, { method: "POST", })

const getSkillListBy = (data?: any): Promise<{ docs: SkillList[], totalDocs: number, }> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getSkillListBy`, {
  method: "POST",
  body: JSON.stringify(data),
})

const getSkillListByID = (data: { skill_list_id: string }): Promise<SkillList> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getSkillListByID`, {
  method: "POST",
  body: JSON.stringify(data),
})

const insertSkillList = async (data: { skill_list: SkillList, skill_list_img?: File[], skills: Skill[] }): Promise<SkillList> => {
  const formData = new FormData();
  formData.append("skill_list", JSON.stringify(data.skill_list));
  formData.append("skills", JSON.stringify(data.skills));

  if (data.skill_list_img?.length) formData.append("skill_list_img", data.skill_list_img[0]);


  return await secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertSkillList`, {
    method: "POST",
    body: formData,
  })
}

const updateSkillListBy = async (data: { skill_list: SkillList, skill_list_img?: File[], skills: Skill[] }): Promise<SkillList> => {
  const formData = new FormData();

  formData.append("skill_list", JSON.stringify(data.skill_list));
  formData.append("skills", JSON.stringify(data.skills));

  if (data.skill_list_img?.length) formData.append("skill_list_img", data.skill_list_img[0]);


  return await secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updateSkillListBy`, {
    method: "POST",
    body: formData,
  })
}

const deleteSkillList = (data: any): Promise<SkillList> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deleteSkillList`, {
  method: "POST",
  body: JSON.stringify(data),
})

export default function useSkillList() {
  return {
    generateSkillListID,
    getSkillListBy,
    getSkillListByID,
    insertSkillList,
    updateSkillListBy,
    deleteSkillList,
  };
}