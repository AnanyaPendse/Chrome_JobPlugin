import type { FieldDescriptor } from './types';

function normalizeText(text: string | null | undefined): string {
  return text?.trim() ?? '';
}

function extractLabel(element: HTMLElement): string {
  const id = element.id;
  const labelFor = id ? document.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(id)}"]`) : null;
  if (labelFor?.textContent) {
    return labelFor.textContent.trim();
  }

  const labelParent = element.closest('label');
  if (labelParent?.textContent) {
    return labelParent.textContent.trim();
  }

  return '';
}

function extractNearbyText(element: HTMLElement): string {
  const prev = element.previousElementSibling;
  if (prev instanceof HTMLElement && prev.innerText.trim()) {
    return prev.innerText.trim();
  }

  const parent = element.parentElement;
  if (parent) {
    const nearby = Array.from(parent.querySelectorAll('span, p, div')).find((node) => node.textContent && node.textContent.trim().length > 0);
    if (nearby instanceof HTMLElement) {
      return nearby.textContent.trim();
    }
  }

  return '';
}

export function scanFields(): FieldDescriptor[] {
  const rawElements = Array.from(document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select'));

  return rawElements
    .filter((element) => {
      if (element instanceof HTMLInputElement) {
        return !['button', 'submit', 'reset', 'image', 'hidden', 'checkbox', 'radio', 'file'].includes(element.type);
      }
      return true;
    })
    .map((element) => ({
      elementType: element.tagName.toLowerCase(),
      name: normalizeText((element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).name),
      id: normalizeText(element.id),
      placeholder: normalizeText((element as HTMLInputElement | HTMLTextAreaElement).placeholder),
      ariaLabel: normalizeText(element.getAttribute('aria-label')),
      labelText: extractLabel(element),
      nearbyText: extractNearbyText(element),
      inputType: element instanceof HTMLInputElement ? element.type.toLowerCase() : element.tagName.toLowerCase()
    }))
    .filter((descriptor) => descriptor.name || descriptor.id || descriptor.labelText || descriptor.placeholder || descriptor.ariaLabel || descriptor.nearbyText);
}
