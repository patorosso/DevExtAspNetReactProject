export const endpoint = "https://localhost:7298/api";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export function getParams(loadOptions) {
  let params = "?";
  [
    "skip",
    "take",
    "sort",
    "filter",
    "requireTotalCount",
    "requireGroupCount",
    "totalSummary",
    "group",
    "groupSummary",
  ].forEach((i) => {
    if (i in loadOptions && isNotEmpty(loadOptions[i])) {
      params += `${i}=${JSON.stringify(loadOptions[i])}&`;
    }
  });
  return params.slice(0, -1);
}
