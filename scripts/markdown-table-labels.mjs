// Build step for Markdown (guides), for Astro's Sätteri Markdown processor: copies each
// table's column headings onto its cells as data-label, so on phones each row can show
// as a small card with labelled lines (see ".prose table" in src/styles/site.css).

/** @param {any} node @param {string} [tagName] */
const childElements = (node, tagName) =>
  (node.children ?? []).filter((child) => child.type === 'element' && (!tagName || child.tagName === tagName));

/** @type {import('satteri').HastPluginDefinition} */
export const tableLabels = {
  name: 'hivecrest-table-labels',
  element: {
    filter: ['table'],
    visit(table, ctx) {
      const head = childElements(table, 'thead')[0];
      const headerRow = head && childElements(head, 'tr')[0];
      if (!headerRow) return;
      const labels = childElements(headerRow).map((cell) => ctx.textContent(cell).trim());
      for (const body of childElements(table, 'tbody')) {
        for (const row of childElements(body, 'tr')) {
          childElements(row).forEach((cell, i) => {
            if (labels[i]) ctx.setProperty(cell, 'dataLabel', labels[i]);
          });
        }
      }
    },
  },
};
