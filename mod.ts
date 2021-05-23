import { ms } from 'https://deno.land/x/ms@v0.1.0/ms.ts'
import { green, bold, gray, red } from 'https://deno.land/std@0.97.0/fmt/colors.ts'
export * from 'https://deno.land/x/expect@v0.2.6/mod.ts'

type Fn = (done: (err?: unknown) => void) => void | Promise<void>

const msg = (...x: string[]) => Deno.stdout.writeSync(new TextEncoder().encode(x.join(' ')))

const testSuites: {
  name: string
  cases: { name: string; case: Fn }[]
}[] = []
let currSuite = 0,
  totalSuites = 0

/**
 * Run a test suite
 * @param name Suite name
 * @param fn suite body
 */
export function describe(name: string, fn: () => void) {
  testSuites.push({ name, cases: [] })
  fn()
  currSuite++
  totalSuites++
}

/**
 * Run a test
 * @param name test name
 * @param fn test body
 * @example
 * ```js
 * it('should sum a + b', () => expect(1 + 1).toBe(2))
 * ```
 */
export function it(name: string, fn: Fn) {
  if (!testSuites[currSuite]) {
    testSuites.push({ name: '', cases: [] })
  }
  testSuites[currSuite].cases.push({ name, case: fn })
}

let failedCases = 0

const summary = (totalSuites: number, failedSuites: number, suite: { cases: { case: Fn }[] }) => {
  msg(
    `\n\n\nTest Suites: ${green(`${totalSuites - failedSuites} passed`)}, ${red(
      `${failedSuites} failed`
    )}, ${totalSuites} total`
  )
  msg(
    `\nTest Cases: ${green(`${suite.cases.length - 1 - failedCases} passed`)}, ${red(`${failedCases} failed`)}, ${
      suite.cases.length - 1
    } total\n`
  )
}

export const run = () => {
  // msg(bold(new URL('', import.meta.url).pathname), '\n')

  let failedSuites = 0

  testSuites.forEach((suite, i) => {
    if (suite.name !== '') msg(`\n${suite.name} \n`)

    suite.cases.forEach((t, ii) => {
      if (suite.name === '') {
        msg(`${t.name}\n`)
      } else {
        msg(`  ${gray(t.name)}\n`)
      }

      Deno.test({
        name: t.name,
        fn: async () => {
          const done = (err: unknown) => {
            if (err) throw err
          }

          const suiteName = suite.name ? ` ${suite.name} >` : ''

          try {
            const t1 = performance.now()
            await t.case(done)
            const t2 = performance.now()
            msg(`\n${green(bold('PASS'))}${suiteName} ${bold(t.name)} (${ms(t2 - t1)}) \n`)
          } catch (e) {
            msg(red(`\n${bold('FAIL')}${suiteName} ${bold(t.name)}\n`))
            msg(e.stack)

            failedSuites++
            failedCases++
            summary(totalSuites, failedSuites, suite)
            throw e
          }

          // msg(`  ${!testFailed ? green('✓') : red('×')} ${gray(t.name)}\n`)

          if (testSuites.length - 1 === i && suite.cases.length - 1 === ii) {
            summary(totalSuites, failedSuites, suite)
          }
        }
      })
    })
  })
}
