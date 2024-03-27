// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }))
