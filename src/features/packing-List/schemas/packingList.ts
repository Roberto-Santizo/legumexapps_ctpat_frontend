export interface PackingListItemTable {
  id: number;
  product: string;
  no_tarima: number;
  lote: number;
  boxes: number;
  temp: number;
  net_weight: number,
  gross_weight: number,
  expiration_date: string;
  grn: string;
  po?: string;
}

export type PackingListHeaderView = {
  id: number;
  carrier: string;
  client: string;
  order: string;
  no_container: string;
  container_type: string;
  seal: string;
  boxes: number;
  beginning_date: string;
};
