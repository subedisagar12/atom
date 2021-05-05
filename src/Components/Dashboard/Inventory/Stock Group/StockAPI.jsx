export const FilterStockGroupByCompany = (
  stockGroup,
  companyName,
  primary = false
) => {
  let res = [];

  stockGroup.forEach((element) => {
    if (primary) {
      if (element.company === companyName || element.company === "*") {
        res.push(element);
      }
    } else {
      if (element.company === companyName) {
        res.push(element);
      }
    }
  });

  return res;
};
