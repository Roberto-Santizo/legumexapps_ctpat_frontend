import React from "react";
import { useParams } from "react-router-dom";
import {Document, Page,View,Text,PDFViewer,Image,} from "@react-pdf/renderer";
import { packingListDocumentSyles as styles } from "@/features/packing-List/packingListDocument/packingList.styles";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import {getPackingListById} from "@/features/packing-List/api/PackingListAPI";
import type {PackingListFormData} from "@/features/packing-List/schemas/types";

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
  lote: number;
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
  2. MAPPERS (API → PDF)
================================================================ */

const mapHeader = (api: PackingListFormData): HeaderData => ({
  carrier: api.carrier,
  productGeneral: api.products,
  orderNo: api.order,
  containerCondition: api.container_condition,
  boxType: api.box_type,
  containerNo: api.no_container,
  containerType: api.container_type,
  lbsPerBox: api.lbs_per_box,
  seal: api.seal,
  client: api.client,
  boxesTotal: api.boxes,
  beginningDate: new Date(api.beginning_date).toLocaleDateString(),
  thermographNo: api.no_thermograph,
  tempExit: api.exit_temp,
  exitDate: new Date(api.exit_date).toLocaleDateString(),
});

const mapItems = (
  items: PackingListFormData["items"],
  beginningDate: string
): ItemData[] =>
  items.map((item) => ({
    fechaProduccion: beginningDate,
    producto: item.product,
    noTarima: item.no_tarima,
    lote: item.lote,
    codigo: item.code,
    cajas: item.boxes,
    pesoBruto: item.gross_weight,
    pesoNeto: item.net_weight,
    presentacion: item.presentation,
    temp: `${item.temp}°C`,
    fechaExpiracion: new Date(item.expiration_date).toLocaleDateString(),
    po: item.po ?? "",
    grn: item.grn ?? "",
  }));

const calculateTotals = (items: ItemData[]): Totals => ({
  totalCajas: items.reduce((a, b) => a + b.cajas, 0),
  totalPesoBruto: items.reduce((a, b) => a + b.pesoBruto, 0),
  totalPesoNeto: items.reduce((a, b) => a + b.pesoNeto, 0),
});

const mapTotalsTable = (
  totals: PackingListFormData["totals"]
): TotalRow[] =>
  totals.map((t) => ({
    product: t.product,
    totalBoxes: t.total_boxes,
    weight: t.gross_weight,
    netWeight: t.net_weight,
  }));

/* ===============================================================
  3. COMPONENTES DE TABLA
================================================================ */
const TableHeader: React.FC<{ showPoGrn?: boolean }> = ({ showPoGrn }) => (
  <View style={[styles.tableRow, styles.tableHeader]} fixed>
    <Text style={styles.colFecha}>FECHA PRODUCCION</Text>
    <Text style={styles.colProducto}>PRODUCTO</Text>
    <Text style={styles.colSmall}>NO. TARIMA</Text>
    <Text style={styles.colSmall}>LOTE</Text>
    <Text style={styles.colSmall}>CODIGO</Text>
    <Text style={styles.colSmall}>CAJAS</Text>
    <Text style={styles.colMedium}>PESO BRUTO</Text>
    <Text style={styles.colMedium}>PESO NETO</Text>
    <Text style={styles.colPresentacion}>PRESENTACION</Text>
    <Text style={styles.colTemp}>TEMP</Text>
    <Text style={styles.colFecha}>FECHA EXPIRACION</Text>

    {showPoGrn && (
      <>
        <Text style={styles.colSmall}>PO</Text>
        <Text style={styles.colSmall}>GRN</Text>
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

    <Text style={styles.colSmall}>
      {totals.totalCajas}
    </Text>

    <Text style={styles.colMedium}>
      {totals.totalPesoBruto.toFixed(2)}
    </Text>

    <Text style={styles.colMedium}>
      {totals.totalPesoNeto.toFixed(2)}
    </Text>

    <Text style={styles.colPresentacion} />
    <Text style={styles.colTemp} />
    <Text style={styles.colFecha} />

    {showPoGrn && (
      <>
        <Text style={styles.colSmall} />
        <Text style={styles.colSmall} />
      </>
    )}
  </View>
);

/* ---------- TABLA DE TOTALES ---------- */

const TotalsTableHeader = () => (
  <View style={styles.totalsHeaderRow}>
    <Text style={styles.totalsColProduct}>PRODUCTO</Text>
    <Text style={styles.totalsColSmall}>TOTAL DE CAJAS</Text>
    <Text style={styles.totalsColMedium}>PESO BRUTO</Text>
    <Text style={styles.totalsColMedium}>PESO NETO</Text>
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
const HeaderSection: React.FC<{ header: HeaderData }> = ({ header }) => (
  <>
    {/* Encabezado Principal */}
    <View style={styles.headerGrid}>
      <View style={styles.logoCell}>
         {/* Tu imagen ... */}
         <Image src="/src/assets/images/logo.png" style={{width: '100%', height:'100%', objectFit:'contain'}} />
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
            <Text>PACKING LIST</Text>
          </View>
          <View style={{...styles.versionCell, borderRightWidth: 0}}>
            <Text>VERSION:01</Text>
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
}> = ({ header, items, totals,totalsTable, variant = "NORMAL" }) => {
  const showPoGrn = variant === "WITH_PO_GRN";

return (
  <Page size="LETTER" style={styles.page}>
    <View style={styles.section}>
      <HeaderSection header={header} />

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

const PackingListGenerator: React.FC = () => {
  const { id } = useParams<{ id: string }>();

    const [header, setHeader] = React.useState<HeaderData | null>(null);
    const [items, setItems] = React.useState<ItemData[]>([]);
    const [totals, setTotals] = React.useState<Totals | null>(null);
    const [totalsTable, setTotalsTable] = React.useState<TotalRow[]>([]);


  useEffect(() => {
    if (!id) return;

    getPackingListById(Number(id))
      .then((packing: PackingListFormData) => {
        const headerMapped = mapHeader(packing);

        const itemsMapped = mapItems(
          packing.items,
          headerMapped.beginningDate
        );

        const totalsMapped = calculateTotals(itemsMapped);
        const totalsTableMapped = mapTotalsTable(packing.totals);


        setHeader(headerMapped);
        setItems(itemsMapped);
        setTotals(totalsMapped);
        setTotalsTable(totalsTableMapped);

      });
  }, [id]);

    const pdfDocument = React.useMemo(() => {
      if (!header || !totals) return null;

      return (
        <Document>
          {/* HOJA 1 - SIN PO / GRN */}
        <PackingListDocument
          header={header}
          items={items}
          totals={totals}
          totalsTable={totalsTable}
          variant="NORMAL"
        />

          {/* HOJA 2 - CON PO / GRN */}
          <PackingListDocument
            header={header}
            items={items}
            totals={totals}
            totalsTable={totalsTable}
            variant="WITH_PO_GRN"
          />

        </Document>
      );
    }, [header, items, totals]);

    if (!header || !totals || !pdfDocument) {
      return <p>Cargando PDF...</p>;
    }

    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        {!pdfDocument ? (
          <div className="flex flex-col items-center gap-4">
            <ClipLoader size={60} color="#16a34a" />
            <p className="text-gray-600 font-medium">
              Generando documento PDF...
            </p>
          </div>
        ) : (
          <div className="w-full h-[80vh] bg-white rounded-xl shadow-md overflow-hidden">
            <PDFViewer width="100%" height="100%">
              {pdfDocument}
            </PDFViewer>
          </div>
        )}
      </div>
    );

};

export default PackingListGenerator;

