import fetchAPI from "@/app/lib/api";

export function getRecords() {
  return fetchAPI("/posts/");
}
export function getRecord(_id: string) {
  return fetchAPI(`/records/${_id}`);
}
