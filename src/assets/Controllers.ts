export const ControllerTypes = ['2go', 'uno', 'quad'] as const
export type ControllerTypes = (typeof ControllerTypes)[number]

export const Controllers = {
  '2go': {
    channels: 1,
    supportedVoltages: [5],
    maxAmperage: 3
  },
  uno: {
    channels: 2,
    supportedVoltages: [5, 12, 24],
    maxAmperage: 15
  },
  quad: {
    channels: 4,
    supportedVoltages: [5, 12, 24],
    maxAmperage: 30
  }
} satisfies Controllers

type Controllers = {
  [key in ControllerTypes]: {
    channels: number
    supportedVoltages: SupportedVoltages
    maxAmperage: number
  }
}

type SupportedVoltages = {
  0?: 5
  1?: 12
  2?: 24
}

export function isVoltageSupported(controller: ControllerTypes, voltage: number): boolean {
  return Controllers[controller].supportedVoltages.includes(voltage as any)
}
