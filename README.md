# wizard

Minimal Jest-like unit testing framework based on built-in `Deno.test()`.

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

Output:

```
Check file:///home/v1rtl/Coding/deno-libs/wizard/$deno$test.ts
running 1 tests
test should run the passed function ... ok (2ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```
