import React from 'react';
import { Document, Page, View, Text, PDFDownloadLink, PDFViewer, Image} from '@react-pdf/renderer';
import {packingListDocumentSyles as styles} from "@/features/ctpats/packingListDocument/packingList.styles"

// =================================================================
// 1. Tipos de Datos (Interfaces)
// =================================================================

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

interface Totals {
    totalCajas: number;
    totalPesoBruto: number;
    totalPesoNeto: number;
}


// =================================================================
// 2. Datos Quemados (Hardcoded Data)
// =================================================================

const HARDCODED_HEADER: HeaderData = {
  carrier: "CMA CGM",
  productGeneral: "PEACHES, STRAWBERRIES & BANANAS / BROCCOLI NORMANDY",
  orderNo: "ET 0451",
  containerCondition: "APPROVED",
  boxType: "PRINTED",
  containerNo: "TRIU 808916-8",
  containerType: "HC 48",
  lbsPerBox: "10.5/12 LBS",
  seal: "C7792048",
  client: "H.E.B.",
  boxesTotal: 3211.0,
  beginningDate: "9/16/2025",
  thermographNo: "7202500",
  tempExit: "-24.4°C",
  exitDate: "9/16/2025",
};

const HARDCODED_ITEMS: ItemData[] = [
  // --- PEACHES-STRAWBERRIES-BANANAS (Tarimas 1-9) ---
  { fechaProduccion: "9/16/2025", producto: "PEACHES-STRAWBERRIES-BANANAS", noTarima: 1, lote: 1, codigo: "25259 ET1", cajas: 182, pesoBruto: 2056.60, pesoNeto: 1911.00, presentacion: "12X14 ONZ", temp: "-18.8°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "PEACHES-STRAWBERRIES-BANANAS", noTarima: 2, lote: 2, codigo: "25259 ET1", cajas: 182, pesoBruto: 2056.60, pesoNeto: 1911.00, presentacion: "12X14 ONZ", temp: "-18.9°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "PEACHES-STRAWBERRIES-BANANAS", noTarima: 3, lote: 3, codigo: "25259 ET1", cajas: 182, pesoBruto: 2056.60, pesoNeto: 1911.00, presentacion: "12X14 ONZ", temp: "-18.6°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "PEACHES-STRAWBERRIES-BANANAS", noTarima: 4, lote: 4, codigo: "25259 ET1", cajas: 182, pesoBruto: 2056.60, pesoNeto: 1911.00, presentacion: "12X14 ONZ", temp: "-18.1°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "PEACHES-STRAWBERRIES-BANANAS", noTarima: 5, lote: 5, codigo: "25259 ET1", cajas: 182, pesoBruto: 2056.60, pesoNeto: 1911.00, presentacion: "12X14 ONZ", temp: "-18.2°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "PEACHES-STRAWBERRIES-BANANAS", noTarima: 6, lote: 6, codigo: "25259 ET1", cajas: 182, pesoBruto: 2056.60, pesoNeto: 1911.00, presentacion: "12X14 ONZ", temp: "-18.2°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "PEACHES-STRAWBERRIES-BANANAS", noTarima: 7, lote: 7, codigo: "25259 ET1", cajas: 182, pesoBruto: 2056.60, pesoNeto: 1911.00, presentacion: "12X14 ONZ", temp: "-18.3°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "PEACHES-STRAWBERRIES-BANANAS", noTarima: 8, lote: 8, codigo: "25259 ET1", cajas: 182, pesoBruto: 2056.60, pesoNeto: 1911.00, presentacion: "12X14 ONZ", temp: "-18.7°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "PEACHES-STRAWBERRIES-BANANAS", noTarima: 9, lote: 9, codigo: "25259 ET1", cajas: 182, pesoBruto: 2056.60, pesoNeto: 1911.00, presentacion: "12X14 ONZ", temp: "-18.3°C", fechaExpiracion: "9/16/26" },
  
  // --- BROCCOLI NORMANDY (Tarimas 10-20) ---
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 10, lote: 1, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.5°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 11, lote: 2, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.8°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 12, lote: 3, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.2°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 13, lote: 4, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.4°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 14, lote: 5, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-19.0°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 15, lote: 6, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.3°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 16, lote: 7, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.6°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 17, lote: 8, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.4°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 18, lote: 9, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.9°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 19, lote: 10, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.8°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 20, lote: 11, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.8°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 18, lote: 9, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.9°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 19, lote: 10, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.8°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 20, lote: 11, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.8°C", fechaExpiracion: "9/16/26" },
  { fechaProduccion: "9/16/2025", producto: "BROCCOLI NORMANDY", noTarima: 12, lote: 3, codigo: "25259 ET1", cajas: 143, pesoBruto: 1844.70, pesoNeto: 1716.00, presentacion: "12X16 ONZ", temp: "-18.2°C", fechaExpiracion: "9/16/26" },
];

const HARDCODED_TOTALS: Totals = {
    totalCajas: 3211,
    totalPesoBruto: 38801.10, 
    totalPesoNeto: 36075.00, 
}

// =================================================================
// 4. Componentes Específicos del PDF
// =================================================================

const TableHeader: React.FC = () => (
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
  </View>
);

const TableRow: React.FC<{ item: ItemData }> = ({ item }) => (
  <View style={styles.tableRow}>
    <Text style={styles.colFecha}>{item.fechaProduccion.replace('/2025', '/20')}</Text>
    <Text style={styles.colProducto}>{item.producto}</Text>
    <Text style={styles.colSmall}>{item.noTarima}</Text>
    <Text style={styles.colSmall}>{item.lote}</Text>
    <Text style={styles.colSmall}>{item.codigo.replace(' ET1', '')}</Text>
    <Text style={styles.colSmall}>{item.cajas}</Text>
    <Text style={styles.colMedium}>{item.pesoBruto.toFixed(2)}</Text>
    <Text style={styles.colMedium}>{item.pesoNeto.toFixed(2)}</Text>
    <Text style={styles.colPresentacion}>{item.presentacion}</Text>
    <Text style={styles.colTemp}>{item.temp}</Text>
    <Text style={styles.colFecha}>{item.fechaExpiracion.replace('/26', '')}</Text>
  </View>
);

const TableFooter: React.FC = () => (
  <View style={styles.tableRow}>
    {/* TOTAL label (colspan simulado) */}
    <Text style={styles.colTotalLabel}>TOTAL</Text>

    {/* CAJAS */}
    <Text style={styles.colSmall}>
      {HARDCODED_TOTALS.totalCajas}
    </Text>

    {/* PESO BRUTO */}
    <Text style={styles.colMedium}>
      {HARDCODED_TOTALS.totalPesoBruto.toFixed(2)}
    </Text>

    {/* PESO NETO */}
    <Text style={styles.colMedium}>
      {HARDCODED_TOTALS.totalPesoNeto.toFixed(2)}
    </Text>

    {/* PRESENTACION */}
    <Text style={styles.colPresentacion}></Text>

    {/* TEMP */}
    <Text style={styles.colTemp}></Text>

    {/* FECHA EXPIRACION (sin borde derecho si ya tienes borde de tabla) */}
    <Text style={styles.colFecha}></Text>
  </View>
);


const HeaderSection: React.FC = () => (
  <>
    {/* Encabezado Principal */}
    <View style={styles.headerGrid}>
      <View style={styles.logoCell}>
        {/* Placeholder para el Logo */}
        <Image
          src="/src/assets/images/logo.png"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </View>
      <View style={{ width: '70%'}}>
        <View style={{ flexDirection: 'row', height: 25, borderBottom: '1px solid black' }}>
          <View style={styles.formatCell}><Text>FORMATO</Text></View>
          <View style={styles.annexCell}><Text>ANEXO:</Text><Text>CTP-ET 0451 TRIU 808916-8</Text></View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.packingListCell}><Text>PACKING LIST</Text></View>
          <View style={styles.versionCell}><Text>VERSION:01</Text></View>
        </View>
      </View>
    </View>

    {/* Tabla de Datos Generales */}
    <View style={{ border: '1px solid black', borderTopWidth: 1 }}>
      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CARRIER:</Text>
        <Text style={styles.dataCellValue}>{HARDCODED_HEADER.carrier}</Text>
        <Text style={styles.dataCellLabelWide}>PRODUCT:</Text>
        <Text style={styles.dataCellProduct}>{HARDCODED_HEADER.productGeneral}</Text>
        <Text style={styles.dataCellLabel}>ORDER No.:</Text>
        <Text style={styles.dataCellNoBorder}>{HARDCODED_HEADER.orderNo}</Text>
      </View>
      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CONTAINER CONDITION:</Text>
        <Text style={styles.dataCellValue}>{HARDCODED_HEADER.containerCondition}</Text>
        <Text style={styles.dataCellLabelWide}>BOX TYPE:</Text>
        <Text style={styles.dataCellValueWide}>{HARDCODED_HEADER.boxType}</Text>
        <Text style={styles.dataCellLabel}>CONTAINER No.:</Text>
        <Text style={styles.dataCellNoBorder}>{HARDCODED_HEADER.containerNo}</Text>
      </View>
      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CONTAINER TYPE:</Text>
        <Text style={styles.dataCellValue}>{HARDCODED_HEADER.containerType}</Text>
        <Text style={styles.dataCellLabelWide}>LBS PER BOX:</Text>
        <Text style={styles.dataCellValueWide}>{HARDCODED_HEADER.lbsPerBox}</Text>
        <Text style={styles.dataCellLabel}>SEAL:</Text>
        <Text style={styles.dataCellNoBorder}>{HARDCODED_HEADER.seal}</Text>
      </View>
      <View style={styles.dataRow}>
        <Text style={styles.dataCellLabel}>CLIENT:</Text>
        <Text style={styles.dataCellValue}>{HARDCODED_HEADER.client}</Text>
        <Text style={styles.dataCellLabelWide}>BOXES:</Text>
        <Text style={styles.dataCellValueWide}>{HARDCODED_HEADER.boxesTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</Text>
        <Text style={styles.dataCellLabel}>BEGINNING DATE:</Text>
        <Text style={styles.dataCellNoBorder}>{HARDCODED_HEADER.beginningDate}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.dataCellLabel}>THERMOGRAPH No:</Text>
        <Text style={styles.dataCellValue}>{HARDCODED_HEADER.thermographNo}</Text>
        <Text style={styles.dataCellLabelWide}>TEMP. EXIT:</Text>
        <Text style={styles.dataCellValueWide}>{HARDCODED_HEADER.tempExit}</Text>
        <Text style={styles.dataCellLabel}>EXIT DATE:</Text>
        <Text style={styles.dataCellNoBorder}>{HARDCODED_HEADER.exitDate}</Text>
      </View>
    </View>
  </>
);

// =================================================================
// 5. Componente Principal del Documento PDF (Para React-PDF)
// =================================================================

export const PackingListDocument: React.FC = () => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <View style={styles.section}>
        <HeaderSection />

        {/* Tabla de Items */}
        <View style={styles.table}>
          <TableHeader />
          {HARDCODED_ITEMS.map((item, index) => (
            <TableRow item={item} key={index} />
          ))}
          <TableFooter />
        </View>
      </View>
    </Page>
  </Document>
);

// =================================================================
// 6. Componente de Aplicación (Para usar en tu proyecto React con Tailwind CSS)
// =================================================================

const PackingListGenerator: React.FC = () => {
    const fileName = "PackingList_TRIU808916-8.pdf";
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">📋 Documento Packing List</h1>
            
            {/* Botón de Descarga usando Tailwind CSS */}
            <div className="flex justify-center mb-6">
                <PDFDownloadLink 
                    document={<PackingListDocument />} 
                    fileName={fileName}
                >
                    {({ loading }) => (
                        <button 
                            className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-150 ${
                                loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                            }`}
                            disabled={loading}
                        >
                            {loading ? 'Cargando documento...' : `⬇️ Descargar PDF: ${fileName}`}
                        </button>
                    )}
                </PDFDownloadLink>
            </div>

            {/* Visor para ver cómo se verá antes de descargar (Recomendado) */}
            <div className="w-full h-[80vh] border-2 border-gray-300 rounded-lg shadow-lg">
                <PDFViewer width="100%" height="100%">
                    <PackingListDocument />
                </PDFViewer>
            </div>
        </div>
    );
};

export default PackingListGenerator;