import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import { CompanyLogoSchema } from "@/assets/CompanyLogoSchema";


export async function getCompanyLogoAPI(){
    try {
        const {data} = await api.get('/images')
        const response = CompanyLogoSchema.safeParse(data)
        if(response.success){
            return response.data
        } 
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
  
}