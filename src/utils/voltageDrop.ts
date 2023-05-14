/**
 * copper wire resistivity in ohm-meters
 * @author <https://www.rapidtables.com/calc/wire/voltage-drop-calculator.html>
 */
const COPPER_RESISTIVITY = 1.72e-8 // Copper resistivity (Ω·m)

/**
 * Calculate voltage drop percentage
 * @param current Wire current in amps
 * @param length Wire length in meters
 * @param awg n gauge
 * @param voltage Source voltage in volts
 */
export function calculateVoltageDropPercentage(
  current: number,
  length: number,
  awg: number,
  voltage: number
) {
  return (calculateVoltageDrop(current, length, awg) / voltage) * 100
}

/**
 * Vdrop (V) = Iwire (A) × (2 × L(m) × Rwire (Ω/km) / 1000(m/km))
 * @param current Wire current in amps
 * @param length Wire length in meters
 * @param awg n gauge
 * @author <https://www.rapidtables.com/calc/wire/voltage-drop-calculator.html>
 */
export function calculateVoltageDrop(current: number, length: number, awg: number) {
  return current * ((2 * length * calculateWireResistance(awg)) / 1000)
}

/**
 * Rn (Ω/km) = 10^9 × ρ(Ω·m) / An (mm2)
 * @param awg n gauge
 * @author <https://www.rapidtables.com/calc/wire/voltage-drop-calculator.html>
 */
export function calculateWireResistance(awg: number) {
  return (Math.pow(10, 9) * COPPER_RESISTIVITY) / calculateCrossSection(awg)
}

/**
 * An (mm2) = 0,012668 mm2 × 92^(36-n)/19,5
 * @param awg n gauge
 * @author <https://www.rapidtables.com/calc/wire/voltage-drop-calculator.html>
 */
export function calculateCrossSection(awg: number) {
  return 0.012668 * Math.pow(92, (36 - awg) / 19.5)
}
