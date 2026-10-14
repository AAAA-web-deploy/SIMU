import { afterEach, describe, expect, it, vi } from 'vitest';
import { copyExactText } from './clipboard.ts';

const address = `0x${'ab'.repeat(20)}`;
const originalExec = document.execCommand;

describe('copyExactText', () => {
  afterEach(() => {
    document.execCommand = originalExec;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('copies the address through the clipboard API', async () => {
    const writeText = vi.fn(async () => undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    vi.stubGlobal('isSecureContext', true);
    document.execCommand = vi.fn(() => false);

    await expect(copyExactText(address)).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith(address);
  });

  it('copies during the click when the clipboard API rejects', async () => {
    const writeText = vi.fn(async () => {
      throw new Error('not focused');
    });
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    vi.stubGlobal('isSecureContext', true);
    const exec = vi.fn(() => true);
    document.execCommand = exec;

    await expect(copyExactText(address)).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith(address);
    expect(exec).toHaveBeenCalledWith('copy');
  });

  it('reports failure when both copy paths fail', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: async () => {
          throw new Error('blocked');
        },
      },
    });
    vi.stubGlobal('isSecureContext', true);
    document.execCommand = vi.fn(() => false);

    await expect(copyExactText(address)).resolves.toBe(false);
  });
});
