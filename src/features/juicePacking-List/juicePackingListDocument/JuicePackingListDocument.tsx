import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { packingListTableStyles as styles } from "@/features/juicePacking-List/juicePackingListDocument/JuicePackingList.Styles";

/* ===============================================================
   INTERFACES
================================================================ */

interface ContainerInfo {
  naviera: string;
  condicionesContenedor: string;
  tipoContenedor: string;
  noContenedor: string;
  noOrden: string;
  noMarchamo: string;
  cliente: string;
  termografo: string;
  estiloCorteProducto: string;
  tipoCaja: string;
  librasPorCaja: string;
  cantidadCajas: number;
  fechaInicio: string;
  fechaSalida: string;
  tempSalidaCont: string;
}

interface PackingListItem {
  fecha: string;
  producto: string;
  ticketNumero: number;
  codigo: string;
  totalCajas: number;
  pesoBruto: number;
  pesoNeto: number;
  cantidadBotellas: number;
  tipoEmpaque: string;
  temp: string;
  bestBy: string;
  grn: string;
}

interface GroupData {
  groupName: string;
  items: PackingListItem[];
  totals: {
    totalCajas: number;
    pesoBruto: number;
    pesoNeto: number;
    cantidadBotellas: number;
  };
}

interface GrandTotals {
  totalCajas: number;
  pesoBruto: number;
  pesoNeto: number;
  cantidadBotellas: number;
}

/* ===============================================================
   COMPANY HEADER COMPONENT
================================================================ */
const CompanyHeader: React.FC<{ companyLogo?: string | null }> = ({ companyLogo }) => (
  <View style={styles.companyHeaderContainer}>
    <View style={styles.companyInfo}>
      <Text style={styles.companyName}>AGROINDUSTRIA LEGUMEX S.A.</Text>
      <Text style={styles.companyAddress}>
        12 Avenida Sector Las Majadas 6-15 Zona 2,
      </Text>
      <Text style={styles.companyAddress}>El Tejar, Chimaltenango</Text>
      <Text style={styles.companyPhone}>Tel: (502) 7849 Fax: 7849-0995</Text>
    </View>

    <View style={styles.logoContainer}>
      {companyLogo && (
        <Image
          src={companyLogo}
          style={styles.logo}
        />
      )}
    </View>
  </View>
);

/* ===============================================================
   TITLE COMPONENT
================================================================ */
const TitleSection: React.FC = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>PACKING LIST</Text>
  </View>
);

/* ===============================================================
   CONTAINER INFO SECTION - 4 COLUMNAS
================================================================ */
const ContainerInfoSection: React.FC<{ info: ContainerInfo }> = ({ info }) => (
  <View style={styles.containerInfoSection}>
    {/* Fila 1 */}
    <View style={styles.containerInfoRow}>
      <View style={styles.infoLabelCellLeft}>
        <Text style={styles.infoLabelText}>NAVIERA:</Text>
      </View>
      <View style={styles.infoValueCellLeft}>
        <Text style={styles.infoValueText}>{info.naviera}</Text>
      </View>
      <View style={styles.infoLabelCellRight}>
        <Text style={styles.infoLabelText}>ESTILO/CORTE/PRODUCTO:</Text>
      </View>
      <View style={styles.infoValueCellRight}>
        <Text style={styles.infoValueText}>{info.estiloCorteProducto}</Text>
      </View>
    </View>

    {/* Fila 2 */}
    <View style={styles.containerInfoRow}>
      <View style={styles.infoLabelCellLeft}>
        <Text style={styles.infoLabelText}>CONDICIONES DEL CONTENEDOR:</Text>
      </View>
      <View style={styles.infoValueCellLeft}>
        <Text style={styles.infoValueText}>{info.condicionesContenedor}</Text>
      </View>
      <View style={styles.infoLabelCellRight}>
        <Text style={styles.infoLabelText}>TIPO DE CAJA:</Text>
      </View>
      <View style={styles.infoValueCellRight}>
        <Text style={styles.infoValueText}>{info.tipoCaja}</Text>
      </View>
    </View>

    {/* Fila 3 */}
    <View style={styles.containerInfoRow}>
      <View style={styles.infoLabelCellLeft}>
        <Text style={styles.infoLabelText}>TIPO DE CONTENEDOR:</Text>
      </View>
      <View style={styles.infoValueCellLeft}>
        <Text style={styles.infoValueText}>{info.tipoContenedor}</Text>
      </View>
      <View style={styles.infoLabelCellRight}>
        <Text style={styles.infoLabelText}>LIBRAS POR CAJA:</Text>
      </View>
      <View style={styles.infoValueCellRight}>
        <Text style={styles.infoValueText}>{info.librasPorCaja}</Text>
      </View>
    </View>

    {/* Fila 4 */}
    <View style={styles.containerInfoRow}>
      <View style={styles.infoLabelCellLeft}>
        <Text style={styles.infoLabelText}>No. DEL CONTENEDOR:</Text>
      </View>
      <View style={styles.infoValueCellLeft}>
        <Text style={styles.infoValueText}>{info.noContenedor}</Text>
      </View>
      <View style={styles.infoLabelCellRight}>
        <Text style={styles.infoLabelText}>CANTIDAD DE CAJAS:</Text>
      </View>
      <View style={styles.infoValueCellRight}>
        <Text style={styles.infoValueText}>{info.cantidadCajas}</Text>
      </View>
    </View>

    {/* Fila 5 */}
    <View style={styles.containerInfoRow}>
      <View style={styles.infoLabelCellLeft}>
        <Text style={styles.infoLabelText}>No. DE ORDEN:</Text>
      </View>
      <View style={styles.infoValueCellLeft}>
        <Text style={styles.infoValueText}>{info.noOrden}</Text>
      </View>
      <View style={styles.infoLabelCellRight}>
        <Text style={styles.infoLabelText}>FECHA DE INICIO:</Text>
      </View>
      <View style={styles.infoValueCellRight}>
        <Text style={styles.infoValueText}>{info.fechaInicio}</Text>
      </View>
    </View>

    {/* Fila 6 */}
    <View style={styles.containerInfoRow}>
      <View style={styles.infoLabelCellLeft}>
        <Text style={styles.infoLabelText}>No. DE MARCHAMO:</Text>
      </View>
      <View style={styles.infoValueCellLeft}>
        <Text style={styles.infoValueText}>{info.noMarchamo}</Text>
      </View>
      <View style={styles.infoLabelCellRight}>
        <Text style={styles.infoLabelText}>FECHA DE SALIDA:</Text>
      </View>
      <View style={styles.infoValueCellRight}>
        <Text style={styles.infoValueText}>{info.fechaSalida}</Text>
      </View>
    </View>

    {/* Fila 7 */}
    <View style={styles.containerInfoRow}>
      <View style={styles.infoLabelCellLeft}>
        <Text style={styles.infoLabelText}>CLIENTE:</Text>
      </View>
      <View style={styles.infoValueCellLeft}>
        <Text style={styles.infoValueText}>{info.cliente}</Text>
      </View>
      <View style={styles.infoLabelCellRight}>
        <Text style={styles.infoLabelText}>TEMP. DE SALIDA DE CONT.:</Text>
      </View>
      <View style={styles.infoValueCellRight}>
        <Text style={styles.infoValueText}>{info.tempSalidaCont}</Text>
      </View>
    </View>

    {/* Fila 8 - última */}
    <View style={styles.containerInfoRowLast}>
      <View style={styles.infoLabelCellLeft}>
        <Text style={styles.infoLabelText}>TERMOGRAFO:</Text>
      </View>
      <View style={styles.infoValueCellLeft}>
        <Text style={styles.infoValueText}>{info.termografo}</Text>
      </View>
      <View style={styles.infoLabelCellRight}>
        <Text style={styles.infoLabelText}></Text>
      </View>
      <View style={styles.infoValueCellRight}>
        <Text style={styles.infoValueText}></Text>
      </View>
    </View>
  </View>
);

/* ===============================================================
   TABLE HEADER COMPONENT
================================================================ */
const TableHeader: React.FC<{ showGrn?: boolean }> = ({ showGrn }) => (
  <View style={styles.tableHeaderRow} fixed>
    {/* FECHA */}
    <View style={[styles.headerCell, { width: "7%" }]}>
      <Text>FECHA</Text>
    </View>

    {/* PRODUCTO */}
    <View style={[styles.headerCell, { width: showGrn ? "17%" : "22%" }]}>
      <Text>PRODUCTO</Text>
    </View>

    {/* TICKET NUMERO */}
    <View style={[styles.headerCell, { width: "6%" }]}>
      <Text>TICKET{"\n"}NUMERO</Text>
    </View>

    {/* CODIGO */}
    <View style={[styles.headerCell, { width: "9%" }]}>
      <Text>CODIGO</Text>
    </View>

    {/* TOTAL DE CAJAS */}
    <View style={[styles.headerCell, { width: "7%" }]}>
      <Text>TOTAL DE{"\n"}CAJAS</Text>
    </View>

    {/* PESO (BRUTO / NETO) */}
    <View style={[styles.pesoHeaderContainer, showGrn ? { width: "12%" } : { width: "14%" }]}>
      <Text style={styles.pesoHeaderTitle}>PESO</Text>
      <View style={styles.pesoSubHeaders}>
        <Text style={styles.pesoSubHeaderCell}>BRUTO</Text>
        <Text style={styles.pesoSubHeaderCellLast}>NETO</Text>
      </View>
    </View>

    {/* CANTIDAD DE BOTELLAS */}
    <View style={[styles.headerCell, { width: "8%" }]}>
      <Text>CANTIDAD DE{"\n"}BOTELLAS</Text>
    </View>

    {/* TIPO EMPAQUE */}
    <View style={[styles.headerCell, { width: showGrn ? "9%" : "10%" }]}>
      <Text>TIPO{"\n"}EMPAQUE</Text>
    </View>

    {/* TEMP */}
    <View style={[styles.headerCell, { width: showGrn ? "5%" : "6%" }]}>
      <Text>TEMP.</Text>
    </View>

    {/* BEST BY */}
    <View style={[showGrn ? styles.headerCell : styles.headerCellNoBorder, { width: showGrn ? "10%" : "11%" }]}>
      <Text>BEST BY</Text>
    </View>

    {/* GRN */}
    {showGrn && (
      <View style={[styles.headerCellNoBorder, { width: "10%" }]}>
        <Text>GRN</Text>
      </View>
    )}
  </View>
);

/* ===============================================================
   TABLE ROW COMPONENT
================================================================ */
const TableRow: React.FC<{ item: PackingListItem; isAlt?: boolean; showGrn?: boolean }> = ({
  item,
  isAlt = false,
  showGrn = false,
}) => (
  <View style={isAlt ? styles.tableRowAlt : styles.tableRow}>
    <Text style={styles.colFecha}>{item.fecha}</Text>
    <Text style={showGrn ? styles.colProductoGrn : styles.colProducto}>{item.producto}</Text>
    <Text style={styles.colTicket}>{item.ticketNumero}</Text>
    <Text style={styles.colCodigo}>{item.codigo}</Text>
    <Text style={styles.colTotalCajas}>{item.totalCajas}</Text>
    <Text style={showGrn ? styles.colPesoBrutoGrn : styles.colPesoBruto}>{item.pesoBruto.toFixed(2)}</Text>
    <Text style={showGrn ? styles.colPesoNetoGrn : styles.colPesoNeto}>{item.pesoNeto.toFixed(2)}</Text>
    <Text style={styles.colCantidadBotellas}>{item.cantidadBotellas}</Text>
    <Text style={showGrn ? styles.colTipoEmpaqueGrn : styles.colTipoEmpaque}>{item.tipoEmpaque}</Text>
    <Text style={showGrn ? styles.colTempGrn : styles.colTemp}>{item.temp}</Text>
    <Text style={showGrn ? styles.colBestByGrn : styles.colBestBy}>{item.bestBy}</Text>
    {showGrn && (
      <Text style={styles.colGrn}>{item.grn || "-"}</Text>
    )}
  </View>
);

/* ===============================================================
   GROUP HEADER COMPONENT (WALMART, etc.)
================================================================ */
const GroupHeader: React.FC<{ groupName: string }> = ({ groupName }) => (
  <View style={styles.groupHeaderRow}>
    <Text style={styles.groupHeaderText}>{groupName}</Text>
  </View>
);

/* ===============================================================
   GROUP TOTAL ROW COMPONENT
================================================================ */
const GroupTotalRow: React.FC<{
  totals: GroupData["totals"];
  showGrn?: boolean;
}> = ({ totals, showGrn = false }) => (
  <View style={styles.totalRow}>
    <Text style={[styles.totalLabelCell, { width: showGrn ? "39%" : "44%" }]}>TOTAL</Text>
    <Text style={[styles.totalValueCell, { width: "7%" }]}>
      {totals.totalCajas}
    </Text>
    <Text style={[styles.totalValueCell, { width: showGrn ? "6%" : "7%" }]}>
      {totals.pesoBruto.toFixed(2)}
    </Text>
    <Text style={[styles.totalValueCell, { width: showGrn ? "6%" : "7%" }]}>
      {totals.pesoNeto.toFixed(2)}
    </Text>
    <Text style={[styles.totalValueCell, { width: "8%" }]}>
      {totals.cantidadBotellas}
    </Text>
    <View style={[styles.emptyCell, { width: showGrn ? "9%" : "10%" }]} />
    <View style={[styles.emptyCell, { width: showGrn ? "5%" : "6%" }]} />
    <View style={[showGrn ? styles.emptyCell : styles.emptyCellNoBorder, { width: showGrn ? "10%" : "11%" }]} />
    {showGrn && <View style={[styles.emptyCellNoBorder, { width: "10%" }]} />}
  </View>
);

/* ===============================================================
   SUMA TOTAL ROW COMPONENT (Grand Total)
================================================================ */
const SumaTotalRow: React.FC<{ grandTotals: GrandTotals; showGrn?: boolean }> = ({
  grandTotals,
  showGrn = false,
}) => (
  <View style={styles.sumaTotalRow}>
    <Text style={[styles.sumaTotalLabelCell, { width: showGrn ? "39%" : "44%" }]}>SUMA TOTAL</Text>
    <Text style={[styles.sumaTotalValueCell, { width: "7%" }]}>
      {grandTotals.totalCajas}
    </Text>
    <Text style={[styles.sumaTotalValueCell, { width: showGrn ? "6%" : "7%" }]}>
      {grandTotals.pesoBruto.toFixed(2)}
    </Text>
    <Text style={[styles.sumaTotalValueCell, { width: showGrn ? "6%" : "7%" }]}>
      {grandTotals.pesoNeto.toFixed(2)}
    </Text>
    <Text style={[styles.sumaTotalValueCell, { width: "8%" }]}>
      {grandTotals.cantidadBotellas}
    </Text>
    <View style={[styles.emptyCellNoBorder, { width: showGrn ? "9%" : "10%" }]} />
    <View style={[styles.emptyCellNoBorder, { width: showGrn ? "5%" : "6%" }]} />
    <View style={[styles.emptyCellNoBorder, { width: showGrn ? "10%" : "11%" }]} />
    {showGrn && <View style={[styles.emptyCellNoBorder, { width: "10%" }]} />}
  </View>
);

/* ===============================================================
   HELPER: Interfaces para el API
================================================================ */
interface APIPackingListItem {
  id: number;
  date: string;
  product: string;
  code: string;
  ticket_number: number;
  total_boxes: number;
  net_weight: number;
  gross_weight: number;
  bottles: number;
  wrapper: string;
  temp: number;
  expiration_date: string;
  grn: string;
}

interface APIGroupItem {
  [key: string]: APIPackingListItem[] | { total_boxes: number; net_weight: number; gross_weight: number; bottles: number };
}

interface APIPackingList {
  carrier: string;
  container_condition: string;
  container_type: string;
  no_container: string;
  order: string;
  no_marchamo: string;
  client: string;
  no_thermograph: string;
  products: string;
  box_type: string;
  lbs_per_box: string;
  total_boxes: number;
  beginning_date: string;
  exit_date: string | null;
  exit_temp: string;
  items: APIGroupItem[];
  totals: {
    total_boxes: number;
    net_weight: number;
    gross_weight: number;
    bottles: number;
  };
}

/* ===============================================================
   HELPER: Funciones de transformación
================================================================ */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  } catch {
    return dateString;
  }
};

const transformAPIData = (apiPackingList: APIPackingList) => {
  const containerInfo: ContainerInfo = {
    naviera: apiPackingList.carrier || '',
    condicionesContenedor: apiPackingList.container_condition || '',
    tipoContenedor: apiPackingList.container_type || '',
    noContenedor: apiPackingList.no_container || '',
    noOrden: apiPackingList.order || '',
    noMarchamo: apiPackingList.no_marchamo || '',
    cliente: apiPackingList.client || '',
    termografo: apiPackingList.no_thermograph || '',
    estiloCorteProducto: apiPackingList.products || '',
    tipoCaja: apiPackingList.box_type || '',
    librasPorCaja: apiPackingList.lbs_per_box || '',
    cantidadCajas: apiPackingList.total_boxes || 0,
    fechaInicio: formatDate(apiPackingList.beginning_date),
    fechaSalida: apiPackingList.exit_date ? formatDate(apiPackingList.exit_date) : '',
    tempSalidaCont: apiPackingList.exit_temp || '',
  };

  const groupsData: GroupData[] = apiPackingList.items.map((groupItem) => {
    const groupKey = Object.keys(groupItem).find(key => key !== 'totals') || '';
    const itemsArray = groupItem[groupKey] as APIPackingListItem[];
    const groupTotals = groupItem.totals as { total_boxes: number; net_weight: number; gross_weight: number; bottles: number };

    return {
      groupName: groupKey,
      items: itemsArray.map((apiItem) => ({
        fecha: formatDate(apiItem.date),
        producto: apiItem.product,
        ticketNumero: apiItem.ticket_number,
        codigo: apiItem.code,
        totalCajas: apiItem.total_boxes,
        pesoBruto: apiItem.gross_weight,
        pesoNeto: apiItem.net_weight,
        cantidadBotellas: apiItem.bottles,
        tipoEmpaque: apiItem.wrapper,
        temp: `${apiItem.temp}°C`,
        bestBy: apiItem.expiration_date || '',
        grn: apiItem.grn ?? '',
      })),
      totals: {
        totalCajas: groupTotals.total_boxes,
        pesoBruto: groupTotals.gross_weight,
        pesoNeto: groupTotals.net_weight,
        cantidadBotellas: groupTotals.bottles,
      },
    };
  });

  const grandTotals: GrandTotals = {
    totalCajas: apiPackingList.totals.total_boxes,
    pesoBruto: apiPackingList.totals.gross_weight,
    pesoNeto: apiPackingList.totals.net_weight,
    cantidadBotellas: apiPackingList.totals.bottles,
  };

  return { containerInfo, groupsData, grandTotals };
};

/* ===============================================================
   JUICE PACKING LIST PAGE COMPONENT (reutilizable por variante)
================================================================ */
const JuicePackingListPage: React.FC<{
  containerInfo: ContainerInfo;
  groupsData: GroupData[];
  grandTotals: GrandTotals;
  showGrn?: boolean;
  companyLogo?: string | null;
}> = ({ containerInfo, groupsData, grandTotals, showGrn = false, companyLogo }) => (
  <Page size="LETTER" orientation="portrait" style={styles.page}>
    {/* Header con info de empresa y logo */}
    <CompanyHeader companyLogo={companyLogo} />

    {/* Título centrado */}
    <TitleSection />

    {/* Información del contenedor - 4 columnas */}
    <ContainerInfoSection info={containerInfo} />

    {/* Tabla principal */}
    <View style={styles.table}>
      {/* Encabezado de la tabla */}
      <TableHeader showGrn={showGrn} />

      {/* Grupos de datos */}
      {groupsData.map((group, groupIndex) => (
        <React.Fragment key={groupIndex}>
          {/* Header del grupo (WALMART, etc.) */}
          <GroupHeader groupName={group.groupName} />

          {/* Filas de datos del grupo */}
          {group.items.map((item, itemIndex) => (
            <TableRow
              key={`${groupIndex}-${itemIndex}`}
              item={item}
              isAlt={itemIndex % 2 === 1}
              showGrn={showGrn}
            />
          ))}

          {/* Fila de total del grupo */}
          <GroupTotalRow totals={group.totals} showGrn={showGrn} />
        </React.Fragment>
      ))}

      {/* Fila de SUMA TOTAL (grand total) */}
      <SumaTotalRow grandTotals={grandTotals} showGrn={showGrn} />
    </View>
  </Page>
);

/* ===============================================================
   MAIN PDF DOCUMENT COMPONENT
================================================================ */
interface PackingListTableDocumentProps {
  apiPackingList: APIPackingList;
  companyLogo?: string | null;
}

const PackingListTableDocument: React.FC<PackingListTableDocumentProps> = ({ apiPackingList, companyLogo }) => {
  const { containerInfo, groupsData, grandTotals } = transformAPIData(apiPackingList);

  return (
    <Document>
      {/* Página 1: Normal (sin GRN) */}
      <JuicePackingListPage
        containerInfo={containerInfo}
        groupsData={groupsData}
        grandTotals={grandTotals}
        companyLogo={companyLogo}
      />
      {/* Página 2: Con GRN */}
      <JuicePackingListPage
        containerInfo={containerInfo}
        groupsData={groupsData}
        grandTotals={grandTotals}
        showGrn
        companyLogo={companyLogo}
      />
    </Document>
  );
};

/* ===============================================================
   PDF VIEWER COMPONENT (para visualizar en el navegador)
================================================================ */
interface PackingListTableViewerProps {
  apiPackingList: APIPackingList;
}

const PackingListTableViewer: React.FC<PackingListTableViewerProps> = ({ apiPackingList }) => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full h-[90vh] bg-white rounded-xl shadow-md overflow-hidden">
        <PDFViewer width="100%" height="100%">
          <PackingListTableDocument apiPackingList={apiPackingList} />
        </PDFViewer>
      </div>
    </div>
  );
};

export { PackingListTableDocument, PackingListTableViewer };
export type { ContainerInfo, PackingListItem, GroupData, GrandTotals, APIPackingList };
export default PackingListTableViewer;