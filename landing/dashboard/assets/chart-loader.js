/**
 * chart-loader.js — 0xRadar Dashboard Chart.js initializer
 *
 * Handles Chart.js CDN loading and provides a simple
 * bar/line chart render helper for dashboard pages.
 */

(function () {
  'use strict';

  // Chart.js is loaded via CDN in dashboard.html
  // This module provides helper functions

  /**
   * Render a bar chart
   * @param {HTMLCanvasElement} canvas
   * @param {object} config - { labels, values, label }
   */
  function renderBarChart(canvas, config) {
    const { labels, values, label = 'Value' } = config;
    const isDark = !document.body.classList.contains('light-mode');
    const textColor = isDark ? '#8B93B0' : '#5A6380';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label,
          data: values,
          backgroundColor: 'rgba(0, 209, 255, 0.6)',
          borderColor: '#00D1FF',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? '#161B3A' : '#FFFFFF',
            titleColor: isDark ? '#FFFFFF' : '#0A0E27',
            bodyColor: textColor,
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: textColor, font: { size: 11 } }
          },
          y: {
            beginAtZero: true,
            grid: { color: gridColor },
            ticks: { color: textColor, font: { size: 11 } }
          }
        }
      }
    });
  }

  /**
   * Render a line chart
   * @param {HTMLCanvasElement} canvas
   * @param {object} config - { labels, values, label, fill }
   */
  function renderLineChart(canvas, config) {
    const {
      labels,
      values,
      label = 'Value',
      fill = true,
      color = '#00D1FF'
    } = config;

    const isDark = !document.body.classList.contains('light-mode');
    const textColor = isDark ? '#8B93B0' : '#5A6380';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

    return new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data: values,
          borderColor: color,
          backgroundColor: fill ? color.replace(')', ', 0.1)').replace('rgb', 'rgba') : 'transparent',
          borderWidth: 2,
          fill,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: color
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? '#161B3A' : '#FFFFFF',
            titleColor: isDark ? '#FFFFFF' : '#0A0E27',
            bodyColor: textColor,
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { size: 11 } }
          },
          y: {
            beginAtZero: true,
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              font: { size: 11 },
              callback: (v) => v >= 1000 ? (v / 1000).toFixed(0) + 'K' : v
            }
          }
        }
      }
    });
  }

  /**
   * Re-render chart when theme changes (called from dashboard.js)
   * @param {Chart} chartInstance
   */
  function reRenderOnThemeChange(chartInstance) {
    if (!chartInstance) return;
    // Chart.js handles this automatically if data doesn't change
    // Just trigger a small resize to force redraw
    chartInstance.resize();
  }

  // Export
  window.ChartLoader = {
    renderBarChart,
    renderLineChart,
    reRenderOnThemeChange
  };
})();