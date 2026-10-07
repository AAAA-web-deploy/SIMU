function copyWithSelection(value: string): boolean {
  const area = document.createElement('textarea');
  area.value = value;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.top = '0';
  area.style.left = '-9999px';
  document.body.appendChild(area);
  area.focus();
  area.select();
  area.setSelectionRange(0, value.length);
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  }
  area.remove();
  return copied;
}

export function copyExactText(value: string): Promise<boolean> {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    return navigator.clipboard.writeText(value).then(
      () => true,
      () => copyWithSelection(value),
    );
  }
  return Promise.resolve(copyWithSelection(value));
}
