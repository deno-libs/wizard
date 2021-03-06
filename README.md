# 🧙🏼‍♂️ Wizard

![GitHub release (latest by date)](https://img.shields.io/github/v/release/deno-libs/wizard?style=flat-square) [![GitHub Workflow Status][gh-actions-img]][github-actions]
[![Codecov][codecov-badge]][codecov] [![][docs-badge]][docs]

Minimal Jest-like unit testing library based on built-in `Deno.test()`.

> Code is extracted from [Opine test utils file](https://github.com/asos-craigmorten/opine/blob/main/test/utils.ts).

## Usage

```ts
// mod_test.ts
import { describe, it, expect } from 'https://deno.land/x/wizard/mod.ts'

describe('A test suite', () => {
  it('should sum a + b ', () => {
    expect(1 + 2).toBe(3)
  })
})
```

Then run:

```sh
deno test
```

Output:

```
Check file:///home/v1rtl/Coding/deno-libs/wizard/$deno$test.ts
running 1 tests
test should sum a + b ... ok (2ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

[gh-actions-img]: https://img.shields.io/github/workflow/status/deno-libs/wizard/CI?style=flat-square
[codecov]: https://codecov.io/gh/deno-libs/wizard
[github-actions]: https://github.com/deno-libs/wizard/actions
[license]: https://github.com/deno-libs/wizard-deno/blob/master/LICENSE
[codecov-badge]: https://img.shields.io/codecov/c/gh/deno-libs/wizard?style=flat-square
[docs-badge]: https://img.shields.io/github/v/release/deno-libs/wizard?color=yellow&label=Docs&logo=deno&style=flat-square
[docs]: https://doc.deno.land/https/deno.land/x/wizard/mod.ts
