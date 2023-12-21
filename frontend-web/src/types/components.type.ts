export interface SelectOption {
  label: string
  value: string
}

export interface CustomChangeEvent {
  target: {
    name: string
    value: string
  }
}
