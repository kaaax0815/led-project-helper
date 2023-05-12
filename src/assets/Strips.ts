export const Strips = [
  {
    type: 'WS2812b',
    voltage: 5,
    powerDraw: {
      RGB_50: 33.9
    },
    lEDsPerMeter: 60
  },
  {
    type: 'WS2812b-Eco',
    voltage: 5,
    powerDraw: {
      RGB_50: 24.8
    },
    lEDsPerMeter: 60
  },
  {
    type: 'SK6812',
    voltage: 5,
    powerDraw: {
      RGB_50: 26.3
    },
    lEDsPerMeter: 60
  },
  {
    type: 'WS2815',
    voltage: 12,
    powerDraw: {
      RGB_50: 27.0
    },
    lEDsPerMeter: 60
  },
  {
    type: 'WS2811',
    voltage: 12,
    powerDraw: {
      RGB_50: 41.41
    },
    lEDsPerMeter: 60
  },
  {
    type: 'WS2811',
    voltage: 12,
    powerDraw: {
      RGB_50: 53.5
    },
    lEDsPerMeter: 96
  },
  {
    type: 'WS2811',
    voltage: 12,
    powerDraw: {
      RGB_50: 76.34
    },
    lEDsPerMeter: 144
  },
  {
    type: 'SK6812',
    voltage: 12,
    powerDraw: {
      RGB_50: 16.5
    },
    lEDsPerMeter: 60
  },
  {
    type: 'WS2811',
    voltage: 24,
    powerDraw: {
      RGB_50: 72.87
    },
    lEDsPerMeter: 60
  },
  {
    type: 'SK6812',
    voltage: 24,
    powerDraw: {
      RGB_50: 22.42
    },
    lEDsPerMeter: 60
  },
  {
    type: 'WS2814',
    voltage: 24,
    powerDraw: {
      RGB_50: 34.51
    },
    lEDsPerMeter: 60
  },
  {
    type: 'WS2811',
    voltage: 24,
    powerDraw: {
      RGB_50: 59.0
    },
    lEDsPerMeter: 240
  }
] satisfies Strip[]

export type Voltages = 5 | 12 | 24
export const StripTypes = [
  'WS2812b',
  'WS2812b-Eco',
  'SK6812',
  'WS2815',
  'WS2811',
  'WS2814'
] as const
export type StripTypes = (typeof StripTypes)[number]

export type Strip = {
  type: StripTypes
  /** @Unit `V [Volt]` */
  voltage: Voltages
  /** Based on `5m` length */
  powerDraw: {
    /** @Unit `W [Watt]` */
    RGB_50: number
  }
  /** @Unit `LEDs/m [LEDs per meter]` */
  lEDsPerMeter: number
}

// Ignored for now
export type Variants = 'Normal' | 'Bright'

export type Modes = keyof Strip['powerDraw']

export function calculatePower(strip: Strip, length: number, mode: Modes = 'RGB_50') {
  const wattage = strip.powerDraw[mode] * (length / 5)
  const voltage = strip.voltage
  const amperage = wattage / voltage

  return {
    wattage,
    voltage,
    amperage
  }
}

/**
 * Front and Back can handle 4A each
 * Each middle injection can handle 8A
 * Tolerance of 0.5A
 */
export function calculateInjections(strip: Strip, length: number) {
  const { amperage } = calculatePower(strip, length)
  if (amperage <= 4) {
    return [`Front (${amperage.toFixed(1)}A)`]
  }
  if (amperage <= 9) {
    const half = (amperage / 2).toFixed(1)
    return [`Front (${half}A)`, `Back (${half}A)`]
  }
  const remaining = amperage - 8
  const middleInjections = Math.ceil((remaining - 0.5) / 8)
  return [`Front (4A)`, `${middleInjections}x Middle (${remaining.toFixed(1)}A)`, `Back (4A)`]
}
