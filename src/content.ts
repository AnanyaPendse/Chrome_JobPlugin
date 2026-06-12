import { getProfile } from './shared/storage';
import { matchField } from './shared/fieldMatcher';
import { scanFields } from './shared/fieldScanner';
import type { FieldDescriptor, Profile } from './shared/types';

function dispatchEvent(element: Element, eventName: string) {
  const event = new Event(eventName, { bubbles: true });
  element.dispatchEvent(event);
}

function findElement(descriptor: FieldDescriptor): HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null {
  if (descriptor.id) {
    const byId = document.getElementById(descriptor.id);
    if (byId && byId instanceof HTMLInputElement || byId instanceof HTMLTextAreaElement || byId instanceof HTMLSelectElement) {
      return byId;
    }
  }

  if (descriptor.name) {
    const byName = document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[name="${CSS.escape(descriptor.name)}"]`);
    if (byName) {
      return byName;
    }
  }

  if (descriptor.ariaLabel) {
    const byAria = document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[aria-label="${CSS.escape(descriptor.ariaLabel)}"]`);
    if (byAria) {
      return byAria;
    }
  }

  const byPlaceholder = document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[placeholder="${CSS.escape(descriptor.placeholder)}"]`);
  if (byPlaceholder) {
    return byPlaceholder;
  }

  if (descriptor.labelText) {
    const labels = Array.from(document.querySelectorAll<HTMLLabelElement>('label'));
    const matchingLabel = labels.find((label) => label.textContent?.trim() === descriptor.labelText);
    if (matchingLabel) {
      const control = matchingLabel.control;
      if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement || control instanceof HTMLSelectElement) {
        return control;
      }
    }
  }

  return null;
}

function fillElement(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: string): boolean {
  if (element instanceof HTMLSelectElement) {
    const option = Array.from(element.options).find((opt) => opt.value === value || opt.text === value);
    if (option) {
      element.value = option.value;
      dispatchEvent(element, 'change');
      return true;
    }
    return false;
  }

  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    element.value = value;
    dispatchEvent(element, 'input');
    dispatchEvent(element, 'change');
    return true;
  }

  return false;
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'scanFields') {
    getProfile().then((profile: Profile) => {
      const descriptors = scanFields();
      const matches = descriptors.map((descriptor) => matchField(descriptor, profile));
      sendResponse({ matches });
    });
    return true;
  }

  if (message?.type === 'fillFields' && Array.isArray(message.selectedFields)) {
    const results = (message.selectedFields as Array<{ descriptor: FieldDescriptor; profileKey: keyof Profile | null; value: string }>).map((item) => {
      const element = findElement(item.descriptor);
      const filled = element ? fillElement(element, item.value) : false;
      return {
        label: item.descriptor.labelText || item.descriptor.name || item.descriptor.placeholder || 'Unknown field',
        profileKey: item.profileKey,
        success: filled
      };
    });
    sendResponse({ results });
    return true;
  }
});
