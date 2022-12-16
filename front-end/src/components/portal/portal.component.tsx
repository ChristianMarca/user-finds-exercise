import { useLayoutEffect, useState } from 'react';
import type { ReactPortalProps } from './portal.types';
import { createPortal } from 'react-dom';

export const ReactPortal = (props: ReactPortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(props.id);
    let alreadyCreated = false;
    if (!element) {
      alreadyCreated = true;
      element = addElementWithIdToBody(props.id);
    }
    setWrapperElement(element);

    return () => {
      if (alreadyCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [props.id]);

  if (wrapperElement === null) return null;

  return createPortal(props.children, wrapperElement);
};

function addElementWithIdToBody(id: string) {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  document.body.appendChild(element);
  return element;
}
