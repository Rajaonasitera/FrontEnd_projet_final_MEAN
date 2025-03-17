export interface MenuItem {
  group: string;
  route?: string | null;
  separator?: boolean;
  selected?: boolean;
  active?: boolean;
  // items: Array<SubMenuItem>;
}

export interface SubMenuItem {
  icon?: string;
  label?: string;
  route?: string | null;
  expanded?: boolean;
  active?: boolean;
  children?: Array<SubMenuItem>;
}
