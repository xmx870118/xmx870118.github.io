(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart 1: Gap Analysis (Current vs Target) ---
  var chart1 = echarts.init(document.getElementById('chart-gap'), null, { renderer: 'svg' });
  var categories = ['美术与视觉', '数值反馈', '内容重复性', '音效与音乐', '新手引导', '竞赛深度', '社交互动'];
  chart1.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['当前评分', '目标评分'], bottom: 0, textStyle: { color: muted, fontSize: 12 } },
    grid: { left: 50, right: 20, top: 20, bottom: 40 },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { color: muted, fontSize: 11, rotate: 20 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'value',
      min: 0, max: 10,
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [
      {
        name: '当前评分',
        type: 'bar',
        data: [6.0, 5.5, 5.0, 3.0, 5.0, 5.5, 6.5],
        itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] },
        barWidth: '30%'
      },
      {
        name: '目标评分',
        type: 'bar',
        data: [8.0, 8.5, 8.0, 7.5, 8.0, 8.5, 8.5],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
        barWidth: '30%'
      }
    ]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // --- Chart 2: Growth Comparison (Before vs After Optimization) ---
  var chart2 = echarts.init(document.getElementById('chart-growth'), null, { renderer: 'svg' });
  var months = ['9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月'];
  chart2.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['优化前（数学排名）', '优化后（数学排名）'], bottom: 0, textStyle: { color: muted, fontSize: 12 } },
    grid: { left: 50, right: 20, top: 20, bottom: 40 },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'value',
      name: '年级排名',
      nameTextStyle: { color: muted, fontSize: 11 },
      inverse: true,
      min: 0, max: 120,
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [
      {
        name: '优化前（数学排名）',
        type: 'line',
        data: [100, 100, 104, 106, 108, 110, 112, 113, 114, 115],
        smooth: true,
        lineStyle: { color: accent2, width: 2 },
        itemStyle: { color: accent2 },
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: { color: accent2 + '15' }
      },
      {
        name: '优化后（数学排名）',
        type: 'line',
        data: [100, 88, 72, 58, 45, 35, 28, 22, 18, 15],
        smooth: true,
        lineStyle: { color: accent, width: 2 },
        itemStyle: { color: accent },
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: { color: accent + '15' }
      }
    ]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // --- Chart 3: Priority Matrix (Scatter) ---
  var chart3 = echarts.init(document.getElementById('chart-priority'), null, { renderer: 'svg' });
  var priorityData = [
    { name: '数值反馈', value: [2, 9.5, 35], priority: 'P0' },
    { name: '新手引导', value: [2.5, 8, 28], priority: 'P0' },
    { name: '内容多样化', value: [5.5, 9.5, 42], priority: 'P1' },
    { name: '竞赛深化', value: [5, 8, 35], priority: 'P1' },
    { name: '美术升级', value: [7, 6.5, 30], priority: 'P1' },
    { name: '社交增强', value: [5, 6, 28], priority: 'P2' },
    { name: '音效音乐', value: [3, 5.5, 22], priority: 'P2' }
  ];
  chart3.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      formatter: function(p) {
        return '<b>' + p.name + '</b><br/>实现难度：' + p.value[0] + '/10<br/>影响程度：' + p.value[1] + '/10<br/>优先级：' + p.value[2];
      }
    },
    grid: { left: 50, right: 30, top: 30, bottom: 50 },
    xAxis: {
      type: 'value',
      name: '实现难度 →',
      nameLocation: 'middle',
      nameGap: 30,
      min: 0, max: 10,
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'value',
      name: '影响程度 →',
      min: 0, max: 10,
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'scatter',
      data: priorityData.map(function(d) {
        var color = d.priority === 'P0' ? '#ef4444' : d.priority === 'P1' ? accent2 : accent;
        return {
          name: d.name,
          value: d.value,
          symbolSize: d.value[2],
          itemStyle: { color: color, opacity: 0.85 }
        };
      }),
      label: {
        show: true,
        formatter: function(p) { return p.name; },
        position: 'top',
        fontSize: 11,
        fontWeight: 600,
        color: ink
      }
    }]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // --- Chart 4: Before/After Radar Comparison ---
  var chart4 = echarts.init(document.getElementById('chart-compare'), null, { renderer: 'svg' });
  chart4.setOption({
    animation: false,
    tooltip: { appendToBody: true },
    legend: { data: ['优化前', '优化后（预期）'], bottom: 0, textStyle: { color: muted, fontSize: 12 } },
    radar: {
      indicator: [
        { name: '创意性', max: 10 },
        { name: '可玩性', max: 10 },
        { name: '策略深度', max: 10 },
        { name: '画面表现', max: 10 },
        { name: '沉浸感', max: 10 },
        { name: '内容深度', max: 10 }
      ],
      shape: 'polygon',
      splitNumber: 5,
      axisName: { color: ink, fontSize: 11 },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { areaStyle: { color: [bg2, 'transparent'] } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [
      {
        name: '优化前',
        type: 'radar',
        data: [{ value: [8.8, 7.5, 8.0, 6.0, 7.8, 5.5], name: '优化前' }],
        lineStyle: { color: accent2, width: 2 },
        itemStyle: { color: accent2 },
        areaStyle: { color: accent2 + '20' }
      },
      {
        name: '优化后（预期）',
        type: 'radar',
        data: [{ value: [9.0, 8.5, 8.5, 8.0, 8.8, 8.5], name: '优化后（预期）' }],
        lineStyle: { color: accent, width: 2 },
        itemStyle: { color: accent },
        areaStyle: { color: accent + '20' }
      }
    ]
  });
  window.addEventListener('resize', function() { chart4.resize(); });
})();
