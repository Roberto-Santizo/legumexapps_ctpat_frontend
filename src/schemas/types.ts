import {z} from "zod";
import { paginationSchema } from "./paginateSchemas";

//driver
export const driverSchema = z.object({
  id:z.number(),
  name: z.string(),
  identification: z.string(),
  license: z.string(),
  carrier_id: z.number(),
  identification_image: z.string().optional(),
  license_image: z.string().optional(),
})

export const driverListSchema = (
  driverSchema.pick({
    id: true,
    name: true,
  })
)
export const getDriverByIdSchema = z.object(
  driverSchema.pick({
    id: true,
    name: true,
    license: true,
    identification: true,
    carrier_id: true,
  })
)
export const editDriverSchema = driverSchema.pick({
  name: true,
  identification: true,
  license: true,
});

export const createDriverSchema =  driverSchema.pick({
    name: true,
    identification: true,
    license: true,
    carrier_id: true,
    identification_image: true,
    license_image: true,
  })

export type DriverFormData = z.infer<typeof createDriverSchema>;
export type CreateDriver = z.infer<typeof driverSchema>;
export const getDriversSchema = paginationSchema(driverListSchema)
export type EditDriverFormData = z.infer<typeof editDriverSchema>;


//carriers
export const carrierSchema = z.object({
  name: z.string(),
});
export const createCarrierResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  response: z
    .object({
      id: z.number(),
      name: z.string(),
      createdAt: z.string(),
    })
    .optional(),
});
export const getCarrierSchema = z.object({
  response: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  page: z.number(),
  total: z.number(),
  lastPage: z.number(),
});

export const getCarrierByIdSchema = z.object({
  statusCode: z.number(),
  response: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export type GetCarrierByIdResponse = z.infer<typeof getCarrierByIdSchema>;
export type createCarrierFormSchema = z.infer<typeof carrierSchema>;
export type CreateCarrierResponse = z.infer<typeof createCarrierResponseSchema>;
export type CarrierFormData = z.infer<typeof getCarrierSchema>;

// container
export const containerSchema = z.object({
  id: z.number(),
  container:z.string(),
  seal: z.string(),
  sensor: z.string(),
  type: z.string()
})

export const getContainerSchema = paginationSchema(containerSchema)
export type GetContainerFormData = z.infer<typeof getContainerSchema>;
export type Container = z.infer<typeof containerSchema>
export type ContainerFormData = Pick<Container,'container' |'seal' |'sensor' |'type'> 


//ctpats
const ImageSchema = z.object({
  image: z.string(),
  type: z.string(),
  description: z.string(),
});

export const ctpatResponseSchema = z.object({
  statusCode: z.literal(200),
  message: z.literal("Ctpat Creado Correctamente"),
});
export type CreateCtpatAPIResponse = {
  success: boolean;
  message: string;
};

export const CtpatSchema = z.object({
  destination: z.string(),
  container_id: z.number(),
  departure_site: z.string(),
  images: z.array(ImageSchema),
});

export type CreateCtpatFormData = z.infer<typeof CtpatSchema>;
export type CtpatResponseData = z.infer<typeof ctpatResponseSchema>;

export const ctpat = z.object({
  id: z.number(),
  destination: z.string(),
  user: z.string(),
  departure_site: z.string(),
  container: z.string(),
  createdAt: z.string(),
  status: z.number()
});

export const ctpatListSchema = ctpat.pick({
  id: true,
  destination: true,
  user: true,
  departure_site: true,
  container: true,
  createdAt: true,
  status: true
});

export type uploadImages = z.infer<typeof ImageSchema>;


//  Nuevo esquema correcto para UploadImages
export const UploadImageSimpleSchema = z.object({
  image: z.string(),
  type: z.string(),
});

export const UploadImagesFormSchema = z.object({
  images: z.array(UploadImageSimpleSchema),
});

export type uploadImagesFormData = z.infer<typeof UploadImagesFormSchema>;
export const getCtpatsSchema = paginationSchema(ctpatListSchema);
export type GetCtpatResponse = z.infer<typeof getCtpatsSchema>;


// packing-list
export const packingList = z.object({
  box_type: z.string(),
  order: z.string(),
  customer: z.string(),
  thermograph_no: z.string(),
  exit_temp: z.number()
})

export type PackingList = z.infer<typeof packingList>
export type PackignListFormData = Pick<PackingList, "box_type"|"order"|"customer"|"thermograph_no"|"exit_temp">

// conditions
export const conditionsSchema = z.object({
  id:z.number(),
  name: z.string(),
  type: z.string(),
  status: z.boolean()
})

export const getConditionSchema = paginationSchema(conditionsSchema)
export type GetConditionFormData = z.infer<typeof getConditionSchema>
export type Condition = z.infer<typeof conditionsSchema>
export type ConditionFormData = Pick<Condition, "name"| "type">

//Truck
export const truckCreateSchema = z.object({
  plate: z.string(),
  carrier_id: z.number(),
  plate_image: z.string(),
});

export const truckListSchema = z.object({
  id: z.number(),
  plate: z.string(),
  plate_image: z.string(), 
  carrier: z.string(),
});

export const truckUpdateSchema = z.object({
  plate: z.string(),
  carrier_id: z.number(),
});


export const getTruckSchema = paginationSchema(truckListSchema)

export type TruckCreateData = z.infer<typeof truckCreateSchema>;
export type TruckList = z.infer<typeof truckListSchema>;
export type TruckListResponse = z.infer<typeof getTruckSchema>;
export type TruckUpdateData = z.infer<typeof truckUpdateSchema>;

//products
export const productCreateSchema = z.object({
   name: z.string(),
   code: z.string(),
   presentation: z.string(),
   lbs_presentation: z.number(),
})

export const productListSchema = z.object({
   id: z.number(),
   name: z.string(),
   code: z.string(),
})

export const productUpdateSchema = z.object({
    name: z.string(),
    code: z.string(),
})

export const getProductSchema = paginationSchema(productListSchema)
export type ProductList = z.infer<typeof productListSchema>;
export type ProductListResponse = z.infer<typeof getProductSchema>;
export type ProductCreateData = z.infer<typeof productCreateSchema>;
export type ProductUpdateData = z.infer<typeof productUpdateSchema>;

//ctpatTruckDriverAssignment
export const ctpatTruckDriverSchema = z.object({
  truck_id: z.number(),
  driver_id: z.number(),
})
export type CtpatTruckDriverAssignment = z.infer<typeof ctpatTruckDriverSchema>;


//observations
export const observationSchema = z.object({
  name: z.string(),
})

export const observationListSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const getObservationSchema = paginationSchema(observationListSchema)

export type ObservationCreateData = z.infer<typeof observationSchema>;
export type ObservationList = z.infer<typeof observationListSchema>;
export type ObservationListResponse = z.infer<typeof getObservationSchema>;