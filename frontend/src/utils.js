export function calculateTotalInvestedAmount(positions) {
  return positions.reduce((total, position) => total + position.balance, 0);
}

export function calculateNumberOfInvestments(positions) {
  return positions.length;
}

export function calculateRateOfReturn(positions) {
  const totalCost = positions.reduce(
    (total, position) => total + (position.cost || 0),
    0
  );
  const totalBalance = positions.reduce(
    (total, position) => total + position.balance,
    0
  );
  return ((totalBalance - totalCost) / totalCost) * 100;
}

export function accumulateBalancesByYear(positions) {
  const balancesByYear = {};
  positions.forEach((position) => {
    const year = new Date(position.valuation_date).getFullYear();
    if (!balancesByYear[year]) {
      balancesByYear[year] = 0;
    }
    balancesByYear[year] += position.balance;
  });
  return balancesByYear;
}

export function balanceDistributionByType(positions) {
  const distribution = {};
  positions.forEach((position) => {
    if (!distribution[position.type]) {
      distribution[position.type] = 0;
    }
    distribution[position.type] += position.balance;
  });
  return distribution;
}

export function balanceDistributionByCurrency(positions) {
  const distribution = {};
  positions.forEach((position) => {
    if (!distribution[position.currency]) {
      distribution[position.currency] = 0;
    }
    distribution[position.currency] += position.balance;
  });
  return distribution;
}

export function marketValueVsExchangeRate(positions) {
  return positions.map((position) => ({
    x: position.rate_to_euro,
    y: position.balance,
  }));
}

export function prepareTreemapData(positions) {
  let seriesData = positions.map((position) => ({
    x: position.name,
    y: parseFloat(position.balance),
  }));

  seriesData = aggregateSmallPositions(seriesData);

  return {
    series: [
      {
        data: seriesData,
      },
    ],
    options: {
      legend: {
        show: true,
      },
      chart: {
        type: 'treemap',
      },
      title: {
        text: 'Portfolio Overview',
        align: 'center',
      },
    },
  };
}

function aggregateSmallPositions(data) {
  const threshold = 10000;
  const others = data
    .filter((item) => item.y < threshold)
    .reduce((acc, curr) => acc + curr.y, 0);
  const mainItems = data.filter((item) => item.y >= threshold);

  if (others > 0) {
    mainItems.push({ x: 'Others', y: others });
  }
  return mainItems;
}
