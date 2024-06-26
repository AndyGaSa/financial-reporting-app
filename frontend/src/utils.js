export function calculateTotalInvestedAmount(positions) {
  return positions.reduce(
    (total, position) => total + (position.balance || 0),
    0
  );
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
    (total, position) => total + (position.balance || 0),
    0
  );
  return totalCost ? ((totalBalance - totalCost) / totalCost) * 100 : 0;
}

export function accumulateBalancesByYear(positions) {
  const balancesByYear = {};

  positions.forEach((position) => {
    const year = new Date(position.valuation_date).getFullYear();
    const balance = parseFloat(position.balance);

    if (!isNaN(balance)) {
      if (!balancesByYear[year]) {
        balancesByYear[year] = 0;
      }
      balancesByYear[year] += balance;
    }
  });

  return balancesByYear;
}
export function balanceDistributionByType(positions) {
  const distribution = {};
  positions.forEach((position) => {
    if (!distribution[position.type]) {
      distribution[position.type] = 0;
    }
    distribution[position.type] += position.balance || 0;
  });
  return distribution;
}

export function balanceDistributionByCurrency(positions) {
  const distribution = {};
  positions.forEach((position) => {
    if (!distribution[position.currency]) {
      distribution[position.currency] = 0;
    }
    distribution[position.currency] += position.balance || 0;
  });
  return distribution;
}

export function marketValueVsExchangeRate(positions) {
  return positions.map((position) => ({
    x: position.rate_to_euro,
    y: position.balance || 0,
  }));
}

export function prepareTreemapData(positions) {
  let seriesData = positions.map((position) => ({
    x: position.name,
    y: parseFloat(position.balance) || 0,
  }));

  seriesData.sort((a, b) => b.y - a.y);

  const topPositions = seriesData.slice(0, 9);
  const others = seriesData.slice(9).reduce((acc, curr) => acc + curr.y, 0);

  if (others > 0) {
    topPositions.push({ x: 'Others', y: others });
  }

  return {
    series: [
      {
        data: topPositions,
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
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
    },
  };
}
