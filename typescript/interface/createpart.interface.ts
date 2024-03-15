export interface PartsMatrixType {
    part_no: string;
    description: string;
    manufacturer: string;
    price: number;
    part_type: string;
    commissioning_actions: string;
    engineering_actions: string;
    controller_ao: number;
    controller_ai: number;
    controller_di: number;
    controller_do: number;
    damper: boolean;
    valve: boolean;
    damper_length: string;
    damper_width: string;
    torque: string;
    signal_type: string;
    dumper_valve_type: string;
    valve_cv: string;
    valve_pipe_diameter_inch: string;
    valve_type: string;
    valve_body_style: string;
    document: File | null;
  }