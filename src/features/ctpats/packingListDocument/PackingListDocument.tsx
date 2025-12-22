import React from "react";
import { useParams } from "react-router-dom";
import {Document, Page,View,Text,PDFDownloadLink,PDFViewer,Image,} from "@react-pdf/renderer";
import { packingListDocumentSyles as styles } from "@/features/ctpats/packingListDocument/packingList.styles";
import {getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import { useEffect } from "react";

/* ===============================================================
  1. INTERFACES
================================================================ */

interface ApiPackingItem {
  product: string;
  no_tarima: number;
  lote: number;
  code: string;
  boxes: number;
  weight: number;
  net_weight: number;
  presentation: string;
  temp: number;
  expiration_date: string;
  po?: string;
  grn?: string;
}

interface ApiPackingList {
  carrier: string;
  products: string;
  order: string;
  container_condition: string;
  box_type: string;
  no_container: string;
  container_type: string;
  lbs_per_box: string;
  seal: string;
  client: string;
  boxes: number;
  beginning_date: string;
  no_thermograph: string;
  exit_temp: string;
  exit_date: string;
  items: ApiPackingItem[];
}

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

/* ===============================================================
  2. MAPPERS (API → PDF)
================================================================ */

const mapHeader = (api: ApiPackingList): HeaderData => ({
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
  items: ApiPackingItem[],
  beginningDate: string
): ItemData[] =>
  items.map((item) => ({
    fechaProduccion: beginningDate,
    producto: item.product,
    noTarima: item.no_tarima,
    lote: item.lote,
    codigo: item.code,
    cajas: item.boxes,
    pesoBruto: item.weight,
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

/* ===============================================================
  3. COMPONENTES DE TABLA
================================================================ */

const TableHeader: React.FC<{ showPoGrn?: boolean }> = ({ showPoGrn }) => (
  <View style={[styles.tableRow, styles.tableHeader]} fixed>
    <Text style={styles.colFecha}>FECHA PRODUCCION</Text>
    <Text style={styles.colProducto}>PRODUCTO</Text>
    <Text style={styles.colSmall}>NO TARIMA</Text>
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


/* ===============================================================
  4. HEADER
================================================================ */

const HeaderSection: React.FC<{ header: HeaderData }> = ({ header }) => (
  <>
    {/* Encabezado Principal */}
    <View style={styles.headerGrid}>
      <View style={styles.logoCell}>
        <Image
          src="/src/assets/images/logo.png"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </View>

      <View style={{ width: "70%" }}>
        <View
          style={{
            flexDirection: "row",
            height: 25,
            borderBottom: "1px solid black",
          }}
        >
          <View style={styles.formatCell}>
            <Text>FORMATO</Text>
          </View>
          <View style={styles.annexCell}>
            <Text>ANEXO:</Text>
            <Text>CTP-ET 0451 {header.containerNo}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.packingListCell}>
            <Text>PACKING LIST</Text>
          </View>
          <View style={styles.versionCell}>
            <Text>VERSION:01</Text>
          </View>
        </View>
      </View>
    </View>

    {/* Tabla de Datos Generales */}
    <View style={{ border: "1px solid black", borderTopWidth: 1 }}>
      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CARRIER:</Text>
        <Text style={styles.dataCellValue}>{header.carrier}</Text>

        <Text style={styles.dataCellLabelWide}>PRODUCT:</Text>
        <Text style={styles.dataCellProduct}>
          {header.productGeneral}
        </Text>

        <Text style={styles.dataCellLabel}>ORDER No.:</Text>
        <Text style={styles.dataCellNoBorder}>{header.orderNo}</Text>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>
          CONTAINER CONDITION:
        </Text>
        <Text style={styles.dataCellValue}>
          {header.containerCondition}
        </Text>

        <Text style={styles.dataCellLabelWide}>BOX TYPE:</Text>
        <Text style={styles.dataCellValueWide}>
          {header.boxType}
        </Text>

        <Text style={styles.dataCellLabel}>CONTAINER No.:</Text>
        <Text style={styles.dataCellNoBorder}>
          {header.containerNo}
        </Text>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CONTAINER TYPE:</Text>
        <Text style={styles.dataCellValue}>
          {header.containerType}
        </Text>

        <Text style={styles.dataCellLabelWide}>LBS PER BOX:</Text>
        <Text style={styles.dataCellValueWide}>
          {header.lbsPerBox}
        </Text>

        <Text style={styles.dataCellLabel}>SEAL:</Text>
        <Text style={styles.dataCellNoBorder}>
          {header.seal}
        </Text>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CLIENT:</Text>
        <Text style={styles.dataCellValue}>{header.client}</Text>

        <Text style={styles.dataCellLabelWide}>BOXES:</Text>
        <Text style={styles.dataCellValueWide}>
          {header.boxesTotal.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </Text>

        <Text style={styles.dataCellLabel}>BEGINNING DATE:</Text>
        <Text style={styles.dataCellNoBorder}>
          {header.beginningDate}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.dataCellLabel}>THERMOGRAPH No:</Text>
        <Text style={styles.dataCellValue}>
          {header.thermographNo}
        </Text>

        <Text style={styles.dataCellLabelWide}>TEMP. EXIT:</Text>
        <Text style={styles.dataCellValueWide}>
          {header.tempExit}
        </Text>

        <Text style={styles.dataCellLabel}>EXIT DATE:</Text>
        <Text style={styles.dataCellNoBorder}>
          {header.exitDate}
        </Text>
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
  variant?: PackingListVariant;
}> = ({ header, items, totals, variant = "NORMAL" }) => {
  const showPoGrn = variant === "WITH_PO_GRN";

  return (
    <Page size="LETTER" style={styles.page}>
          <View style={styles.section}>
            <HeaderSection header={header} />
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

    useEffect(() => {
      if (!id) return;

      getCtpatByIdAPI(Number(id))
        .then(({ response }) => {
          const packing: ApiPackingList = response.packingList;

          const headerMapped = mapHeader(packing);
          const itemsMapped = mapItems(
            packing.items || [],
            headerMapped.beginningDate
          );
          const totalsMapped = calculateTotals(itemsMapped);

          setHeader(headerMapped);
          setItems(itemsMapped);
          setTotals(totalsMapped);
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
            variant="NORMAL"
          />

          {/* HOJA 2 - CON PO / GRN */}
          <PackingListDocument
            header={header}
            items={items}
            totals={totals}
            variant="WITH_PO_GRN"
          />
        </Document>
      );
    }, [header, items, totals]);

    if (!header || !totals || !pdfDocument) {
      return <p>Cargando PDF...</p>;
    }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Botón de descarga */}
      <div className="flex justify-center mb-6">
        <PDFDownloadLink
          document={pdfDocument}
          fileName={`PackingList-${id}.pdf`}
        >
          {({ loading }) => (
            <button
              disabled={loading}
              className={`
                px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition duration-200
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 hover:scale-105"
                }
              `}
            >
              {loading ? "Generando PDF..." : "⬇️ Descargar Packing List"}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      {/* Visor PDF */}
      <div className="w-full h-[80vh] bg-white rounded-xl shadow-md overflow-hidden">
        <PDFViewer width="100%" height="100%">
          {pdfDocument}
        </PDFViewer>
      </div>
    </div>
  );
};

export default PackingListGenerator;

