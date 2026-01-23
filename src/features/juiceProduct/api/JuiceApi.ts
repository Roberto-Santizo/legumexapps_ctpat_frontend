import { isAxiosError } from "axios";
import api from "@/shared/api/axios";
import type {JuiceSchemaFormData} from "@/features/juiceProduct/schemas/types"
import  {juiceSelectSchema, CustomerResponse, juiceResponseSchema} from "@/features/juiceProduct/schemas/types"

export async function juiceCreateAPI(formData: JuiceSchemaFormData){
 try {
    const {data} = await api.post("/juices", formData)
    return data
 } catch (error) {
    if(isAxiosError(error)&& error.response){
        throw new Error(error.response.data.message)
    }
 }
}

export async function getJuiceAPI(page:number=1) {
    try {
        const limit = 10;
        const offset = page;
        const {data} = await api.get("/juices",{params:{limit, offset}})
        const response = CustomerResponse.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error)&& error.response){
            throw new Error(error.response?.data.message);
        }
    }
}

export async function getJuiceForSelectAPI() {
  try {
    const { data } = await api.get('/juices');
    const parsed = juiceSelectSchema.array().safeParse(data.response);
    if (parsed.success) {
      return parsed.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function getJuiceByIdAPI(juiceId: number) {
  try {
    const { data } = await api.get(`/juices/${juiceId}`);
    const response = juiceResponseSchema.safeParse(data.response);
    if (response.success){
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

type JuiceAPIType = {
  juiceId: number;
  formData:JuiceSchemaFormData
}
export async function updateJuiceAPI({juiceId, formData}:JuiceAPIType) {
  try {
    const {data} = await api.patch(`/juices/${juiceId}`, formData)
      return data
  } catch (error) {
    if (isAxiosError(error)&& error.response){
      throw new Error(error.response?.data.message)
    }
  }
}


