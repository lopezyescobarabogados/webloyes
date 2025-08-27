interface ServiceSection {
  title: string;
  items: string[];
}

export interface ServiceModalData {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  keyServices?: string[] | ServiceSection[];
  icon?: string;
}
