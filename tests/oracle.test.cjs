const assert=require('node:assert/strict');
globalThis.Solar=require('../vendor/lunar.js').Solar;
const oracle=require('../oracle.js');
// Public upstream README example: 1986-05-29 is 丙寅 year, 癸巳 month, 癸酉 day.
const known=oracle.calculate('1986-05-29','12:00');
assert.deepEqual(known.pillars.slice(0,3),['丙寅','癸巳','癸酉']);
assert.equal(known.index,4);
assert.equal(oracle.calculate('1986-05-29','').pillars[3],'—');
assert.equal(oracle.calculate('1986-05-29','23:30').pillars[2],'癸酉');
assert.notEqual(oracle.calculate('1986-05-30','00:00').pillars[2],'癸酉');
for(const date of ['2025-02-29','1899-01-01','2101-01-01','2024-13-01'])assert.throws(()=>oracle.calculate(date,''));
assert.doesNotThrow(()=>oracle.calculate('2024-02-29','00:00'));
assert.throws(()=>oracle.calculate('2024-01-01','25:00'));
const months=oracle.months(new Date(2026,11,15),'en');
assert.deepEqual(months.map(x=>x.month),['December 2026','January 2027','February 2027']);
for(const lang of ['en','zh'])for(const date of ['1990-03-01','2000-02-29','2020-12-31']){
 const chart=oracle.calculate(date,'');assert.ok(chart.index>=0&&chart.index<5);assert.ok(oracle.personalities[chart.index][lang]);
}
console.log('Passed: reference chart, unknown time, midnight boundary, leap dates, invalid inputs, bilingual templates and year rollover.');
