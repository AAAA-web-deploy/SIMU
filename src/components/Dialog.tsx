import { useEffect, useRef, type ReactNode } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import styles from './Dialog.module.css';

type Props = {
  labelledBy: string;
  onClose: () => void;
  children: ReactNode;
  panelClassName?: string;
};

export function Dialog({ labelledBy, onClose, children, panelClassName = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(true, ref);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <div
        ref={ref}
        className={`${styles.panel} ${panelClassName}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
