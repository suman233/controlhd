export interface MatrixRoot {
    status: boolean
    code: number
    message: string
    data: PTM[]
  }
  
  export interface PTM {
    id: number
    user_id: number
    unique_id: string
    part_no: string
    description: string
    manufacturer: string
    doc: string
    file_name: string
    price: number
    part_type: string
    controller_ao?: string
    controller_ai: string
    controller_di: string
    controller_do: string
    damper: number
    damper_length?: string
    damper_width?: string
    valve: number
    valve_cv: any
    valve_pipe_diameter_inch: any
    valve_type: any
    valve_body_style: any
    torque?: string
    signal_type?: string
    dumper_valve_type?: string
    commissioning_actions: string
    engineering_actions: string
    quantity?: number
    created_at: string
    updated_at: string
    document_full_path: string
  }
  