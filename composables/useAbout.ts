import { About } from "~~/misc/types"

const prefix = 'about'

const generateAboutID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generateAboutID`, { method: "POST", })

const getAboutBy = (data?: any): Promise<{ docs: About[], totalDocs: number, }> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getAboutBy`, {
  method: "POST",
  body: JSON.stringify(data),
})

const getAboutByID = (data: { id: string }): Promise<About> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getAboutByID`, {
  method: "POST",
  body: JSON.stringify(data),
})

const insertAbout = async (data: { about: About, about_img?: File[] }): Promise<About> => {
  const formData = new FormData();
  formData.append("about", JSON.stringify(data.about));

  if (data.about_img?.length) formData.append("about_img", data.about_img[0]);

  return await secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertAbout`, {
    method: "POST",
    body: formData,
  })
}

const updateAboutBy = async (data: { about: About, about_img?: File[] }): Promise<About> => {
  const formData = new FormData();

  formData.append("about", JSON.stringify(data.about));

  if (data.about_img?.length) formData.append("about_img", data.about_img[0]);


  return await secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updateAboutBy`, {
    method: "POST",
    body: formData,
  })
}


const deleteAboutBy = (data: any): Promise<About> => secureFetch(
  `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deleteAboutBy`, {
  method: "POST",
  body: JSON.stringify(data),
})

export default function useAbout() {
  return {
    generateAboutID,
    getAboutBy,
    getAboutByID,
    insertAbout,
    updateAboutBy,
    deleteAboutBy
  };
}