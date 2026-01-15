import { WeatherMarkerEntity } from '../../domain/entities/weather-marker.entity';
import { WeatherType } from '../../domain/enums/weather-type.enum';

export type RenderGridOptions = {
  width?: number;
  height?: number;
  paddingDegrees?: number;
  showList?: boolean;
  highlightRadius?: number;
  highlightChar?: string;
};

export class MapRenderer {
  render(markers: WeatherMarkerEntity[], title?: string, options: RenderGridOptions = {}): void {
    if (title) console.log(title);

    if (markers.length === 0) {
      console.log('(empty map)\n');
      return;
    }

    const width = options.width ?? 60;
    const height = options.height ?? 18;
    const padding = options.paddingDegrees ?? 0.2;
    const showList = options.showList ?? true;

    const highlightRadius = options.highlightRadius ?? 1;
    const highlightChar = options.highlightChar ?? 'o';

    const bounds = this.computeBounds(markers, padding);

    const latSpan = Math.max(bounds.maxLat - bounds.minLat, 1e-9);
    const lonSpan = Math.max(bounds.maxLon - bounds.minLon, 1e-9);

    const grid: string[][] = Array.from({ length: height }, () => Array.from({ length: width }, () => '.'));

    const points = markers.map((m) => {
      const x = Math.round(((m.coordinates.longitude - bounds.minLon) / lonSpan) * (width - 1));
      const yFromBottom = Math.round(((m.coordinates.latitude - bounds.minLat) / latSpan) * (height - 1));
      const y = (height - 1) - yFromBottom;
      return { m, x, y };
    });

    if (highlightRadius > 0) {
      for (const p of points) {
        this.paintRing(grid, p.x, p.y, highlightRadius, highlightChar);
      }
    }

    for (const p of points) {
      const symbol = this.symbolForType(p.m.weather.type);
      const current = grid[p.y]?.[p.x];
      if (current === undefined) continue;

      grid[p.y][p.x] = current === '.' ? symbol : '*';
    }

    console.log(
      `lat: ${this.formatNumber(bounds.maxLat, 4)} (N) → ${this.formatNumber(bounds.minLat, 4)} (S)\n` +
      `lon: ${this.formatNumber(bounds.minLon, 4)} (W) → ${this.formatNumber(bounds.maxLon, 4)} (E)\n`,
    );

    for (let row = 0; row < height; row++) {
      const latAtRow = bounds.maxLat - (latSpan * (row / (height - 1)));
      const label = this.padLeft(this.formatNumber(latAtRow, 2), 8);
      console.log(`${label} | ${grid[row].join('')}`);
    }

    console.log(`${' '.repeat(8)} + ${'-'.repeat(width)}`);

    const leftLonLabel = this.formatNumber(bounds.minLon, 2);
    const rightLonLabel = this.formatNumber(bounds.maxLon, 2);
    const middleLonLabel = this.formatNumber((bounds.minLon + bounds.maxLon) / 2, 2);

    const lonLabelLine = Array.from({ length: width }, () => ' ');
    this.writeText(lonLabelLine, 0, leftLonLabel);
    this.writeText(lonLabelLine, Math.floor((width - middleLonLabel.length) / 2), middleLonLabel);
    this.writeText(lonLabelLine, Math.max(0, width - rightLonLabel.length), rightLonLabel);
    console.log(`${' '.repeat(11)}${lonLabelLine.join('')}\n`);

    console.log(
      `Legend: ${this.symbolForType(WeatherType.SUNNY)}=SUNNY, ${this.symbolForType(WeatherType.CLOUDY)}=CLOUDY, ` +
      `${this.symbolForType(WeatherType.RAINY)}=RAINY, ${this.symbolForType(WeatherType.SNOW)}=SNOW, ` +
      `o=city area, *=collision, .=empty\n`,
    );

    if (showList) {
      const sorted = [...markers].sort((a, b) => a.city.localeCompare(b.city));
      for (const m of sorted) {
        console.log(
          `- ${m.city} @ (${this.formatNumber(m.coordinates.latitude, 4)}, ${this.formatNumber(m.coordinates.longitude, 4)})` +
          ` => ${m.weather.temperature.celsius}°C, ${m.weather.humidity}%, ${m.weather.type}`,
        );
      }
      console.log('');
    }
  }

  private paintRing(grid: string[][], cx: number, cy: number, radius: number, ringChar: string): void {
    const h = grid.length;
    const w = grid[0]?.length ?? 0;

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const x = cx + dx;
        const y = cy + dy;

        if (x < 0 || y < 0 || x >= w || y >= h) continue;

        const dist = Math.sqrt(dx * dx + dy * dy);
        const onRing = dist >= radius - 0.35 && dist <= radius + 0.35;
        if (!onRing) continue;

        const current = grid[y][x];
        if (current === '.') {
          grid[y][x] = ringChar;
        } else if (current === ringChar) {
        } else {
          grid[y][x] = '*';
        }
      }
    }
  }

  private symbolForType(type: WeatherType): string {
    switch (type) {
      case WeatherType.SUNNY:
        return 'S';
      case WeatherType.CLOUDY:
        return 'C';
      case WeatherType.RAINY:
        return 'R';
      case WeatherType.SNOW:
        return 'N';
      default:
        return '?';
    }
  }

  private computeBounds(markers: WeatherMarkerEntity[], paddingDegrees: number): {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
  } {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLon = Infinity;
    let maxLon = -Infinity;

    for (const m of markers) {
      const { latitude, longitude } = m.coordinates;
      minLat = Math.min(minLat, latitude);
      maxLat = Math.max(maxLat, latitude);
      minLon = Math.min(minLon, longitude);
      maxLon = Math.max(maxLon, longitude);
    }

    return {
      minLat: minLat - paddingDegrees,
      maxLat: maxLat + paddingDegrees,
      minLon: minLon - paddingDegrees,
      maxLon: maxLon + paddingDegrees,
    };
  }

  private writeText(buffer: string[], startIndex: number, text: string): void {
    for (let i = 0; i < text.length; i++) {
      const idx = startIndex + i;
      if (idx < 0 || idx >= buffer.length) continue;
      buffer[idx] = text[i];
    }
  }

  private padLeft(value: string, width: number): string {
    return value.padStart(width, ' ');
  }

  private formatNumber(value: number, fractionDigits: number): string {
    if (!Number.isFinite(value)) return String(value);
    return value.toFixed(fractionDigits);
  }
}