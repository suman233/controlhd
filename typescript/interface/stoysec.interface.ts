export interface InVRoot {
  status: boolean
  code: number
  message: string
  data: Inventory[]
}

export interface Inventory {
  id: number
  part_no: string
  quantity: number
  description: string
  document_full_path: string
}
