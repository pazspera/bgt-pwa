
function sum(a, b) {
  return a + b;
}

test("add 2 numbers", ()=> {
  expect(sum(3,3)).toEqual(6);
})