import type { Product } from "~~/misc/types"
const prefix = 'product'

const generateProductID = (): Promise<string> => secureFetch(`${useRuntimeConfig().public.apiBaseUrl}/${prefix}/generateProductID`, { method: "POST", })

const getProductBy = (data?: any): Promise<{ docs: Product[], totalDocs: number, }> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getProductBy`, {
    method: "POST",
    body: JSON.stringify(data),
})

const getProductByID = (data: { product_id: string }): Promise<Product> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/getProductByID`, {
    method: "POST",
    body: JSON.stringify(data),
})

const insertProduct = async (data: { product: Product, product_img?: File[], }): Promise<Product> => {
    const formData = new FormData();
    formData.append("product", JSON.stringify(data.product));

    if (data.product_img?.length) formData.append("product_img", data.product_img[0]);

    return await secureFetch(
        `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/insertProduct`, {
        method: "POST",
        body: formData,
    })
}

const updateProductBy = async (data: { product: Product, product_img?: File[], }): Promise<Product> => {
    const formData = new FormData();

    formData.append("product", JSON.stringify(data.product));

    if (data.product_img?.length) formData.append("product_img", data.product_img[0]);

    return await secureFetch(
        `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/updateProductBy`, {
        method: "POST",
        body: formData,
    })
}

const deleteProduct = (data: any): Promise<Product> => secureFetch(
    `${useRuntimeConfig().public.apiBaseUrl}/${prefix}/deleteProduct`, {
    method: "POST",
    body: JSON.stringify(data),
})

export default function useProduct() {
    return {
        generateProductID,
        getProductBy,
        getProductByID,
        insertProduct,
        updateProductBy,
        deleteProduct,
    };
}