<template>
  <a
    href="/"
    class="back-home"
    title="Back to Near Horizon"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="back-home-arrow">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
    <svg viewBox="0 0 130 100" fill="currentColor" class="back-home-icon">
      <rect x="8" y="8" width="11" height="84"/>
      <polygon points="8,8 19,8 66,84 66,92 55,92 8,16"/>
      <rect x="55" y="8" width="11" height="84"/>
      <rect x="55" y="42" width="56" height="11"/>
      <rect x="100" y="8" width="11" height="84"/>
    </svg>
  </a>
</template>

<style>
.back-home {
  position: fixed;
  bottom: 1.2em;
  left: 1.2em;
  z-index: 100;
  color: #8c8985;
  transition: color 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.15em;
}
.back-home:hover {
  color: #2d4a2d;
}
.back-home-arrow {
  width: 1em;
  height: 1em;
}
.back-home-icon {
  width: 2em;
  height: auto;
}
</style>
