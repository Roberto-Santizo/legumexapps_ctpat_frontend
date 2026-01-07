import  api  from 'shared/api/axios';
import { isAxiosError } from 'axios';
import type { CreateCustomer, } from '../schemas/types';
import { CustomerResponse, customerByIdSchema,customerSelectSchema} from '../schemas/types';

export async function createCustumerAPI(formData: CreateCustomer) {
    try {
        const {data} = await api.post('clients',formData)
        return data;
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}

export async function getCustomersAPI(page:number=1){
    try {
        const limit = 10;
        const offset = page;
        const {data} = await api.get('clients', { params: { limit, offset } })
        const response = CustomerResponse.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
     if (isAxiosError(error)&& error.response) {
        throw new Error(error.response?.data.message);
     }   
    }
}
export async function getCustomersForSelectAPI() {
  try {
    const { data } = await api.get('clients');

    const parsed = customerSelectSchema
      .array()
      .safeParse(data.response);

    if (!parsed.success) {
      throw new Error("Formato inválido de clientes para el select");
    }

    return parsed.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}


export async function getCustumerByIdAPI(customerId: number) {
  try {
    const { data } = await api.get(`clients/${customerId}`);
    const response = customerByIdSchema.safeParse(data);
    return response.data?.response
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

type CustomerAPIType = {
    customerId: number;
    formData: CreateCustomer;
}
export async function updateCustumerAPI({customerId, formData}:CustomerAPIType) {
    try {
        const {data} = await api.patch(`clients/${customerId}`, formData)
        return data;
    } catch (error) {
        if (isAxiosError(error)&& error.response) {
            throw new Error(error.response?.data.message);
        }
    }
}