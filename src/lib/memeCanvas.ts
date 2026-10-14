const SIZE = 1080;

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (ctx.measureText(trial).width <= maxWidth) {
      current = trial;
      continue;
    }
    if (current) lines.push(current);
    if (ctx.measureText(word).width > maxWidth) {
      let chunk = '';
      for (const char of word) {
        const next = chunk + char;
        if (ctx.measureText(next).width > maxWidth && chunk) {
          lines.push(chunk);
          chunk = char;
        } else {
          chunk = next;
        }
      }
      current = chunk;
    } else {
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function ellipse(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function wave(ctx: CanvasRenderingContext2D, y: number, amp: number) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  for (let x = 0; x <= SIZE; x += 20) {
    ctx.lineTo(x, y + Math.sin(x / 140) * amp);
  }
  ctx.lineTo(SIZE, SIZE);
  ctx.lineTo(0, SIZE);
  ctx.closePath();
  ctx.fill();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not read that sprite.'));
    img.src = src;
  });
}

export async function renderMemePng(imageUrl: string, caption: string): Promise<Blob> {
  if (document.fonts?.ready) await document.fonts.ready;
  const img = await loadImage(imageUrl);
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available.');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const sky = ctx.createLinearGradient(0, 0, 0, SIZE);
  sky.addColorStop(0, '#7ecfff');
  sky.addColorStop(0.32, '#d7f4ff');
  sky.addColorStop(0.46, '#ffe4cc');
  sky.addColorStop(0.56, '#49b4e4');
  sky.addColorStop(1, '#0d4e84');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, SIZE, SIZE);

  const sun = ctx.createRadialGradient(790, 230, 8, 790, 230, 160);
  sun.addColorStop(0, 'rgba(255, 243, 190, 0.95)');
  sun.addColorStop(1, 'rgba(255, 243, 190, 0)');
  ctx.fillStyle = sun;
  ctx.beginPath();
  ctx.arc(790, 230, 160, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 251, 244, 0.9)';
  ellipse(ctx, 230, 150, 160, 46);
  ellipse(ctx, 390, 190, 120, 36);
  ellipse(ctx, 900, 120, 150, 40);

  ctx.fillStyle = '#2f9ccf';
  wave(ctx, 700, 28);
  ctx.fillStyle = '#156fa8';
  wave(ctx, 830, 34);
  ctx.strokeStyle = 'rgba(230, 250, 255, 0.8)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  for (let x = 0; x <= SIZE; x += 16) {
    const y = 828 + Math.sin(x / 140) * 34;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const maxW = 760;
  const maxH = 640;
  const scale = Math.min(maxW / img.width, maxH / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (SIZE - dw) / 2, 70, dw, dh);

  ctx.font = '700 52px Fredoka, Nunito, "Segoe UI", sans-serif';
  const lines = wrapLines(ctx, caption, SIZE - 200);
  const boxH = lines.length * 68 + 52;
  const boxY = SIZE - boxH - 64;
  ctx.save();
  ctx.translate(SIZE / 2, boxY + boxH / 2);
  ctx.rotate(-0.012);
  roundRect(ctx, -(SIZE - 150) / 2, -boxH / 2, SIZE - 150, boxH, 28);
  ctx.fillStyle = 'rgba(255, 249, 240, 0.95)';
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#15131b';
  ctx.stroke();
  ctx.fillStyle = '#15131b';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  lines.forEach((line, i) => {
    const y = -boxH / 2 + 46 + i * 68;
    ctx.fillText(line, 0, y);
  });
  ctx.restore();

  ctx.font = '700 28px Fredoka, Nunito, "Segoe UI", sans-serif';
  ctx.fillStyle = '#17324a';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('MICRO PANIC  ·  $MIWO', SIZE / 2, 58);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result && result.size > 1000) resolve(result);
      else reject(new Error('The PNG came out empty.'));
    }, 'image/png');
  });
  return blob;
}

export function sanitizeCaption(raw: string): string {
  return raw
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
}
