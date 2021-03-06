export * from 'https://deno.land/x/expect@v0.2.6/mod.ts'

/**
 * Run a test suite
 * @param name Suite name
 * @param fn suite body
 */
export function describe(_name: string, fn: () => void) {
  fn()
}

/**
 * Test timeout value
 */
export const TEST_TIMEOUT = 1000

/**
 * Run a test
 * @param name test name
 * @param fn test body
 * @example
 * ```js
 * it('should sum a + b', () => expect(1 + 1).toBe(2))
 * ```
 */
export function it(name: string, fn: (done: (err?: unknown) => void) => void | Promise<void>) {
  Deno.test(name, async () => {
    const done = (err?: unknown) => {
      if (err) throw err
    }

    const race: Promise<unknown> = Promise.resolve()

    /* if (fn.length === 1) {
      let resolve: (value?: unknown) => void
      const donePromise = new Promise((r) => {
        resolve = r
      })

      let timeoutId: number

      race = Promise.race([
        new Promise(
          (_, reject) =>
            (timeoutId = setTimeout(() => {
              reject(new Error(`test "${name}" failed to complete by calling "done" within ${TEST_TIMEOUT}ms.`))
            }, TEST_TIMEOUT))
        ),
        donePromise
      ])

      done = (err?: unknown) => {
        clearTimeout(timeoutId)
        resolve()
        if (err) {
          throw err
        }
      }
    } */

    await fn(done)
    await race
  })
}
