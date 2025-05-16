export function flattenCategories(nestedData:any) {
    const flatArray:any = [];
  
    function recurse(items:any, level:any) {
        if (!Array.isArray(items)) return;

      for (const item of items) {
        const { values, ...rest } = item;
  
        flatArray.push({
          ...rest,
          level,
        });
  
        if (Array.isArray(values) && values.length > 0) {
          recurse(values, level + 1);
        }
      }
    }
  
    recurse(nestedData, 1);
  
    return flatArray;
  }
  