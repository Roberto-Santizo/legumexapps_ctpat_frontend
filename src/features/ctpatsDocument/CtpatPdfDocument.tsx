import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { ctpatPdfStyles as s } from "./CtpatPdf.styles";
import type { CtpatImage } from "@/features/ctpats/schemas/typeDocument";
import type { ProductTypeId } from "@/features/process/control flow/productTypes";

// ─── Types ─────────────────────────────────────────────────────────────────

interface CtpatDriver {
  id: number;
  name: string;
  identification: string;
  license: string;
  identification_image: string;
  license_image: string;
}

interface CtpatTruck {
  id: number;
  plate: string;
  plate_image: string;
}

interface CtpatData {
  destination: string;
  departure_site: string;
  container: string;
  departure_date: string;
  departure_hour: string;
  seal: string;
  shipping_company: string;
  createdAt: string;
  type: number;
  status: number;
  signature_c?: string | null;
  signature_e?: string | null;
  driver?: CtpatDriver;
  truck?: CtpatTruck;
}

interface PackingListData {
  carrier?: string;
  container_condition?: string;
  container_type?: string;
  no_container?: string;
  no_marchamo?: string;
  order?: string;
  client?: string;
  no_thermograph?: string;
  box_type?: string;
  lbs_per_box?: string;
  total_boxes?: number;
  beginning_date?: string;
  exit_date?: string | null;
  exit_temp?: number | string | null;
  seal?: string;
}

interface FrozenPackingListTotal {
  product: string;
  total_boxes: number;
  gross_weight: number;
  net_weight: number;
}

interface JuicePackingListTotals {
  total_boxes: number;
  net_weight: number;
  gross_weight: number;
  bottles: number;
}

interface Observation {
  id: number;
  observation: string;
  data: string;
}

interface ChecklistItem {
  id: number;
  condition: string;
  status: boolean;
  type: string;
}

export interface CtpatPdfDocumentProps {
  ctpat: CtpatData;
  images: CtpatImage[];
  observations: Observation[];
  checklistItems: ChecklistItem[];
  packingList?: PackingListData | null;
  packingListTotals?: FrozenPackingListTotal[] | JuicePackingListTotals | null;
  productType: ProductTypeId;
  companyLogo?: string | null;
  imagesBaseUrl: string;
  /** path → base64 data URL. When present, used instead of building a URL from imagesBaseUrl. */
  imageBase64Cache?: Record<string, string>;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const IMAGE_TYPES = [
  "CONTAINER PICTURES",
  "CONTAINER LOAD",
  "PRODUCTS",
  "LOADING TEMPERATURE",
  "FINAL CONTAINER",
  "DRIVER IDENTIFICATION",
] as const;

const IMAGE_LABELS: Record<string, string> = {
  "CONTAINER PICTURES": "Container Pictures",
  "CONTAINER LOAD": "Container Load",
  "PRODUCTS": "Products",
  "LOADING TEMPERATURE": "Loading Temperature",
  "FINAL CONTAINER": "Final Container",
  "DRIVER IDENTIFICATION": "Driver Identification",
};

const CHECKLIST_TYPE_LABELS: Record<string, string> = {
  TRUCK_INSPECTION: "TRUCK INSPECTION / INSPECCIÓN DEL TRAILER",
  EXTERIOR_TRUCK_INSPECTION: "EXTERIOR TRUCK INSPECTION / INSPECCIÓN EXTERIOR",
  INTERIOR_TRUCK_INSPECTION: "INTERIOR TRUCK INSPECTION / INSPECCIÓN INTERIOR",
  PEST_INSPECTION: "PEST INSPECTION / INSPECCIÓN DE PLAGAS",
  CHEMICALS_INSPECTION: "CHEMICAL INSPECTION / INSPECCIÓN DE QUÍMICOS",
  PRODUCT_INSPECTION: "PRODUCT INSPECTION / INSPECCIÓN DE PRODUCTO",
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function str(val: string | number | null | undefined): string {
  if (val === null || val === undefined) return "";
  return String(val);
}

// ─── Page Header (fixed — renders on every PDF page) ─────────────────────

function PageHeader({ companyLogo }: { companyLogo?: string | null }) {
  return (
    <View fixed style={s.pageHeader}>
      <View style={{ width: 80 }}>
        {companyLogo ? (
          <Image src={companyLogo} style={s.headerLogo} />
        ) : (
          <Text style={{ fontSize: 7 }}>LEGUMEX</Text>
        )}
      </View>
      <View style={s.headerCenter}>
        <Text style={s.headerCenterBold}>FORMAT</Text>
        <Text>C-TPAT</Text>
      </View>
      <View style={s.headerRight}>
        <Text>CODE: FOR-CI-18</Text>
        <Text>VERSION: 02</Text>
        <Text
          render={({ pageNumber, totalPages }) =>
            `PAGE ${pageNumber} of ${totalPages}`
          }
        />
      </View>
    </View>
  );
}

// ─── Page Footer (fixed) ──────────────────────────────────────────────────

function PageFooter({ docDate }: { docDate: string }) {
  return (
    <View fixed style={s.pageFooter}>
      <Text>FOR-CI-18</Text>
      <Text>Approved GCC</Text>
      <Text>Agroindustria Legumex, Chimaltenango, Guatemala</Text>
      <Text>{docDate}</Text>
    </View>
  );
}

// ─── Section 1: General Information ─────────────────────────────────────

function GeneralInfoSection({
  ctpat,
  packingList,
}: {
  ctpat: CtpatData;
  packingList?: PackingListData | null;
}) {
  return (
    <View>
      <Text style={s.sectionTitle}>GENERAL INFORMATION</Text>
      <View style={s.table}>
        {/* Row 1 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>DESTINATION OR CUSTOMER / Cliente o Destino</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(ctpat.destination)}</Text>
          </View>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>CARRIER / Naviera</Text>
          </View>
          <View style={s.tableCellLast}>
            <Text>{str(ctpat.shipping_company)}</Text>
          </View>
        </View>

        {/* Row 2 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>DEPARTURE SITE / Lugar de salida</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(ctpat.departure_site)}</Text>
          </View>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>CONTAINER No. / No. de contenedor</Text>
          </View>
          <View style={s.tableCellLast}>
            <Text>{str(ctpat.container)}</Text>
          </View>
        </View>

        {/* Row 3 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>DEPARTURE DATE / Fecha de salida</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(ctpat.departure_date)}</Text>
          </View>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>SEAL NUMBER / Número de sello</Text>
          </View>
          <View style={s.tableCellLast}>
            <Text>{str(ctpat.seal)}</Text>
          </View>
        </View>

        {/* Row 4 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>DEPARTURE TIME / Hora de salida</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(ctpat.departure_hour)}</Text>
          </View>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>
              CONTAINER DIGIT CONTROL / Chequeo dígito de control:{"\n"}
              www.sds.es/despiece/Espa/index.htm
            </Text>
          </View>
          <View style={s.tableCellLast}>
            <Text></Text>
          </View>
        </View>

        {/* Row 5 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>RYAN No. / No. Sensor</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(packingList?.no_thermograph)}</Text>
          </View>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>
              CONTAINER ENTRY COUNTRY / Procedencia del contenedor:{"\n"}
              www.weport.global/rastreo
            </Text>
          </View>
          <View style={s.tableCellLast}>
            <Text></Text>
          </View>
        </View>

        {/* Row 6 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>DRIVER NAME / Nombre del piloto</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(ctpat.driver?.name)}</Text>
          </View>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>BL No. / No. de BL</Text>
          </View>
          <View style={s.tableCellLast}>
            <Text></Text>
          </View>
        </View>

        {/* Row 7 (last) */}
        <View style={s.tableRowLast}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>DRIVER ID / DPI del piloto</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(ctpat.driver?.identification)}</Text>
          </View>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>LICENCE PLATE No. / Placa</Text>
          </View>
          <View style={s.tableCellLast}>
            <Text>{str(ctpat.truck?.plate)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Section 2: Images ───────────────────────────────────────────────────

const REMAINING_IMAGE_TYPES = [
  "CONTAINER LOAD",
  "PRODUCTS",
  "LOADING TEMPERATURE",
  "FINAL CONTAINER",
  "DRIVER IDENTIFICATION",
] as const;

function ImagesSection({
  images,
  truck,
  driver,
  imagesBaseUrl,
  imageBase64Cache,
  filterTypes,
  addBreak = false,
}: {
  images: CtpatImage[];
  truck?: CtpatTruck;
  driver?: CtpatDriver;
  imagesBaseUrl: string;
  imageBase64Cache?: Record<string, string>;
  filterTypes?: readonly string[];
  addBreak?: boolean;
}) {
  const hasImages = images && images.length > 0;

  const imgUrl = (path: string) => {
    if (path.startsWith("data:")) return path;
    return imageBase64Cache?.[path] ?? `${imagesBaseUrl}/${path}`;
  };

  const visibleTypes = filterTypes
    ? IMAGE_TYPES.filter((t) => filterTypes.includes(t))
    : IMAGE_TYPES;

  return (
    <View break={addBreak}>
      {!hasImages && !filterTypes && (
        <Text style={{ textAlign: "center", padding: 10, color: "#888888" }}>
          Imágenes pendientes — Aún no se han cargado imágenes del contenedor
        </Text>
      )}

      {visibleTypes.map((type) => {
        const filtered = images.filter((img) => img.type === type);
        const hasTruckOrDriver =
          type === "FINAL CONTAINER" &&
          (truck?.plate_image || driver?.license_image);

        if (filtered.length === 0 && !hasTruckOrDriver) return null;

        // Build a flat list of all images for this type
        const allImages: Array<{ src: string; caption?: string }> = [
          ...filtered.map((img) => ({
            src: imgUrl(img.image),
            caption: img.description ?? undefined,
          })),
        ];

        if (type === "FINAL CONTAINER") {
          if (truck?.plate_image) {
            allImages.push({
              src: imgUrl(truck.plate_image),
              caption: `LICENCE PLATE No. ${truck.plate}`,
            });
          }
          if (driver?.license_image) {
            allImages.push({
              src: imgUrl(driver.license_image),
              caption: `DRIVER ID ${driver.license}`,
            });
          }
        }

        const rows = chunkArray(allImages, 3);

        return (
          <View key={type}>
            <Text style={s.imageGroupTitle}>{IMAGE_LABELS[type]}</Text>
            {rows.map((row, rIdx) => (
              <View key={rIdx} style={s.imageRow} wrap={false}>
                {row.map((item, iIdx) => (
                  <View key={iIdx} style={s.imageWrapper}>
                    <Image src={item.src} style={s.imagePdf} />
                    {item.caption ? (
                      <Text style={s.imageCaption}>{item.caption}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

// ─── Section 3: Packing List ─────────────────────────────────────────────

function PackingListSection({
  packingList,
  packingListTotals,
  productType,
}: {
  packingList?: PackingListData | null;
  packingListTotals?: FrozenPackingListTotal[] | JuicePackingListTotals | null;
  productType: ProductTypeId;
}) {
  if (!packingList) {
    return (
      <View break>
        <Text style={s.sectionTitle}>PACKING LIST</Text>
        <Text style={{ textAlign: "center", padding: 8, color: "#888888" }}>
          No hay datos de packing list disponibles.
        </Text>
      </View>
    );
  }

  const isJuice = productType === 2;

  // Compute totals display values
  const frozenTotals = Array.isArray(packingListTotals) ? packingListTotals : [];
  const frozenTotalBoxes = frozenTotals.reduce((sum, t) => sum + t.total_boxes, 0);
  const juiceTotals = !Array.isArray(packingListTotals) ? packingListTotals : null;

  return (
    <View break>
      <View style={s.table}>
        {/* Header */}
        <View style={s.tableRow}>
          <View style={{ ...s.tableCell, flex: 4, backgroundColor: "#e2e8f0" }}>
            <Text style={{ fontFamily: "Helvetica-Bold", textAlign: "center", fontSize: 9 }}>
              PACKING LIST
            </Text>
          </View>
        </View>

        {/* Row 1 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>CARRIER:</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(packingList.carrier)}</Text>
          </View>
          <View style={s.tableCell}>
            {isJuice ? (
              <Text style={s.tableCellBold}>BOXES:</Text>
            ) : (
              <Text style={s.tableCellBold}>BOX TYPE:</Text>
            )}
          </View>
          <View style={s.tableCellLast}>
            {isJuice ? (
              <Text>{str(juiceTotals?.total_boxes ?? "-")}</Text>
            ) : (
              <Text>{str(packingList.box_type)}</Text>
            )}
          </View>
        </View>

        {/* Row 2 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>CONTAINER CONDITION:</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(packingList.container_condition)}</Text>
          </View>
          <View style={s.tableCell}>
            {isJuice ? (
              <Text style={s.tableCellBold}>BOTTLES:</Text>
            ) : (
              <Text style={s.tableCellBold}>LBS PER BOX:</Text>
            )}
          </View>
          <View style={s.tableCellLast}>
            {isJuice ? (
              <Text>{str(juiceTotals?.bottles ?? "-")}</Text>
            ) : (
              <Text>{str(packingList.lbs_per_box)}</Text>
            )}
          </View>
        </View>

        {/* Row 3 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>CONTAINER TYPE:</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(packingList.container_type)}</Text>
          </View>
          <View style={s.tableCell}>
            {isJuice ? (
              <Text style={s.tableCellBold}>GROSS WEIGHT:</Text>
            ) : (
              <Text style={s.tableCellBold}>BOXES:</Text>
            )}
          </View>
          <View style={s.tableCellLast}>
            {isJuice ? (
              <Text>{str(juiceTotals?.gross_weight ?? "-")}</Text>
            ) : (
              <Text>{frozenTotalBoxes || "-"}</Text>
            )}
          </View>
        </View>

        {/* Row 4 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>CONTAINER NO.</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(packingList.no_container)}</Text>
          </View>
          <View style={s.tableCell}>
            {isJuice ? (
              <Text style={s.tableCellBold}>NET WEIGHT:</Text>
            ) : (
              <Text style={s.tableCellBold}>BEGINNING DATE</Text>
            )}
          </View>
          <View style={s.tableCellLast}>
            {isJuice ? (
              <Text>{str(juiceTotals?.net_weight ?? "-")}</Text>
            ) : (
              <Text>{str(packingList.beginning_date)}</Text>
            )}
          </View>
        </View>

        {/* Row 5 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>ORDER NO</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(packingList.order)}</Text>
          </View>
          <View style={s.tableCell}>
            {isJuice ? (
              <Text style={s.tableCellBold}>BEGINNING DATE</Text>
            ) : (
              <Text style={s.tableCellBold}>EXIT DATE:</Text>
            )}
          </View>
          <View style={s.tableCellLast}>
            {isJuice ? (
              <Text>{str(packingList.beginning_date)}</Text>
            ) : (
              <Text>{str(packingList.exit_date)}</Text>
            )}
          </View>
        </View>

        {/* Row 6 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>SEAL:</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(packingList.seal ?? packingList.no_marchamo)}</Text>
          </View>
          <View style={s.tableCell}>
            {isJuice ? (
              <Text style={s.tableCellBold}>EXIT DATE:</Text>
            ) : (
              <Text style={s.tableCellBold}>EXIT TEMPERATURE:</Text>
            )}
          </View>
          <View style={s.tableCellLast}>
            <Text>{str(packingList.exit_date ?? packingList.exit_temp)}</Text>
          </View>
        </View>

        {/* Row 7 */}
        <View style={s.tableRow}>
          <View style={s.tableCell}>
            <Text style={s.tableCellBold}>CLIENT</Text>
          </View>
          <View style={s.tableCell}>
            <Text>{str(packingList.client)}</Text>
          </View>
          <View style={s.tableCell}>
            {isJuice ? (
              <Text style={s.tableCellBold}>EXIT TEMPERATURE:</Text>
            ) : (
              <Text style={s.tableCellBold}>THERMOGRAPH:</Text>
            )}
          </View>
          <View style={s.tableCellLast}>
            {isJuice ? (
              <Text>{str(packingList.exit_temp)}</Text>
            ) : (
              <Text>{str(packingList.no_thermograph)}</Text>
            )}
          </View>
        </View>

        {/* Row 8 — only for juice */}
        {isJuice && (
          <View style={s.tableRowLast}>
            <View style={s.tableCell}>
              <Text style={s.tableCellBold}>THERMOGRAPH:</Text>
            </View>
            <View style={s.tableCell}>
              <Text>{str(packingList.no_thermograph)}</Text>
            </View>
            <View style={s.tableCell}>
              <Text style={s.tableCellBold}>BOX TYPE:</Text>
            </View>
            <View style={s.tableCellLast}>
              <Text>{str(packingList.box_type)}</Text>
            </View>
          </View>
        )}

        {/* Last row for frozen */}
        {!isJuice && (
          <View style={s.tableRowLast}>
            <View style={s.tableCell}><Text></Text></View>
            <View style={s.tableCell}><Text></Text></View>
            <View style={s.tableCell}><Text></Text></View>
            <View style={s.tableCellLast}><Text></Text></View>
          </View>
        )}
      </View>
    </View>
  );
}

// ─── Section 4: Driver Table ─────────────────────────────────────────────

function DriverSection({
  ctpat,
  packingList,
  imagesBaseUrl,
  imageBase64Cache,
}: {
  ctpat: CtpatData;
  packingList?: PackingListData | null;
  imagesBaseUrl: string;
  imageBase64Cache?: Record<string, string>;
}) {
  const driver = ctpat.driver;
  const imgUrl = (path: string) =>
    imageBase64Cache?.[path] ?? `${imagesBaseUrl}/${path}`;

  return (
    <View break>
      <Text style={s.driverSectionTitle}>
        C-TPAT TRAILER DE EXPORTACION / FORMULARIO DE INSPECCION DE CONTENEDORES
      </Text>

      <View style={s.driverTable}>
        {/* Location / Date / Time */}
        <View style={s.driverRow}>
          <View style={s.driverCell}>
            <Text style={s.driverLabel}>LOCATION / LUGAR:</Text>
            <Text style={s.driverValue}>{str(ctpat.departure_site)}</Text>
          </View>
          <View style={s.driverCell}>
            <Text style={s.driverLabel}>DATE / FECHA:</Text>
            <Text style={s.driverValue}>{ctpat.departure_date ?? "--"}</Text>
          </View>
          <View style={s.driverCellLast}>
            <Text style={s.driverLabel}>TIME / HORA:</Text>
            <Text style={s.driverValue}>{ctpat.departure_hour ?? "--"}</Text>
          </View>
        </View>

        {/* Driver Identification header */}
        <View style={s.driverRow}>
          <View style={{ flex: 1, padding: 3, backgroundColor: "#f3f4f6" }}>
            <Text style={{ fontFamily: "Helvetica-Bold", textAlign: "center", fontSize: 8 }}>
              DRIVER IDENTIFICATION / IDENTIFICACIÓN DEL CONDUCTOR
            </Text>
          </View>
        </View>

        {/* License + photo */}
        <View style={s.driverRow}>
          <View style={s.driverCellSpan2}>
            <Text style={s.driverLabel}>LICENSE:</Text>
            <Text style={s.driverValue}>{str(driver?.license)}</Text>
          </View>
          <View style={{ ...s.driverCell, alignItems: "center", textAlign: "center" }}>
            <Text style={s.driverLabel}>DRIVER PHOTO ID:</Text>
            <Text style={s.driverSubLabel}>FOTO DE IDENTIFICACIÓN DEL CONDUCTOR</Text>
          </View>
          <View style={{ ...s.driverCellLast, alignItems: "center", justifyContent: "center" }}>
            {driver?.license_image ? (
              <Image
                src={imgUrl(driver.license_image)}
                style={s.driverLicenseImage}
              />
            ) : (
              <Text style={{ fontSize: 7, color: "#888888" }}>NO IMAGE</Text>
            )}
          </View>
        </View>

        {/* Carrier registration / License number */}
        <View style={s.driverRow}>
          <View style={s.driverCellSpan2}>
            <Text style={s.driverLabel}>NUMBER OF CARRIER REGISTRATION:</Text>
            <Text style={s.driverValue}>{str(driver?.identification)}</Text>
          </View>
          <View style={s.driverCellSpan2Last}>
            <Text style={s.driverLabel}>LICENSE NUMBER:</Text>
            <Text style={s.driverValue}>{str(driver?.license)}</Text>
          </View>
        </View>

        {/* Carrier name / Container number */}
        <View style={s.driverRow}>
          <View style={s.driverCellSpan2}>
            <Text style={s.driverLabel}>CARRIER NAME:</Text>
            <Text style={s.driverValue}>{str(packingList?.carrier)}</Text>
          </View>
          <View style={s.driverCellSpan2Last}>
            <Text style={s.driverLabel}>CONTAINER NUMBER:</Text>
            <Text style={s.driverValue}>{str(ctpat.container)}</Text>
          </View>
        </View>

        {/* Trailer seal / YES */}
        <View style={s.driverRowLast}>
          <View style={s.driverCellSpan2}>
            <Text style={s.driverLabel}>TRAILER SEAL:</Text>
            <Text style={s.driverValue}>
              {str(packingList?.no_marchamo ?? packingList?.seal ?? ctpat.seal)}
            </Text>
          </View>
          <View style={{ ...s.driverCellSpan2Last, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>YES</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Section 5: Checklist ────────────────────────────────────────────────

function ChecklistSection({ items }: { items: ChecklistItem[] }) {
  const grouped = items.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <View break>
      <View style={s.checklistMainHeader}>
        <Text>C-TPAT EXPORT TRAILER / CONTAINER INSPECTION FORM</Text>
        <Text>C-TPAT TRAILER DE EXPORTACION / FORMULARIO DE INSPECCIÓN DE CONTENEDORES</Text>
        <Text>TRUCK INSPECTION / INSPECCION DEL TRAILER</Text>
      </View>

      {items.length === 0 && (
        <Text style={{ textAlign: "center", padding: 10, color: "#888888" }}>
          Checklist pendiente — El checklist aún no ha sido completado
        </Text>
      )}

      {Object.entries(grouped).map(([type, conditions]) => {
        const lastIdx = conditions.length - 1;
        return (
          <View key={type} wrap={false}>
            <Text style={s.checklistGroupTitle}>
              {CHECKLIST_TYPE_LABELS[type] || type}
            </Text>
            <View style={s.checklistTable}>
              {conditions.map((item, idx) => (
                <View
                  key={item.id}
                  style={idx === lastIdx ? s.checklistRowLast : s.checklistRow}
                >
                  <View style={s.checklistConditionCell}>
                    <Text>{item.condition}</Text>
                  </View>
                  <View style={s.checklistYCell}>
                    <Text>{item.status ? "Y" : ""}</Text>
                  </View>
                  <View style={s.checklistNCell}>
                    <Text>{!item.status ? "N" : ""}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

// ─── Section 6: Observations ─────────────────────────────────────────────

function ObservationsSection({ observations }: { observations: Observation[] }) {
  const list = Array.isArray(observations) ? observations : [];
  const lastIdx = list.length - 1;

  return (
    <View break>
      <Text style={s.sectionTitle}>
        NON COMPLYING OBSERVATION: / OBSERVACIONES DE NO CUMPLIMIENTO
      </Text>

      <View style={s.obsTable}>
        {list.length > 0 ? (
          list.map((obs, idx) => (
            <View key={obs.id ?? idx} style={idx === lastIdx ? s.obsRowLast : s.obsRow}>
              <View style={s.obsConditionCell}>
                <Text>{idx + 1}. {obs.observation}</Text>
              </View>
              <View style={s.obsDataCell}>
                <Text>{obs.data}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={s.obsRowLast}>
            <View style={{ flex: 1, padding: 6 }}>
              <Text style={{ textAlign: "center", color: "#888888" }}>Sin observaciones</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

// ─── Section 7: Final Signatures ─────────────────────────────────────────

function SignaturesSection({
  signatureC,
  signatureE,
  imagesBaseUrl,
  imageBase64Cache,
}: {
  signatureC?: string | null;
  signatureE?: string | null;
  imagesBaseUrl: string;
  imageBase64Cache?: Record<string, string>;
}) {
  const imgUrl = (path: string) => {
    if (path.startsWith("data:")) return path;
    return imageBase64Cache?.[path] ?? `${imagesBaseUrl}/${path}`;
  };

  const signatures = [
    { label: "Quality Control and Food Safety", img: signatureC },
    { label: "Shipping Supervisor Signature", img: signatureE },
  ];

  return (
    <View break>
      <Text style={s.signaturesTitle}>FINAL SIGNATURES</Text>
      <View style={s.signaturesRow}>
        {signatures.map((sig, idx) => (
          <View key={idx} style={s.signatureBox}>
            {sig.img ? (
              <Image
                src={imgUrl(sig.img)}
                style={s.signatureImg}
              />
            ) : (
              <View style={s.signatureEmpty}>
                <Text>No signature</Text>
              </View>
            )}
            <Text style={s.signatureLabel}>{sig.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Main PDF Document ────────────────────────────────────────────────────

export default function CtpatPdfDocument({
  ctpat,
  images,
  observations,
  checklistItems,
  packingList,
  packingListTotals,
  productType,
  companyLogo,
  imagesBaseUrl,
  imageBase64Cache,
}: CtpatPdfDocumentProps) {
  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* Fixed header on every page */}
        <PageHeader companyLogo={companyLogo} />

        {/* Page 1: General Information + Container Pictures */}
        <GeneralInfoSection ctpat={ctpat} packingList={packingList} />
        <ImagesSection
          images={images}
          truck={ctpat.truck}
          driver={ctpat.driver}
          imagesBaseUrl={imagesBaseUrl}
          imageBase64Cache={imageBase64Cache}
          filterTypes={["CONTAINER PICTURES"]}
          addBreak={false}
        />

        {/* Page 2: Remaining Images */}
        <ImagesSection
          images={images}
          truck={ctpat.truck}
          driver={ctpat.driver}
          imagesBaseUrl={imagesBaseUrl}
          imageBase64Cache={imageBase64Cache}
          filterTypes={REMAINING_IMAGE_TYPES}
          addBreak={true}
        />

        {/* Page 3: Packing List */}
        <PackingListSection
          packingList={packingList}
          packingListTotals={packingListTotals}
          productType={productType}
        />

        {/* Page 4: Driver Table */}
        <DriverSection
          ctpat={ctpat}
          packingList={packingList}
          imagesBaseUrl={imagesBaseUrl}
          imageBase64Cache={imageBase64Cache}
        />

        {/* Page 5: Checklist */}
        <ChecklistSection items={checklistItems} />

        {/* Page 6: Observations */}
        <ObservationsSection observations={observations} />

        {/* Page 7: Signatures */}
        <SignaturesSection
          signatureC={ctpat.signature_c}
          signatureE={ctpat.signature_e}
          imagesBaseUrl={imagesBaseUrl}
          imageBase64Cache={imageBase64Cache}
        />

        {/* Fixed footer on every page */}
        <PageFooter docDate={ctpat.createdAt} />
      </Page>
    </Document>
  );
}
