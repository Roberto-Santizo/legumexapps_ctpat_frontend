export interface PackingListItemTable {
  id: number;
  product: string;
  no_tarima: number;
  lote: number;
  boxes: number;
  temp: number;
  expiration_date: string;
  grn: string;
  po: string;
}

export interface PackingListHeader {
  id: number;
  ctpat_id: number;
  carrier: string;
  order: string;
  client: string;
  no_container: string;
  container_type: string;
  seal: string;
  boxes: number;
  beginning_date: string;
  items: PackingListItemTable[];
}
