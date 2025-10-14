// redux/selectors/productSelectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredProducts = createSelector(
  (state) => state.products.products,
  (state) => state.filters,
  (products, filters) => {
    const { afnRange, usdRange, selectedFilters } = filters;

    return products.filter((p) => {
      // Filter by category
      if (selectedFilters.category.length > 0) {
        if (!selectedFilters.category.includes(p.category?.name)) return false;
      }

      // Filter by color (if color is stored in attributes)
      if (selectedFilters.color.length > 0) {
        const productColors = p.attributes
          .filter((a) => a.attributeId?.name?.toLowerCase() === "color")
          .map((a) => a.value.toLowerCase());
        if (!selectedFilters.color.some((c) => productColors.includes(c)))
          return false;
      }

      // Filter by size (if size is stored in attributes)
      if (selectedFilters.size.length > 0) {
        const productSizes = p.attributes
          .filter((a) => a.attributeId?.name?.toLowerCase() === "size")
          .map((a) => a.value);
        if (!selectedFilters.size.some((s) => productSizes.includes(s)))
          return false;
      }

      // Filter by priceAFN
      if (p.priceAFN < afnRange[0] || p.priceAFN > afnRange[1]) return false;

      // Filter by "new" (optional: created in last 30 days)
      if (selectedFilters.new.length > 0) {
        const daysSinceCreation =
          (new Date() - new Date(p.createdAt)) / (1000 * 60 * 60 * 24);
        if (daysSinceCreation > 30) return false;
      }

      // Filter by mostSales (requires sales field, optional)
      if (selectedFilters.mostSales.length > 0) {
        // Here you can filter top-selling products if you have a sales field
        // Example: if(p.sales < threshold) return false
      }

      return true;
    });
  }
);
