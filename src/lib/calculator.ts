import BigNumber from 'bignumber.js'

export enum CALCULATOR_ACTION {
  ADD = '+',
  MINUS = '-',
  MULTIPLY = '×',
  DIVIDE = '÷'
}

export default class Calculator {
  history: { action: CALCULATOR_ACTION; prev: BigNumber; next: BigNumber }[]
  value: BigNumber
  constructor(value: BigNumber) {
    this.history = []
    this.value = value
  }
  static base(value: BigNumber.Value) {
    return new Calculator(new BigNumber(value || 0))
  }
  add(val: BigNumber.Value) {
    this.history.push({
      action: CALCULATOR_ACTION.ADD,
      prev: this.value,
      next: (this.value = this.value.plus(val))
    })
    return this
  }
  minus(val: BigNumber.Value) {
    this.history.push({
      action: CALCULATOR_ACTION.MINUS,
      prev: this.value,
      next: (this.value = this.value.minus(val))
    })
    return this
  }
  multiply(val: BigNumber.Value) {
    this.history.push({
      action: CALCULATOR_ACTION.MINUS,
      prev: this.value,
      next: (this.value = this.value.multipliedBy(val))
    })
    return this
  }
  divide(val: BigNumber.Value) {
    this.history.push({
      action: CALCULATOR_ACTION.MINUS,
      prev: this.value,
      next: (this.value = this.value.dividedBy(val))
    })
    return this
  }
  toString() {
    return this.value.toString(10)
  }
  toNumber() {
    return this.value.toNumber()
  }
  toBigint() {
    return BigInt(this.toNumber())
  }
  toFixed(decimal: number = 2, roundingMode?: BigNumber.RoundingMode) {
    return this.value.toFixed(decimal, roundingMode)
  }
  toFormat(params?: { decimal?: number; roundingMode?: BigNumber.RoundingMode; format?: BigNumber.Format }) {
    const { decimal = 2, roundingMode = BigNumber.ROUND_DOWN, format } = params || {}
    const fmt = {
      prefix: '',
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
      secondaryGroupSize: 0,
      fractionGroupSeparator: ' ',
      fractionGroupSize: 0,
      suffix: '',
      ...format
    }
    return this.value.toFormat(decimal, roundingMode, fmt)
  }
}
