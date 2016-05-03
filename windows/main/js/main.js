/*eslint max-statements:[2, 15], max-depth:[1, 2], complexity:[2, 5],
max-len:[2, 80], max-nested-callbacks:[2, 0] */
function write(){
  document.write('from js');
}
_.times(3, write);
