/*
 * Button
 */
const foo = document.querySelector('#foo');
const hiddenmsg = document.querySelector('#hello-world');
function myclick() {
  if (hiddenmsg.hidden) {
    hiddenmsg.removeAttribute('hidden');
  } else {
    hiddenmsg.setAttribute('hidden', '');
  }
}
foo.onclick = myclick;

/*
 * Text Input
 */
const labelChanger = document.querySelector('#label-changer');
const myInput = document.querySelector('my-input');

const disabledCheckbox = document.querySelector('#input-disabled');
disabledCheckbox.addEventListener('change', (e) => {
  myInput.disabled = e.target.checked;
  // e.target.checked
  //   ? myInput.setAttribute('disabled', true)
  //   : myInput.removeAttribute('disabled');
});

labelChanger.addEventListener('input', (e) => {
  myInput.setAttribute('label', e.target.value);
});

myInput.addEventListener('input', (e) => {
  const value = e.detail;
  document.querySelector('#input-value').textContent = value;
  myInput.setAttribute('value', value);
});
