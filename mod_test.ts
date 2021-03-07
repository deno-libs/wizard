import { describe, it, expect, run } from './mod.ts'

describe('it()', () => {
  it('should run the passed function', () => {
    let val = 0
    const fn = () => {
      val = 42
    }

    fn()

    expect(val).toBe(42)
  })
  it('should resolve promises', async () => {
    const fn = () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(42), 1000)
      })
    }

    const val = await fn()
    expect(val).toBe(42)
  })

  it('should throw the error passed in done(err)', (done) => {
    try {
      done(new Error('Custom error'))
    } catch (e) {
      expect(e.message).toBe('Custom error')
    }
  })
})

run()
