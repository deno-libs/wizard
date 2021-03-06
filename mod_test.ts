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
  it('should finish the test when done() is called', () => {
    const t1 = performance.now()
    let t2 = 0
    it('done', (done) => {
      setTimeout(() => {
        t2 = performance.now()
        done()
      }, 1000)
      expect(Math.floor((t2 - t1) / 1000)).toBe(1)
    })
  })
  it('should throw the error passed in done(err)', () => {
    it('done(err)', (done) => {
      expect(done(new Error('Custom error'))).toThrow('Custom error')
    })
  })
})
