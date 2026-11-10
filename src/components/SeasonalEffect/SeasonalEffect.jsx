import { useMemo } from 'react';
import { Snowfall } from 'falling-snow/react';
import { FallingLeaves } from 'falling-leaves/react';
import RestingSeasonElements from './RestingSeasonElements';

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

  let backgroundParticles = null;

  if (activeSeasonKey === 'winter') {
    backgroundParticles = (
      <Snowfall
        fullScreen
        flake="mixed"
        count={110}
        speed={0.85}
        wind={0.25}
        size={[3, 18]}
        opacity={[0.3, 0.9]}
        zIndex={2}
      />
    );
  } else if (activeSeasonKey === 'autumn') {
    backgroundParticles = (
      <FallingLeaves
        fullScreen
        shapes={['maple', 'oak', 'ginkgo', 'birch']}
        count={32}
        speed={[0.6, 1.4]}
        sway={[0.5, 1.5]}
        size={[14, 28]}
        zIndex={2}
      />
    );
  } else if (activeSeasonKey === 'spring') {
    backgroundParticles = (
      <FallingLeaves
        fullScreen
        shapes={['oval']}
        colors={['#ffb7c5', '#ff9bb2', '#ffe4e6', '#f472b6', '#fce7f3']}
        count={35}
        speed={[0.5, 1.2]}
        sway={[0.8, 1.8]}
        size={[10, 20]}
        zIndex={2}
      />
    );
  } else if (activeSeasonKey === 'summer') {
    backgroundParticles = (
      <Snowfall
        fullScreen
        flake="soft"
        count={55}
        colors={['#e8c15a', '#ffd700', '#f59e0b', '#fbbf24', '#fde047']}
        size={[3, 14]}
        speed={0.3}
        sway={2.2}
        spin={0.4}
        opacity={[0.35, 0.85]}
        zIndex={2}
      />
    );
  }

  return (
    <>
      {backgroundParticles}
      <RestingSeasonElements season={activeSeasonKey} />
    </>
  );
}
