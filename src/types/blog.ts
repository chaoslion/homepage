type AdditionalPostSectionType = "references" | "related";
export interface AdditionalPostSection {
  type: AdditionalPostSectionType;
  label: string;
}

export interface BibsCollectionConsumed {
  href: string;
  label: string;
  order: number;
}
