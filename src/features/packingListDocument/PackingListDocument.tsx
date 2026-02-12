import React from "react";
import { useParams } from "react-router";
import {Document, Page, View, Text, PDFViewer, Image, BlobProvider} from "@react-pdf/renderer";
import { packingListDocumentSyles as styles } from "@/features/packingListDocument/packingList.styles";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Download, Eye } from "lucide-react";
import { getFrozenPackingList } from "@/features/packing-List/api/PackingListAPI";
import { getPackingListTotalsAPI } from "@/features/packing-List/api/PackingListTotals";
import { getfrozenItemsAPI } from "@/features/frozen-items/api/frozenItemAPI";
import { getCompanyLogoAPI } from "@/assets/CompanyLogoAPI";
import type { ResponsePackingList } from "@/features/packing-List/schemas/types";
import type { FrozenItemResponse } from "@/features/frozen-items/schema/frozenItemType";

/* ===============================================================
  1. INTERFACES
================================================================ */
interface HeaderData {
  carrier: string;
  productGeneral: string;
  orderNo: string;
  containerCondition: string;
  boxType: string;
  containerNo: string;
  containerType: string;
  lbsPerBox: string;
  seal: string;
  client: string;
  boxesTotal: number;
  beginningDate: string;
  thermographNo: string;
  tempExit: string;
  exitDate: string;
}

interface ItemData {
  fechaProduccion: string;
  producto: string;
  noTarima: number;
  lote: string | number;
  codigo: string;
  cajas: number;
  pesoBruto: number;
  pesoNeto: number;
  presentacion: string;
  temp: string;
  fechaExpiracion: string;
  po?: string;
  grn?: string;
}

interface Totals {
  totalCajas: number;
  totalPesoBruto: number;
  totalPesoNeto: number;
}
interface TotalRow {
  product: string;
  totalBoxes: number;
  weight: number;
  netWeight: number;
}

/* ===============================================================
  COLORES
================================================================ */
const HEADER_TEXT_COLOR = '#FFFFFF';

/* ===============================================================
  2. MAPPERS (API → PDF)
================================================================ */

// Función para formatear fechas sin problemas de zona horaria
// Convierte "2027-01-30" o "2027-01-30T00:00:00" a "30/1/2027"
// También maneja fechas que ya vienen formateadas como "1/30/2027"
const formatDateString = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "--";

  // Extraer solo la parte de la fecha (antes de T si existe)
  const datePart = dateStr.split('T')[0];

  // Si tiene guiones, es formato ISO (YYYY-MM-DD)
  if (datePart.includes('-')) {
    const [year, month, day] = datePart.split('-');
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  }

  // Si tiene slashes, ya está formateada - retornar como está
  if (datePart.includes('/')) {
    return datePart;
  }

  // Si no tiene ninguno, retornar el valor original
  return datePart;
};

// Tipo para los totales del endpoint (ahora es un array)
interface PackingListTotalsAPI {
  product: string;
  total_boxes: number;
  gross_weight: number;
  net_weight: number;
}

const mapHeader = (
  api: ResponsePackingList,
  totalsArray?: PackingListTotalsAPI[]
): HeaderData => {
  // Calcular totales sumando todos los productos
  const totalBoxes = totalsArray?.reduce((sum, t) => sum + t.total_boxes, 0) ?? 0;
  const products = totalsArray?.map(t => t.product).join(", ") ?? "-";

  return {
    carrier: api.carrier,
    productGeneral: products,
    orderNo: api.order,
    containerCondition: api.container_condition,
    boxType: api.box_type,
    containerNo: api.no_container,
    containerType: api.container_type,
    lbsPerBox: api.lbs_per_box,
    seal: api.seal,
    client: api.client,
    boxesTotal: totalBoxes,
    beginningDate: formatDateString(api.beginning_date),
    thermographNo: api.no_thermograph,
    tempExit: api.exit_temp,
    exitDate: formatDateString(api.exit_date),
  };
};

const mapItems = (
  items: FrozenItemResponse[],
): ItemData[] =>
  items.map((item) => ({
    fechaProduccion: formatDateString(item.production_date),
    producto: item.product,
    noTarima: item.no_tarima,
    lote: item.lote,
    codigo: item.code,
    cajas: item.boxes,
    pesoBruto: item.gross_weight,
    pesoNeto: item.net_weight,
    presentacion: item.presentation,
    temp: `${item.temp}°C`,
    fechaExpiracion: formatDateString(item.expiration_date),
    po: item.po ?? "",
    grn: item.grn ?? "",
  }));

const calculateTotals = (items: ItemData[]): Totals => ({
  totalCajas: items.reduce((a, b) => a + b.cajas, 0),
  totalPesoBruto: items.reduce((a, b) => a + b.pesoBruto, 0),
  totalPesoNeto: items.reduce((a, b) => a + b.pesoNeto, 0),
});

const mapTotalsTable = (totalsArray?: PackingListTotalsAPI[]): TotalRow[] => {
  if (!totalsArray || totalsArray.length === 0) return [];
  return totalsArray.map(totals => ({
    product: totals.product,
    totalBoxes: totals.total_boxes,
    weight: totals.gross_weight,
    netWeight: totals.net_weight,
  }));
};

/* ===============================================================
  3. COMPONENTES DE TABLA
================================================================ */
const TableHeader: React.FC<{ showPoGrn?: boolean }> = ({ showPoGrn }) => (
  <View style={[styles.tableRow, styles.tableHeader]} fixed>
    <Text style={[styles.colFecha, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>FECHA PRODUCCION</Text>
    <Text style={[styles.colProducto, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>PRODUCTO</Text>
    <Text style={[styles.colSmall, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>NO. TARIMA</Text>
    <Text style={[styles.colSmall, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>LOTE</Text>
    <Text style={[styles.colSmall, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>CODIGO</Text>
    <Text style={[styles.colSmall, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>CAJAS POR TARIMA</Text>
    <Text style={[styles.colMedium, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>PESO BRUTO</Text>
    <Text style={[styles.colMedium, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>PESO NETO</Text>
    <Text style={[styles.colPresentacion, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>PRESENTACION</Text>
    <Text style={[styles.colTemp, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>TEMP</Text>
    <Text style={[styles.colFecha, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>FECHA EXPIRACION</Text>

    {showPoGrn && (
      <>
        <Text style={[styles.colSmall, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>PO</Text>
        <Text style={[styles.colSmall, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>GRN</Text>
      </>
    )}
  </View>
);


const TableRow: React.FC<{
  item: ItemData;
  showPoGrn?: boolean;
}> = ({ item, showPoGrn }) => (
  <View style={styles.tableRow}>
    <Text style={styles.colFecha}>{item.fechaProduccion}</Text>
    <Text style={styles.colProducto}>{item.producto}</Text>
    <Text style={styles.colSmall}>{item.noTarima}</Text>
    <Text style={styles.colSmall}>{item.lote}</Text>
    <Text style={styles.colSmall}>{item.codigo}</Text>
    <Text style={styles.colSmall}>{item.cajas}</Text>
    <Text style={styles.colMedium}>{item.pesoBruto.toFixed(2)}</Text>
    <Text style={styles.colMedium}>{item.pesoNeto.toFixed(2)}</Text>
    <Text style={styles.colPresentacion}>{item.presentacion}</Text>
    <Text style={styles.colTemp}>{item.temp}</Text>
    <Text style={styles.colFecha}>{item.fechaExpiracion}</Text>

    {showPoGrn && (
      <>
        <Text style={styles.colSmall}>{item.po || "-"}</Text>
        <Text style={styles.colSmall}>{item.grn || "-"}</Text>
      </>
    )}
  </View>
);


const TableFooter: React.FC<{
  totals: Totals;
  showPoGrn?: boolean;
}> = ({ totals, showPoGrn }) => (
  <View style={styles.tableRow}>
    <Text
      style={
        showPoGrn
          ? styles.colTotalLabelWithPoGrn
          : styles.colTotalLabel
      }
    >
      TOTAL
    </Text>

    <Text style={[styles.colSmall, { backgroundColor: '#e2e8f0' }]}>
      {totals.totalCajas}
    </Text>

    <Text style={[styles.colMedium, { backgroundColor: '#e2e8f0' }]}>
      {totals.totalPesoBruto.toFixed(2)}
    </Text>

    <Text style={[styles.colMedium, { backgroundColor: '#e2e8f0' }]}>
      {totals.totalPesoNeto.toFixed(2)}
    </Text>

    <Text style={[styles.colPresentacion, { backgroundColor: '#e2e8f0' }]} />
    <Text style={[styles.colTemp, { backgroundColor: '#e2e8f0' }]} />
    <Text style={[styles.colFecha, { backgroundColor: '#e2e8f0' }]} />

    {showPoGrn && (
      <>
        <Text style={[styles.colSmall, { backgroundColor: '#e2e8f0' }]} />
        <Text style={[styles.colSmall, { backgroundColor: '#e2e8f0' }]} />
      </>
    )}
  </View>
);

/* ---------- TABLA DE TOTALES ---------- */

const TotalsTableHeader = () => (
  <View style={styles.totalsHeaderRow}>
    <Text style={[styles.totalsColProduct, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>PRODUCTO</Text>
    <Text style={[styles.totalsColSmall, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>TOTAL DE CAJAS</Text>
    <Text style={[styles.totalsColMedium, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>PESO BRUTO</Text>
    <Text style={[styles.totalsColMedium, { color: HEADER_TEXT_COLOR, borderColor: '#FFFFFF' }]}>PESO NETO</Text>
  </View>
);


const TotalsTableRow: React.FC<{ row: TotalRow }> = ({ row }) => (
  <View style={styles.totalsRow}>
    <Text style={styles.totalsColProduct}>{row.product}</Text>
    <Text style={styles.totalsColSmall}>{row.totalBoxes}</Text>
    <Text style={styles.totalsColMedium}>{row.weight.toFixed(2)}</Text>
    <Text style={styles.totalsColMedium}>{row.netWeight.toFixed(2)}</Text>
  </View>
);

const TotalsSection: React.FC<{ totals: TotalRow[] }> = ({ totals }) => (
  <View style={styles.totalsSection}>
    <Text style={styles.totalsTitle}>TOTALES POR PRODUCTO</Text>

    <View style={styles.totalsTable}>
      <TotalsTableHeader />
      {totals.map((row, i) => (
        <TotalsTableRow key={i} row={row} />
      ))}
    </View>
  </View>
);



/* ===============================================================
  4. HEADER
================================================================ */
const HeaderSection: React.FC<{ header: HeaderData; companyLogo?: string | null }> = ({ header, companyLogo }) => (
  <>
    {/* Encabezado Principal */}
    <View style={styles.headerGrid}>
      <View style={styles.logoCell}>
         {companyLogo && (
           <Image
             src={companyLogo}
             style={{width: '100%', height:'100%', objectFit:'contain'}}
           />
         )}
      </View>

      <View style={{ width: "70%" }}>
        <View style={{ flexDirection: "row", height: 25 }}>
          <View style={styles.formatCell}>
            <Text>FORMATO</Text>
          </View>
          {/* Quitamos borderRight al último elemento de la fila interna si el contenedor ya lo tiene */}
          <View style={{...styles.annexCell, borderRightWidth: 0}}> 
            <Text>ANEXO:</Text>
            <Text>CTP-ET 0451 {header.containerNo}</Text>
          </View>
        </View>

        {/* Usamos el estilo headerSubRow para poner el borde superior correcto */}
        <View style={styles.headerSubRow}>
          <View style={styles.packingListCell}>
            <Text style={{ color: HEADER_TEXT_COLOR }}>PACKING LIST</Text>
          </View>
          <View style={{...styles.versionCell, borderRightWidth: 0}}>
            <Text style={{ color: HEADER_TEXT_COLOR }}>VERSION:01</Text>
          </View>
        </View>
      </View>
    </View>

    {/* Tabla de Datos Generales - AQUI ESTA EL CAMBIO CLAVE DE BORDES */}
    <View style={styles.generalDataContainer}>
      
      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CARRIER:</Text>
        <Text style={styles.dataCellValue}>{header.carrier}</Text>
        <Text style={styles.dataCellLabelWide}>PRODUCT:</Text>
        <Text style={styles.dataCellProduct}>{header.productGeneral}</Text>
        <Text style={styles.dataCellLabel}>ORDER No.:</Text>
        <Text style={styles.dataCellNoBorder}>{header.orderNo}</Text>
      </View>
      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CONTAINER CONDITION:</Text>
        <Text style={styles.dataCellValue}>{header.containerCondition}</Text>
        <Text style={styles.dataCellLabelWide}>BOX TYPE:</Text>
        <Text style={styles.dataCellValueWide}>{header.boxType}</Text>
        <Text style={styles.dataCellLabel}>CONTAINER No.:</Text>
        <Text style={styles.dataCellNoBorder}>{header.containerNo}</Text>
      </View>
      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CONTAINER TYPE:</Text>
        <Text style={styles.dataCellValue}>{header.containerType}</Text>
        <Text style={styles.dataCellLabelWide}>LBS PER BOX:</Text>
        <Text style={styles.dataCellValueWide}>{header.lbsPerBox}</Text>
        <Text style={styles.dataCellLabel}>SEAL:</Text>
        <Text style={styles.dataCellNoBorder}>{header.seal}</Text>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CLIENT:</Text>
        <Text style={styles.dataCellValue}>{header.client}</Text>
        <Text style={styles.dataCellLabelWide}>BOXES:</Text>
        <Text style={styles.dataCellValueWide}>
          {header.boxesTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
        <Text style={styles.dataCellLabel}>BEGINNING DATE:</Text>
        <Text style={styles.dataCellNoBorder}>{header.beginningDate}</Text>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>THERMOGRAPH No:</Text>
        <Text style={styles.dataCellValue}>{header.thermographNo}</Text>
        <Text style={styles.dataCellLabelWide}>TEMP. EXIT:</Text>
        <Text style={styles.dataCellValueWide}>{header.tempExit}</Text>
        <Text style={styles.dataCellLabel}>EXIT DATE:</Text>
        <Text style={styles.dataCellNoBorder}>{header.exitDate}</Text>
      </View>
    </View>
  </>
);

/* ===============================================================
  5. PDF DOCUMENT
================================================================ */
type PackingListVariant = "NORMAL" | "WITH_PO_GRN";
const PackingListDocument: React.FC<{
  header: HeaderData;
  items: ItemData[];
  totals: Totals;
  totalsTable: TotalRow[];
  variant?: PackingListVariant;
  companyLogo?: string | null;
}> = ({ header, items, totals, totalsTable, variant = "NORMAL", companyLogo }) => {
  const showPoGrn = variant === "WITH_PO_GRN";

return (
  <Page size="LETTER" style={styles.page}>
    <View style={styles.section}>
      <HeaderSection header={header} companyLogo={companyLogo} />

      {/* TABLA PRINCIPAL */}
      <View style={styles.table}>
        <TableHeader showPoGrn={showPoGrn} />

        {items.map((item, i) => (
          <TableRow
            key={i}
            item={item}
            showPoGrn={showPoGrn}
          />
        ))}

        <TableFooter
          totals={totals}
          showPoGrn={showPoGrn}
        />
      </View>

      {/* TABLA DE TOTALES (SEPARADA) */}
      <TotalsSection totals={totalsTable} />
    </View>
  </Page>
);

};


/* ===============================================================
  6. GENERATOR (API + UI)
================================================================ */

// Detectar si es dispositivo móvil
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 768;
};

const PackingListGenerator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isMobile, setIsMobile] = useState(false);

  const [header, setHeader] = React.useState<HeaderData | null>(null);
  const [items, setItems] = React.useState<ItemData[]>([]);
  const [totals, setTotals] = React.useState<Totals | null>(null);
  const [totalsTable, setTotalsTable] = React.useState<TotalRow[]>([]);
  const [companyLogo, setCompanyLogo] = React.useState<string | null>(null);

  // Detectar móvil al montar
  useEffect(() => {
    setIsMobile(isMobileDevice());
    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [packingList, frozenItems, packingTotals, logoResponse] = await Promise.all([
          getFrozenPackingList(Number(id)),
          getfrozenItemsAPI(Number(id)),
          getPackingListTotalsAPI(Number(id)),
          getCompanyLogoAPI(),
        ]);

        // Guardar el logo de la empresa (ahora logoResponse es directamente el string)
        if (logoResponse) {
          setCompanyLogo(logoResponse);
        }

        if (!packingList) return;

        const headerMapped = mapHeader(packingList, packingTotals);
        const itemsMapped = mapItems(frozenItems ?? []);
        const totalsMapped = calculateTotals(itemsMapped);
        const totalsTableMapped = mapTotalsTable(packingTotals);

        setHeader(headerMapped);
        setItems(itemsMapped);
        setTotals(totalsMapped);
        setTotalsTable(totalsTableMapped);
      } catch (error) {
        console.error("Error fetching packing list data:", error);
      }
    };

    fetchData();
  }, [id]);

  const pdfDocument = React.useMemo(() => {
    if (!header || !totals) return null;

    return (
      <Document>
        <PackingListDocument
          header={header}
          items={items}
          totals={totals}
          totalsTable={totalsTable}
          variant="NORMAL"
          companyLogo={companyLogo}
        />
        <PackingListDocument
          header={header}
          items={items}
          totals={totals}
          totalsTable={totalsTable}
          variant="WITH_PO_GRN"
          companyLogo={companyLogo}
        />
      </Document>
    );
  }, [header, items, totals, totalsTable, companyLogo]);

  if (!header || !totals || !pdfDocument) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <ClipLoader size={60} color="#16a34a" />
          <p className="text-gray-600 font-medium">Cargando PDF...</p>
        </div>
      </div>
    );
  }

  // Vista para MÓVIL - Usar BlobProvider para descarga/apertura
  if (isMobile) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Packing List Frozen
          </h2>
          <p className="text-gray-600 mb-6">
            Contenedor: {header.containerNo}
          </p>

          <BlobProvider document={pdfDocument}>
            {({ blob, loading, error }) => {
              if (loading) {
                return (
                  <div className="flex flex-col items-center gap-4">
                    <ClipLoader size={40} color="#16a34a" />
                    <p className="text-gray-500">Generando PDF...</p>
                  </div>
                );
              }

              if (error) {
                return <p className="text-red-500">Error al generar PDF</p>;
              }

              const pdfUrl = blob ? URL.createObjectURL(blob) : '';

              return (
                <div className="flex flex-col gap-4">
                  {/* Botón para ABRIR en nueva pestaña */}
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    <Eye size={20} />
                    Abrir PDF
                  </a>

                  {/* Botón para DESCARGAR */}
                  <a
                    href={pdfUrl}
                    download={`PackingList_${header.containerNo}.pdf`}
                    className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    <Download size={20} />
                    Descargar PDF
                  </a>
                </div>
              );
            }}
          </BlobProvider>
        </div>
      </div>
    );
  }

  // Vista para DESKTOP - PDFViewer normal
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full h-[80vh] bg-white rounded-xl shadow-md overflow-hidden">
        <PDFViewer width="100%" height="100%">
          {pdfDocument}
        </PDFViewer>
      </div>
    </div>
  );
};

export default PackingListGenerator;