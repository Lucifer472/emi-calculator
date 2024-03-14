export const calculateLoanPayments = (
  principal: number,
  annualInterestRate: number,
  durationInYears: number,
  currentMonth: number
) => {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const totalPayments = durationInYears * 12;
  const monthlyPayment = Math.round(
    principal *
      (monthlyInterestRate /
        (1 - Math.pow(1 + monthlyInterestRate, -totalPayments)))
  );

  let remainingBalance = principal;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;

  for (let month = 1; month <= totalPayments; month++) {
    const monthlyInterestPayment = Math.round(
      remainingBalance * monthlyInterestRate
    );
    const monthlyPrincipalPayment = Math.round(
      monthlyPayment - monthlyInterestPayment
    );

    totalInterestPaid += monthlyInterestPayment;
    totalPrincipalPaid += monthlyPrincipalPayment;
    remainingBalance -= monthlyPrincipalPayment;

    // If you want to calculate for a specific month, you can check and return the values
    if (month === currentMonth) {
      if (currentMonth === totalPayments) {
        // Special handling for the last month to ensure remaining balance becomes zero
        const lastMonthPrincipalPayment = remainingBalance;
        remainingBalance = 0;

        return {
          monthlyPrincipalPayment: Math.round(
            monthlyPayment - lastMonthPrincipalPayment
          ),
          monthlyInterestPayment: Math.round(lastMonthPrincipalPayment),
          remainingBalance,
          totalPrincipalPaid: totalPrincipalPaid + lastMonthPrincipalPayment,
          totalInterestPaid:
            totalInterestPaid + (monthlyPayment - lastMonthPrincipalPayment),
        };
      } else {
        return {
          monthlyPrincipalPayment,
          monthlyInterestPayment,
          remainingBalance,
          totalPrincipalPaid,
          totalInterestPaid,
        };
      }
    }
  }

  // If currentMonth exceeds the total number of payments, return the final values
  return {
    monthlyPrincipalPayment: 0,
    monthlyInterestPayment: 0,
    remainingBalance: 0,
    totalPrincipalPaid,
    totalInterestPaid,
  };
};
