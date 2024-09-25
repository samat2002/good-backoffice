import { Permission } from "~~/misc/types"

const prefix = 'permission'

const generatePermissionID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generatePermissionID`, { method: "POST", })

const getPermissionBy = (data?: any): Promise<{ docs: Permission[], totalDocs: number, }> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getPermissionBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const getPermissionByID = (data: { permission_id: string }): Promise<Permission> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getPermissionByID`, {
    method: "POST",
    body: JSON.stringify(data),
})

const insertPermission = (data: { permission: Permission }): Promise<Permission> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertPermission`, {
    method: "POST",
    body: JSON.stringify(data),
})

const updatePermissionBy = (data: { permission: Permission }): Promise<Permission> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updatePermissionBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const deletePermissionBy = (data: { permission_id: string }): Promise<Permission> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deletePermissionBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

export default function usePermission() {
    return {
        generatePermissionID,
        getPermissionBy,
        getPermissionByID,
        insertPermission,
        updatePermissionBy,
        deletePermissionBy
    };
}