// import { Link, useNavigate } from "react-router-dom";
// import DriverForm from "../forms/DriverForm";
// import { useForm } from "react-hook-form";
// import type {
//   UpdateDriverFormData,
//   GetDriverByIdResponse,
// } from "../../schemas/types";
// import { useMutation } from "@tanstack/react-query";
// import { updateDriverAPI } from "@/api/DriversAPI";
// import { toast } from "react-toastify";

// // type EditDriverFormProps = {
// //   data: GetDriverByIdResponse;
// //   driverId: string;
// // };

// export default function EditDriverForm() {
//   const navigate = useNavigate();
//   const driver = data.response;

//   const initialValues: UpdateDriverFormData = {
//     name: driver.name,
//     identification: driver.identification,
//     license: driver.license,
//   };

//   const {register,handleSubmit,formState: { errors },} = useForm<UpdateDriverFormData>({defaultValues: initialValues,mode: "onChange",});

//   const { mutate } = useMutation({
//     mutationFn: updateDriverAPI,
//     onError: (error: any) => {
//       console.error(" Error en actualización:", error);
//       toast.error(error.message || "Error al actualizar el piloto");
//     },
//     onSuccess: (data) => {
//       toast.success("Piloto actualizado correctamente ");
//       navigate("/driver");
//     },
//   });

//   // Normalizamos los datos antes de enviarlos
//   const handleForm = (formData: UpdateDriverFormData) => {
//     console.log("handleForm - Datos del formulario:", formData);
//     console.log("Enviando PATCH con:", data);
//   };

//   return (
//     <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
//             Editar Piloto
//           </h1>
//         </div>

//         <div className="mb-6">
//           <Link
//             to="/driver"
//             className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)]"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//               />
//             </svg>
//             Regresar
//           </Link>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl border border-[var(--color-border-light)] overflow-hidden">
//           <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] h-2"></div>

//           <form
//             className="p-8 space-y-6"
//             onSubmit={handleSubmit(handleForm)}
//             noValidate
//           >
//             <DriverForm
//               register={register}
//               errors={errors}
//               initialValues={initialValues}
//               showCarrierField={false} // this line of code help us to hide the carrier field
//             />

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] hover:from-[var(--color-primary-darker)] hover:to-[var(--color-primary-dark)] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-amber)] transform hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wide"
//             >
//               Guardar Cambios
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
