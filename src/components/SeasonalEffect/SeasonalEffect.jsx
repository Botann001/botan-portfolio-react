import { useMemo } from 'react';
import NaturalSeasonCanvas from './NaturalSeasonCanvas';

// 4 Musim Internasional (Subtropis / Non-Indonesia)
// Winter: Des - Feb (11, 0, 1)
// Spring: Mar - Mei (2, 3, 4)
// Summer: Jun - Ags (5, 6, 7)
// Autumn / Fall: Sep - Nov (8, 9, 10)
export function getCalendarSeason() {
  const month = new Date().getMonth(); // 0 = Jan, 11 = Des
  if (month === 11 || month === 0 || month === 1) {
    return 'winter';
  }
  if (month >= 2 && month <= 4) {
    return 'spring';
  }
  if (month >= 5 && month <= 7) {
    return 'summer';
  }
  return 'autumn'; // Bulan 8, 9, 10 (Sep, Okt, Nov)
}

export const SEASONS = {
  autumn: {
    id: 'autumn',
    label: 'AUTUMN',
    name: 'Musim Gugur',
    icon: '🍂',
    desc: 'Falling autumn leaves (maple, oak, ginkgo, birch)'
  },
  winter: {
    id: 'winter',
    label: 'WINTER',
    name: 'Musim Dingin',
    icon: '❄️',
    desc: 'Cinematic soft snowfall'
  },
  spring: {
    id: 'spring',
    label: 'SPRING',
    name: 'Musim Semi',
    icon: '🌸',
    desc: 'Floating sakura & cherry blossom petals'
  },
  summer: {
    id: 'summer',
    label: 'SUMMER',
    name: 'Musim Panas',
    icon: '☀️',
    desc: 'Golden fireflies & sun dust'
  },
  off: {
    id: 'off',
    label: 'OFF',
    name: 'Efek Mati',
    icon: '🚫',
    desc: 'Tanpa partikel musim'
  }
};

export default function SeasonalEffect({ season = 'auto' }) {
  const activeSeasonKey = useMemo(() => {
    if (season === 'auto') {
      return getCalendarSeason();
    }
    return season;
  }, [season]);

  if (activeSeasonKey === 'off') {
    return null;
  }

  return <NaturalSeasonCanvas season={activeSeasonKey} />;
}
