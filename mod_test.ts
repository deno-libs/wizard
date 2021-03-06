import { describe, it, expect } from './mod.ts'

describe('describe()', () => {
  it('should run the passed function', () => {
    let val = 0
    const fn = () => {
      val = 42
    }

    describe('fn', fn)

    expect(val).toBe(42)
  })
})

describe('it()', () => {
  it('should run the passed function', () => {
    let val = 0
    const fn = () => {
      val = 42
    }

    it('fn', () => {
      fn()
      expect(val).toBe(42)
    })
  })
  it('should resolve promises', () => {
    const fn = () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(42), 1000)
      })
    }

    it('fn', async () => {
      const val = await fn()
      expect(val).toBe(42)
    })
  })
})
