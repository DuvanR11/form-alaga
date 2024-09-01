export const formatJson = (json: any) => {
    const jsonStr = JSON.stringify(json, null, 2);
    return jsonStr.replace(/(true|false|null|\d+)/g, match => {
      return `<span class="text-blue-500">${match}</span>`;
    }).replace(/("[^"]*": )("[^"]*")/g, (match, p1, p2) => {
      return `<span class="text-green-500">${p1}</span><span class="text-red-500">${p2}</span>`;
    });
  }
  