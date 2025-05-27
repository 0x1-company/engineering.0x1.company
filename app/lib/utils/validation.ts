/**
 * Propsバリデーションユーティリティ
 * @description コンポーネントのpropsを実行時に検証するためのユーティリティ関数群
 */

/**
 * バリデーションエラー
 */
export class ValidationError extends Error {
  constructor(componentName: string, propName: string, message: string) {
    super(`[${componentName}] Invalid prop "${propName}": ${message}`)
    this.name = 'ValidationError'
  }
}

/**
 * 必須プロパティの検証
 */
export function validateRequired<T>(
  value: T | undefined | null,
  propName: string,
  componentName: string
): T {
  if (value === undefined || value === null) {
    throw new ValidationError(componentName, propName, 'Required prop is missing')
  }
  return value
}

/**
 * 文字列の検証
 */
export function validateString(
  value: unknown,
  propName: string,
  componentName: string,
  options?: {
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    allowEmpty?: boolean
  }
): string {
  if (typeof value !== 'string') {
    throw new ValidationError(componentName, propName, `Expected string, got ${typeof value}`)
  }

  if (!options?.allowEmpty && value.length === 0) {
    throw new ValidationError(componentName, propName, 'String cannot be empty')
  }

  if (options?.minLength && value.length < options.minLength) {
    throw new ValidationError(componentName, propName, `String must be at least ${options.minLength} characters long`)
  }

  if (options?.maxLength && value.length > options.maxLength) {
    throw new ValidationError(componentName, propName, `String must be at most ${options.maxLength} characters long`)
  }

  if (options?.pattern && !options.pattern.test(value)) {
    throw new ValidationError(componentName, propName, `String does not match pattern ${options.pattern}`)
  }

  return value
}

/**
 * 数値の検証
 */
export function validateNumber(
  value: unknown,
  propName: string,
  componentName: string,
  options?: {
    min?: number
    max?: number
    integer?: boolean
  }
): number {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new ValidationError(componentName, propName, `Expected number, got ${typeof value}`)
  }

  if (options?.integer && !Number.isInteger(value)) {
    throw new ValidationError(componentName, propName, 'Expected integer value')
  }

  if (options?.min !== undefined && value < options.min) {
    throw new ValidationError(componentName, propName, `Number must be at least ${options.min}`)
  }

  if (options?.max !== undefined && value > options.max) {
    throw new ValidationError(componentName, propName, `Number must be at most ${options.max}`)
  }

  return value
}

/**
 * 配列の検証
 */
export function validateArray<T>(
  value: unknown,
  propName: string,
  componentName: string,
  options?: {
    minLength?: number
    maxLength?: number
    itemValidator?: (item: unknown, index: number) => T
  }
): T[] {
  if (!Array.isArray(value)) {
    throw new ValidationError(componentName, propName, `Expected array, got ${typeof value}`)
  }

  if (options?.minLength && value.length < options.minLength) {
    throw new ValidationError(componentName, propName, `Array must have at least ${options.minLength} items`)
  }

  if (options?.maxLength && value.length > options.maxLength) {
    throw new ValidationError(componentName, propName, `Array must have at most ${options.maxLength} items`)
  }

  if (options?.itemValidator) {
    const validator = options.itemValidator
    return value.map((item, index) => {
      try {
        return validator(item, index)
      } catch (error) {
        throw new ValidationError(componentName, `${propName}[${index}]`, error instanceof Error ? error.message : 'Invalid item')
      }
    })
  }

  return value as T[]
}

/**
 * Enum値の検証
 */
export function validateEnum<T extends string>(
  value: unknown,
  propName: string,
  componentName: string,
  validValues: readonly T[]
): T {
  if (!validValues.includes(value as T)) {
    throw new ValidationError(
      componentName,
      propName,
      `Expected one of [${validValues.join(', ')}], got "${value}"`
    )
  }
  return value as T
}

/**
 * URLの検証
 */
export function validateUrl(
  value: unknown,
  propName: string,
  componentName: string,
  options?: {
    allowRelative?: boolean
    allowMailto?: boolean
    protocols?: string[]
  }
): string {
  const url = validateString(value, propName, componentName)

  if (options?.allowRelative && (url.startsWith('/') || url.startsWith('#'))) {
    return url
  }

  if (options?.allowMailto && url.startsWith('mailto:')) {
    return url
  }

  try {
    const parsedUrl = new URL(url)
    
    if (options?.protocols && !options.protocols.includes(parsedUrl.protocol.slice(0, -1))) {
      throw new ValidationError(
        componentName,
        propName,
        `URL protocol must be one of [${options.protocols.join(', ')}]`
      )
    }
    
    return url
  } catch {
    throw new ValidationError(componentName, propName, 'Invalid URL format')
  }
}

/**
 * 日付文字列の検証（YYYY-MM-DD形式）
 */
export function validateDateString(
  value: unknown,
  propName: string,
  componentName: string
): string {
  const dateString = validateString(value, propName, componentName, {
    pattern: /^\d{4}-\d{2}-\d{2}$/
  })

  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    throw new ValidationError(componentName, propName, 'Invalid date format')
  }

  return dateString
}

/**
 * コンポーネントPropsの検証ヘルパー
 * @description 開発環境でのみ検証を実行
 */
export function validateProps<T extends Record<string, any>>(
  componentName: string,
  props: T,
  validators: {
    [K in keyof T]?: (value: T[K]) => T[K]
  }
): T {
  // 本番環境では検証をスキップ
  if (process.env.NODE_ENV === 'production') {
    return props
  }

  const validatedProps = { ...props }

  for (const [propName, validator] of Object.entries(validators)) {
    if (validator && propName in props) {
      try {
        (validatedProps as any)[propName] = validator((props as any)[propName])
      } catch (error) {
        console.error(`Validation error in ${componentName}:`, error)
        throw error
      }
    }
  }

  return validatedProps
}